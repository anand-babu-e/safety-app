import React, { useContext } from 'react';
import { AlertContext } from './alertcontext';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home({ isLoggedIn }) {
  // const { alertMessage, location, updateLocation } = useContext(AlertContext);
  const alertnavigate = useNavigate();
  const handleAlertClick = () => {
    // updateLocation();
    // if (location) {
    //   console.log(`Sending Alert: ${alertMessage} at Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
    //   alert(`Alert sent: ${alertMessage} \nLocation: Latitude ${location.latitude}, Longitude ${location.longitude}`);
    // } else {
    //   alert("Fetching location... Please try again in a few seconds.");
    // }
  
      alertnavigate('/sos'); 
}
    const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/stress-quiz'); 
  };
  

  return (
    <div className='home'>
      <div className="tabs">
        <div>
          <h1>Are you Safe</h1>
          <h3>If Not!!</h3>
          <button onClick={handleAlertClick} className="alert">Send Alert</button>
        </div>
        <div>
          <h1>Are you Stressed</h1>
          <button onClick={handleNavigate} className="stressb">Take a stress quiz</button>
        </div>
      </div>
      <p>
      In today's fast-paced urban settings, personal safety and mental well-being are essential yet often overlooked. 
      People in high-risk areas or those facing everyday challenges like crime, harassment, and accidents can feel vulnerable and unprepared. 
      The impact goes beyond physical risks, as stress from personal safety concerns can deeply affect mental and emotional health. 
      This system is designed to empower individuals by offering an all-in-one, user-friendly solution that prioritizes both safety and well-being. 
      By integrating tools for emergency response and mental health support, this system aims to give users the confidence, peace of mind, and resilience needed to navigate urban life safely and positively.
      Whether you're seeking immediate safety assistance or resources to manage stress, this platform is your reliable companion in maintaining both personal security and mental health.
      </p>
    </div>
  );
}

export default Home;
