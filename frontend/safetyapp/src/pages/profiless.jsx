import React, { useState, useEffect } from 'react';
import '../styles/sos.css'

const SOSRequestForm = () => {
  const [emergencyType, setEmergencyType] = useState('Medical');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [message, setMessage] = useState('I am in danger');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setStatus("Unable to retrieve location. Please enter manually.");
        }
      );
    } else {
      setStatus("Geolocation not supported by your browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const alertMessage = `Emergency Type: ${emergencyType}\nMessage: ${message}\nLocation: ${googleMapsLink}`;

    alert(alertMessage); 
    const data = {
      emergency_type: emergencyType,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      message: message,
    };
  };

  return (
      <div className='sos'>
           <h1>SOS Request Form</h1>
    <div className='sos-form-container'>
      <form onSubmit={handleSubmit}>
        <label>
          Emergency Type:
          <select
            value={emergencyType}
            onChange={(e) => setEmergencyType(e.target.value)}
            required
          >
            <option value="Medical">Medical</option>
            <option value="Fire">Fire</option>
            <option value="Crime">Crime</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Latitude:
          <input
            type="number"
            step="0.000001"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </label>

        <label>
          Longitude:
          <input
            type="number"
            step="0.000001"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </label>

        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button type="submit">Send SOS Request</button>
      </form>

      {status && <p>{status}</p>}
    </div>
    </div>
  );
};

export default SOSRequestForm;
