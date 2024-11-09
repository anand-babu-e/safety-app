
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AlertProvider } from './pages/alertcontext';
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
import NearbyLocations from './pages/NearbyLocations';
import NearbyIncidents from './pages/safety';
import SelfDefense from './pages/selfdefence';
import ProtectedRoute from "./protected";

function SignUpAndLogout() {
  localStorage.clear()
  return <SignUp />
}
function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );}
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSafetyDropdown, setShowSafetyDropdown] = useState(false);
  const [showEmergencyDropdown, setShowEmergencyDropdown] = useState(false);
  const [showStressDropdown, setShowStressDropdown] = useState(false);
  const [showGameDropdown, setShowGameDropdown] = useState(false);
  const [showselfdefence, setSelfdefenceDropdown] = useState(false);
  const [user, setUser] = useState({ username: '' }); // Initially empty username

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUser({ username: storedUsername });
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    console.log(username)
    setUser({ username });
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
  };



  return (
    <AlertProvider>
      <Router>
        <div>
          <nav className="navbar">
            <div className="items">
              <h3>SafeApp</h3>
              <Link to="/">Home</Link>
              {/* Navigation links */}
              <div 
              className="dropdown" 
              onMouseEnter={() => setShowSafetyDropdown(true)}
              onMouseLeave={() => setShowSafetyDropdown(false)}
            >
              <span>Safety</span>
              {showSafetyDropdown && (
                <div className="dropdown-menu">
                   <div
            className="sub-dropdown"
            onMouseEnter={() => setSelfdefenceDropdown(true)}
            onMouseLeave={() => setSelfdefenceDropdown(false)}
          >
                  <Link to="/safety-tips">Safety Tips</Link>
                  {showselfdefence && (
              <div className="sub-dropdown-menu">
                <Link to="/selfdefence">Self Defence for Women</Link>
                <Link to="/guess">Guess the Animal Game</Link>
              </div>
            )}
            </div>
                  <Link to="/safety">Safe Location Near me</Link>
                  
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
                  <Link to="/nearby">Hospital</Link>
                  <Link to="/nearby">Police</Link>
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
                      <Logout setIsLoggedIn={setIsLoggedIn} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/memgame" element={<ProtectedRoute><MemoryGame /></ProtectedRoute>} />
              <Route path="/guess" element={<ProtectedRoute><GuessTheWord /></ProtectedRoute>} />
              <Route path="/safety-tips" element={<ProtectedRoute><SafetyTips /></ProtectedRoute>} />
              <Route path="/first-aid" element={<ProtectedRoute><FirstAidPage /></ProtectedRoute>} />
              <Route path="/stress-tips" element={<ProtectedRoute><StressManagement /></ProtectedRoute>} />
              <Route path="/doctor" element={<ProtectedRoute><CounselingService /></ProtectedRoute>} />
              <Route path="/sos" element={<ProtectedRoute><SOSRequestForm /></ProtectedRoute>} />
              <Route path="/nearby" element={<ProtectedRoute><NearbyLocations /></ProtectedRoute>} />
              <Route path="/safety" element={<ProtectedRoute><NearbyIncidents /></ProtectedRoute>} />
              <Route path="/selfdefence" element={<ProtectedRoute><SelfDefense /></ProtectedRoute>} />
              <Route path="/stress-quiz" element={<ProtectedRoute><StressQuiz /> </ProtectedRoute>}/>
              {/* <Route path="/logout" element={<Logout />} /> */}
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
