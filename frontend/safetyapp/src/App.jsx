import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AlertProvider } from './AlertContext';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Profile from './profile';
import MemoryGame from './memorygame';
import StressQuiz from './stressquiz';
import GuessTheWord from './guess';
import './App.css';
import SafetyTips from './safetytips';
import FirstAidPage from './FirstAid';
import StressManagement from './StressTips';
import CounselingService from './ConsultDoctor';
import SOSRequestForm from './sos';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: 'JohnDoe' }); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const [showSafetyDropdown, setShowSafetyDropdown] = useState(false);
  const [showEmergencyDropdown, setShowEmergencyDropdown] = useState(false);
  const [showStressDropdown, setShowStressDropdown] = useState(false);
  const [showGameDropdown, setShowGameDropdown] = useState(false);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <AlertProvider>
    <Router>
      <div>
        <nav className="navbar">
          <div className="items">
            <h3>SafeApp</h3>
            <Link to="/">Home</Link>

            <div 
              className="dropdown" 
              onMouseEnter={() => setShowSafetyDropdown(true)}
              onMouseLeave={() => setShowSafetyDropdown(false)}
            >
              <span>Safety</span>
              {showSafetyDropdown && (
                <div className="dropdown-menu">
                  <Link to="/safety-tips">Safety Tips</Link>
                  <Link to="/emergency-contacts">Safe Location Near me</Link>
                </div>
              )}
            </div>

            <div 
              className="dropdown" 
              onMouseEnter={() => setShowEmergencyDropdown(true)}
              onMouseLeave={() => setShowEmergencyDropdown(false)}
            >
              <span>Emergency</span>
              {showEmergencyDropdown && (
                <div className="dropdown-menu">
                  <Link to="/first-aid">First Aid</Link>
                  <Link to="/Ambulance">Ambulance</Link>
                  <Link to="/Police">Police</Link>
                </div>
              )}
            </div>

            <div 
      className="dropdown" 
      onMouseEnter={() => setShowStressDropdown(true)}
      onMouseLeave={() => setShowStressDropdown(false)}
    >
      <span>Stress</span>
      {showStressDropdown && (
        <div className="dropdown-menu">
          <div
            className="sub-dropdown"
            onMouseEnter={() => setShowGameDropdown(true)}
            onMouseLeave={() => setShowGameDropdown(false)}
          >
          <Link to="/memgame">Take a Stress Relief Game</Link>
            {showGameDropdown && (
              <div className="sub-dropdown-menu">
                <Link to="/memgame">Memory Game</Link>
                <Link to="/guess">Guess the Animal Game</Link>
              </div>
            )}
          </div>

          <Link to="/stress-tips">Stress Relief Tips</Link>
          <Link to="/doctor">Consult a Doctor</Link>
        </div>
      )}
      </div>
            {!isLoggedIn ? (
              <Link to="/login" className="submit-btn2">Login</Link>
            ) : (
              <div className="user-info" 
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}>
                <img src="download.jpg" alt="User Icon" className="user-icon" />
                <span>{user.username}</span>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/memgame" element={<MemoryGame />} />  
            <Route path="/guess" element={<GuessTheWord />} />     
            <Route path="/safety-tips" element={<SafetyTips />} /> 
            <Route path="/first-aid" element={<FirstAidPage />} />  
            <Route path="/stress-quiz" element={<StressQuiz />} />
            <Route path="/doctor" element={<CounselingService />} />
            <Route path="/sos" element={<SOSRequestForm />} />
            <Route path="/stress-tips" element={<StressManagement />} />
          </Routes>
        </main>
        <footer className="footer">
          <hr />
          Copyright SafeApp.com | All rights reserved
        </footer>
      </div>
    </Router>
    </AlertProvider>
  );
}

export default App;
