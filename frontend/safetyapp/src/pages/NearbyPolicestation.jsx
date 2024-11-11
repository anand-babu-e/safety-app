import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import '../styles/NearbyLocation.css';


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

const NearbyPolicestation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const mapRef = useRef(null); 
  const markers = useRef([]); 

  useEffect(() => {
    if (mapRef.current) return; 

    const initialMap = L.map("map").setView([37.7749, -122.4194], 13); 

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    }).addTo(initialMap);

    mapRef.current = initialMap;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        setUserLocation({ latitude: userLatitude, longitude: userLongitude });
    
        const customIcon = L.icon({
          iconUrl: '/images/indicator.webp',
          iconSize: [40, 40], 
          iconAnchor: [16, 32], 
          popupAnchor: [0, -32] 
        });
    
        L.marker([userLatitude, userLongitude], { icon: customIcon })
          .addTo(initialMap)
          .bindPopup("You are here")
          .openPopup();
    
        mapRef.current.setView([userLatitude, userLongitude], 13);
        getNearbyLocations(userLatitude, userLongitude);
      });
    }

    const getNearbyLocations = (latitude, longitude) => {
      const map = mapRef.current;
      if (map) {
        markers.current.forEach(marker => map.removeLayer(marker));
        markers.current = [];

        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${latitude},${longitude})[amenity=police];out;`;

        fetch(overpassUrl)
          .then(response => response.json())
          .then(data => {
            data.elements.forEach(location => {
              const locationLat = location.lat;
              const locationLon = location.lon;
              const distance = calculateDistance(latitude, longitude, locationLat, locationLon);

              const marker = L.marker([locationLat, locationLon]).addTo(map);
              markers.current.push(marker);

              marker.bindPopup(`
                <b>${location.tags.name || "Police Station"}</b><br>
                Distance: ${distance.toFixed(2)} km
              `);

              marker.on("click", () => {
                setLocationInfo({
                  name: location.tags.name || "Unknown",
                  type: "Police Station",
                  distance: distance.toFixed(2),
                  link: `https://www.google.com/maps?q=${locationLat},${locationLon}`
                });
              });
            });
          })
          .catch(error => {
            console.error("Error fetching data from Overpass API:", error);
          });
      }
    };

  }, []); 

  return (
    <div>
      <div id="map"></div>


      {locationInfo && (
        <div id="location-info" className="info-box">
          <strong>{locationInfo.type}:</strong> {locationInfo.name}<br />
          <strong>Distance from you:</strong> {locationInfo.distance} km<br />
          <a href={locationInfo.link} target="_blank" rel="noopener noreferrer">
            View in Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default NearbyPolicestation;
