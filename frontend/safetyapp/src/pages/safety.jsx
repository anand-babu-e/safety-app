// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import axios from "axios";
// import "leaflet/dist/leaflet.css";
// import "../styles/safety.css";
// import { ACCESS_TOKEN } from "../constants";

// const NearbyIncidents = () => {
//   const [incidentInfo, setIncidentInfo] = useState(null);
//   const [safetyRating, setSafetyRating] = useState(null);
//   const [incidents, setIncidents] = useState([]);
//   const mapRef = useRef(null); // Ref for the map instance
//   const markersRef = useRef([]); // Ref for storing markers

//   const userLat = 8.53665;
//   const userLon = 76.883202;

//   // Fetch incidents from the API
//   const fetchIncidents = async () => {
//     try {
//       const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve token from localStorage
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/nearby-incidents/?latitude=${userLat}&longitude=${userLon}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Attach token to headers for authentication
//           },
//         }
//       );
//       setIncidents(response.data); // Update incidents state with fetched data
//     } catch (error) {
//       console.error("Error fetching incidents:", error);
//     }
//   };

//   useEffect(() => {
//     // Initialize the map only once
//     if (!mapRef.current) {
//       mapRef.current = L.map("map").setView([userLat, userLon], 13); // Set initial map view to user's location
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapRef.current);

//       // Add user's location marker to the map
//       const userMarker = L.marker([userLat, userLon], { title: "Your Location" })
//         .addTo(mapRef.current)
//         .bindPopup("<b>Your current location</b>")
//         .openPopup();

//       markersRef.current.push(userMarker); // Keep track of user marker
//     }

//     // Fetch incidents when the component mounts
//     fetchIncidents();

//   }, []); // Empty dependency array ensures the map is initialized and incidents are fetched only once

//   useEffect(() => {
//     // Only trigger this effect when incidents data is fetched
//     co
//     if (incidents && incidents.length > 0) {
//       displayIncidents(incidents);
//       evaluateSafety(incidents);
//     }
//   }, [incidents]); // This effect runs when incidents data is updated

//   // Function to display incidents on the map
//   const displayIncidents = (incidents) => {
//     // Log incidents data for debugging
//     console.log("Displaying incidents:", incidents);

//     // Remove any previously added markers (except the user marker)
//     markersRef.current.slice(1).forEach((marker) => mapRef.current.removeLayer(marker));
//     markersRef.current = markersRef.current.slice(0, 1); // Keep only the user marker

//     // Add markers for each incident
//     incidents.forEach((incident) => {
//       console.log(`Incident location: ${incident.latitude}, ${incident.longitude}`);
//       const marker = L.marker([incident.latitude, incident.longitude]).addTo(mapRef.current);
//       markersRef.current.push(marker);

//       // Bind popup content to the marker
//       marker.bindPopup(`
//         <b>${incident.incident_type.charAt(0).toUpperCase() + incident.incident_type.slice(1)}</b><br>
//         <b>Description:</b> ${incident.description}<br>
//         <b>Distance:</b> ${incident.distance.toFixed(2)} km<br>
//         <b>Time:</b> ${new Date(incident.timestamp).toLocaleString()}
//       `);

//       // When a marker is clicked, show detailed incident info
//       marker.on("click", () => {
//         setIncidentInfo({
//           type: incident.incident_type,
//           description: incident.description,
//           distance: incident.distance.toFixed(2),
//           timestamp: new Date(incident.timestamp).toLocaleString(),
//         });
//       });
//     });
//   };

//   // Function to evaluate safety based on recent crimes within 3 km
//   const evaluateSafety = (incidents) => {
//     const maxDistance = 3; // 3 km
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Filter for incidents in the past month

//     const recentCrimes = incidents.filter(
//       (incident) =>
//         incident.incident_type === "crime" &&
//         incident.distance <= maxDistance &&
//         new Date(incident.timestamp) >= oneMonthAgo
//     );

//     const crimeCount = recentCrimes.length;
//     let safetyStatus;

//     if (crimeCount < 3) {
//       safetyStatus = "Safe";
//     } else if (crimeCount <= 5) {
//       safetyStatus = "Moderately Safe";
//     } else {
//       safetyStatus = "Unsafe";
//     }

//     setSafetyRating({
//       status: safetyStatus,
//       count: crimeCount,
//     });
//   };

//   return (
//     <div className="safety">
//       <h1>Nearby Incidents</h1>
//       <div id="map" style={{ height: "500px" }}></div> {/* Add a height for the map to display correctly */}

//       {incidentInfo && (
//         <div id="incident-info" className="info-box">
//           <strong>Incident Type:</strong> {incidentInfo.type.charAt(0).toUpperCase() + incidentInfo.type.slice(1)}<br />
//           <strong>Description:</strong> {incidentInfo.description}<br />
//           <strong>Distance from you:</strong> {incidentInfo.distance} km<br />
//           <strong>Timestamp:</strong> {incidentInfo.timestamp}
//         </div>
//       )}

//       {safetyRating && (
//         <div id="safety-rating" className="info-box">
//           <strong>Safety Status:</strong> {safetyRating.status}<br />
//           <strong>Total Recent Crimes within 3 km:</strong> {safetyRating.count} (last month)
//         </div>
//       )}
//     </div>
//   );
// };

// export default NearbyIncidents;
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
  const mapRef = useRef(null); // Ref for the map instance
  const markersRef = useRef([]); // Ref for storing markers

  const userLat = 8.53665;
  const userLon = 76.883202;

  useEffect(() => {
    // Fetch incidents from the API with authorization
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve token from localStorage

        if (!token) {
          console.error("No access token found.");
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/nearby-incidents/?latitude=${userLat}&longitude=${userLon}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to headers for authentication
            },
          }
        );
        
        setIncidents(response.data.incidents); // Assuming the response structure contains an 'incidents' array
        displayIncidents(response.data.incidents);
        evaluateSafety(response.data.incidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();

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

    // Cleanup function to remove markers on unmount
    // return () => {
    //   markersRef.current.forEach(marker => {
    //     mapRef.current.removeLayer(marker);
    //   });
    // };
  }, []); // Empty dependency array to only run once when component mounts

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
      <div id="map"></div>

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
