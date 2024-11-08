import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState('I am in danger'); // Default message
  const [location, setLocation] = useState(null);

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => console.error("Error fetching location:", error)
    );
  };

  return (
    <AlertContext.Provider value={{ alertMessage, setAlertMessage, location, updateLocation }}>
      {children}
    </AlertContext.Provider>
  );
};
