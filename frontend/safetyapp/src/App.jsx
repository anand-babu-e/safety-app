
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import Home from './pages/home';
import Profile from './pages/profile';
import MemoryGame from './pages/memorygame';
import StressQuiz from './pages/stressquiz';
import GuessTheWord from './pages/guess';
import './App.css';
import SafetyTips from './pages/safetytips';
import FirstAidPage from './pages/FirstAid';
import StressManagement from './pages/StressTips';
import CounselingService from './pages/ConsultDoctor';
import SOSRequestForm from './pages/sos';
import NearbyLocations from './pages/NearbyHospital';
import NearbyPolicestation from './pages/NearbyPolicestation';
import NearbyIncidents from './pages/safety';
import SelfDefense from './pages/selfdefence';
import ProtectedRoute from "./protected";
import SafetyPage from './pages/safetyTravel';

function SignUpAndLogout() {
  localStorage.clear()
  return <SignUp />
}

function Logout({ setIsLoggedIn, setShowDropdown }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSafetyDropdown, setShowSafetyDropdown] = useState(false);
  const [showEmergencyDropdown, setShowEmergencyDropdown] = useState(false);
  const [showStressDropdown, setShowStressDropdown] = useState(false);
  const [showGameDropdown, setShowGameDropdown] = useState(false);
  const [showSelfdefence, setSelfdefenceDropdown] = useState(false);
  const [user, setUser] = useState({ username: '' }); 
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUser({ username: storedUsername });
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    setUser({ username });
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <div className="logo">
              <img style={{ height: 'auto', width: '90px', margin: '0' }} src="/images/W.E.L.L.png" alt="logo" />
            </div>
            <div className="nav-links">
              <Link style={{ color:'white'}}  to="/">Home</Link>
              <div className="dropdown" onMouseEnter={() => setShowSafetyDropdown(true)} onMouseLeave={() => setShowSafetyDropdown(false)}>
                <span>Safety</span>
                {showSafetyDropdown && (
                  <div className="dropdown-menu">
                    <div className="sub-dropdown" onMouseEnter={() => setSelfdefenceDropdown(true)} onMouseLeave={() => setSelfdefenceDropdown(false)}>
                      <Link to="/safety-tips">Safety Tips</Link>
                      {showSelfdefence && (
                        <div className="sub-dropdown-menu">
                          <Link to="/selfdefence">Self Defence for Women</Link>
                          <Link to="/safety-travel">Travel Tips</Link>
                        </div>
                      )}
                    </div>
                    <Link to="/safety">Safety Check</Link>
                  </div>
                )}
              </div>

              <div className="dropdown" onMouseEnter={() => setShowEmergencyDropdown(true)} onMouseLeave={() => setShowEmergencyDropdown(false)}>
                <span>Emergency</span>
                {showEmergencyDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/first-aid">First Aid</Link>
                    <Link to="/hospital">Hospital</Link>
                    <Link to="/police">Police</Link>
                  </div>
                )}
              </div>

              <div className="dropdown" onMouseEnter={() => setShowStressDropdown(true)} onMouseLeave={() => setShowStressDropdown(false)}>
                <span>Stress</span>
                {showStressDropdown && (
                  <div className="dropdown-menu">
                    <div className="sub-dropdown" onMouseEnter={() => setShowGameDropdown(true)} onMouseLeave={() => setShowGameDropdown(false)}>
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
            </div>
          </div>

          <div className="navbar-right">
            {!isLoggedIn ? (
              <Link to="/login" className="submit-btn2">Login</Link>
            ) : (
              <div className="user-info" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                <img src="download.jpg" alt="User Icon" className="user-icon" />
                <span>{user.username}</span>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/profile">Profile</Link>
                    <Logout setIsLoggedIn={setIsLoggedIn} setShowDropdown={setShowDropdown} />
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUpAndLogout />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProtectedRoute><Profile setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
            <Route path="/memgame" element={<MemoryGame />} />
            <Route path="/guess" element={<GuessTheWord />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/first-aid" element={<FirstAidPage />} />
            <Route path="/stress-tips" element={<StressManagement />} />
            <Route path="/doctor" element={<CounselingService />} />
            <Route path="/sos" element={<ProtectedRoute><SOSRequestForm /></ProtectedRoute>} />
            <Route path="/hospital" element={<NearbyLocations />} />
            <Route path="/police" element={<NearbyPolicestation />} />
            <Route path="/safety" element={<NearbyIncidents />} />
            <Route path="/selfdefence" element={<SelfDefense />} />
            <Route path="/stress-quiz" element={<StressQuiz />} />
            <Route path="/safety-travel" element={<SafetyPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <hr />
          Copyright W.E.L.L.com | All rights reserved
        </footer>
      </div>
    </Router>
  );
}

export default App;
