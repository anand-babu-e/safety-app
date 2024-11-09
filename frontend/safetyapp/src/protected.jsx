import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Adjusted import
import api from "./api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    // Run authentication check on mount
    checkAuthorization().catch(() => setIsAuthorized(false));
  }, []);

  const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
  const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

  const setAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
  };

  const refreshToken = async () => {
    const refresh = getRefreshToken();
    if (!refresh) {
      setIsAuthorized(false);
      return;
    }

    try {
      const res = await api.post("/api/token/refresh/", { refresh });
      if (res.status === 200) {
        setAccessToken(res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAuthorized(false);
    }
  };

  const checkAuthorization = async () => {
    const token = getAccessToken();
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
