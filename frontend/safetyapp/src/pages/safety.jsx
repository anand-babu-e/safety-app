import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/safety.css";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const NearbyIncidents = () => {
  const [incidentInfo, setIncidentInfo] = useState(null);
  const [safetyRating, setSafetyRating] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const userLat = 8.53665;
  const userLon = 76.883202;

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([userLat, userLon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      const userIcon = L.icon({
        iconUrl: '/images/indicator.webp',
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const userMarker = L.marker([userLat, userLon], { icon: userIcon, title: "Your Location" })
        .addTo(mapRef.current)
        .bindPopup("<b>Your current location</b>")
        .openPopup();

      markersRef.current.push(userMarker);
    }

    const fetchIncidents = async () => {
      try {
      
        const response = await axios.get(
          `http://127.0.0.1:8000/api/nearby-incidents/?latitude=${userLat}&longitude=${userLon}`
        );

        setIncidents(response.data.incidents);
        evaluateSafety(response.data.incidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  useEffect(() => {
    if (mapRef.current && incidents.length) {
      displayIncidents(incidents);
    }
  }, [incidents]);

  const displayIncidents = (incidents) => {
    markersRef.current.slice(1).forEach(marker => mapRef.current.removeLayer(marker));
    markersRef.current = markersRef.current.slice(0, 1);

    incidents.forEach(incident => {
      const marker = L.marker([incident.latitude, incident.longitude]).addTo(mapRef.current);
      markersRef.current.push(marker);

      marker.bindPopup(`
        <b>${incident.incident_type.charAt(0).toUpperCase() + incident.incident_type.slice(1)}</b><br>
        <b>Description:</b> ${incident.description}<br>
        <b>Distance:</b> ${incident.distance.toFixed(2)} km<br>
        <b>Time:</b> ${new Date(incident.timestamp).toLocaleString()}
      `);

      marker.on("click", () => {
        setIncidentInfo({
          type: incident.incident_type,
          description: incident.description,
          distance: incident.distance.toFixed(2),
          timestamp: new Date(incident.timestamp).toLocaleString()
        });
      });
    });
  };

  const evaluateSafety = (incidents) => {
    const maxDistance = 3;
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const recentCrimes = incidents.filter(
      incident =>
        incident.incident_type === "crime" &&
        incident.distance <= maxDistance &&
        new Date(incident.timestamp) >= oneMonthAgo
    );

    const crimeCount = recentCrimes.length;
    let safetyStatus;

    if (crimeCount < 3) {
      safetyStatus = "Safe";
    } else if (crimeCount <= 5) {
      safetyStatus = "Moderately Safe";
    } else {
      safetyStatus = "Unsafe";
    }

    setSafetyRating({
      status: safetyStatus,
      count: crimeCount
    });
  };

  return (
    <div className='safety'>
      <div id="map"></div>

      {safetyRating && (
        <div id="safety-rating" className="info-box">
          <strong>Safety Status:</strong> {safetyRating.status}<br />
          <strong>Total Recent Crimes within 3 km:</strong> {safetyRating.count} (last month)
        </div>
      )}
    </div>
  );
};

export default NearbyIncidents;
