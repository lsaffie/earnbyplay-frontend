// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import appConfig from './config'; // Adjust the import path as needed

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const getJwtToken = () => {
    return localStorage.getItem('access_token');
  };

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      axios.get(`${appConfig.SERVER_URL}/api/user`, {
          headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => setCurrentUser(response.data.user))
      .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleUserChange = (userData) => {
    setCurrentUser(userData);
  };

  return (
    <UserContext.Provider value={{ currentUser, handleUserChange }}>
      {children}
    </UserContext.Provider>
  );
};