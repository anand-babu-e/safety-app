import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/safety.css";

const NearbyIncidents = () => {
  const [incidentInfo, setIncidentInfo] = useState(null);
  const [safetyRating, setSafetyRating] = useState(null);
  const mapRef = useRef(null); // Ref for the map instance
  const markersRef = useRef([]); // Ref for storing markers

  const userLat = 8.53665;
  const userLon = 76.883202;

  useEffect(() => {
    // Initialize the map
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([userLat, userLon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Add user's location marker
      const userMarker = L.marker([userLat, userLon], { title: "Your Location" })
        .addTo(mapRef.current)
        .bindPopup("<b>Your current location</b>")
        .openPopup();

      markersRef.current.push(userMarker); // Keep track of markers
    }

    displayIncidents(incidentData.incidents);
    evaluateSafety(incidentData.incidents);

    // Cleanup function to remove markers on unmount
    return () => {
      markersRef.current.forEach(marker => {
        mapRef.current.removeLayer(marker);
      });
    };
  }, []);

  // Sample API data
  const incidentData = {
    incidents: [
      { incident_type: "accident", latitude: 8.53888, longitude: 76.88495, description: "Minor car accident reported.", timestamp: "2024-11-03T14:31:23Z", distance: 0.75 },
      { incident_type: "crime", latitude: 8.53247, longitude: 76.88761, description: "Vandalism reported.", timestamp: "2024-11-02T08:12:10Z", distance: 1.45 },
      { incident_type: "accident", latitude: 8.54022, longitude: 76.88091, description: "Bicycle collision reported.", timestamp: "2024-10-30T18:57:48Z", distance: 2.89 },
      { incident_type: "crime", latitude: 8.53468, longitude: 76.87601, description: "Medical assistance required.", timestamp: "2024-11-01T11:45:37Z", distance: 0.89 },
      { incident_type: "accident", latitude: 8.53812, longitude: 76.87964, description: "Small fire reported in residential area.", timestamp: "2024-10-29T17:05:25Z", distance: 1.23 },
      { incident_type: "crime", latitude: 8.53388, longitude: 76.88592, description: "Theft reported in the area.", timestamp: "2024-11-03T05:40:10Z", distance: 2.12 },
      { incident_type: "crime", latitude: 8.53259, longitude: 76.87856, description: "Multi-vehicle collision on main road.", timestamp: "2024-11-02T13:25:01Z", distance: 0.88 }
    ]
  };

  // Function to display incidents on the map
  const displayIncidents = (incidents) => {
    markersRef.current.slice(1).forEach(marker => mapRef.current.removeLayer(marker));
    markersRef.current = markersRef.current.slice(0, 1); // Keep only the user marker

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

  // Function to evaluate safety based on recent crimes within 3 km
  const evaluateSafety = (incidents) => {
    const maxDistance = 3; // 3 km
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
      <h1>Nearby Incidents</h1>
      <div id="map" ></div>

      {incidentInfo && (
        <div id="incident-info" className="info-box">
          <strong>Incident Type:</strong> {incidentInfo.type.charAt(0).toUpperCase() + incidentInfo.type.slice(1)}<br />
          <strong>Description:</strong> {incidentInfo.description}<br />
          <strong>Distance from you:</strong> {incidentInfo.distance} km<br />
          <strong>Timestamp:</strong> {incidentInfo.timestamp}
        </div>
      )}

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
