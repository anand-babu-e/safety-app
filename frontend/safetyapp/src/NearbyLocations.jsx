import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './NearbyLocation.css';

// Function to calculate distance using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const NearbyLocations = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationType, setLocationType] = useState("hospital");
  const [locationInfo, setLocationInfo] = useState(null);
  const mapRef = useRef(null); // Ref to hold map instance
  const markers = useRef([]); // Ref to store markers

  // Initialize map and set default position
  useEffect(() => {
    if (mapRef.current) return; // Only initialize once

    const initialMap = L.map("map").setView([37.7749, -122.4194], 13); // San Francisco coordinates as fallback

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    }).addTo(initialMap);

    mapRef.current = initialMap;
    
    // Fetch user's location once the map is ready
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        setUserLocation({ latitude: userLatitude, longitude: userLongitude });

        initialMap.setView([userLatitude, userLongitude], 13);
        L.marker([userLatitude, userLongitude]).addTo(initialMap).bindPopup("You are here").openPopup();
      });
    }
  }, []);

  // Fetch nearby locations from Overpass API
  const getNearbyLocations = (latitude, longitude, locationType) => {
    const map = mapRef.current; // Get the map instance from the ref
    if (map) {
      // Clear existing markers
      markers.current.forEach(marker => map.removeLayer(marker));
      markers.current = []; // Reset markers

      const amenity = locationType === "police" ? "police" : "hospital";
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${latitude},${longitude})[amenity=${amenity}];out;`;

      fetch(overpassUrl)
        .then(response => response.json())
        .then(data => {
          data.elements.forEach(location => {
            const locationLat = location.lat;
            const locationLon = location.lon;
            const distance = calculateDistance(latitude, longitude, locationLat, locationLon);

            // Create marker and add to map
            const marker = L.marker([locationLat, locationLon]).addTo(map);
            markers.current.push(marker); // Add marker to the array

            marker.bindPopup(`
              <b>${location.tags.name || locationType.charAt(0).toUpperCase() + locationType.slice(1)}</b><br>
              Distance: ${distance.toFixed(2)} km
            `);

            // Display the location info when clicked
            marker.on("click", () => {
              setLocationInfo({
                name: location.tags.name || "Unknown",
                type: locationType.charAt(0).toUpperCase() + locationType.slice(1),
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


  const handleNearbyClick = () => {
    if (userLocation) {
      getNearbyLocations(userLocation.latitude, userLocation.longitude, locationType);
    } else {
      alert("Fetching location... Please try again in a few seconds.");
    }
  };

  return (
    <div>
      <h1>Nearby Locations</h1>

      {/* Dropdown for selecting location type */}
      <div id="nearby-options">
        <button onClick={handleNearbyClick}>Show Nearby</button>
        <select
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
          id="locationType"
        >
          <option value="hospital">Hospitals</option>
          <option value="police">Police Stations</option>
        </select>
      </div>

      <div id="map"></div>

      {/* Location info box */}
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

export default NearbyLocations;
