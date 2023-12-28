import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import UserSubscription from './UserSubscription'
import LedgerEntries from './LedgerEntries'
import WalletView from './WalletView'

const LogoutComponent = ({ userId }) => {
  const [user, setUser] = useState(false);

  const getJwtToken = () => {
    return localStorage.getItem('access_token'); // Or however you've named the token in storage
  };

  useEffect(() => {
    // Fetch User Details
    axios.get(`${appConfig.SERVER_URL}/api/user`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
    })
      .then(response => setUser(response.data.user))
      .catch(error => console.error('Error fetching user data:', error));
  }, [userId]); // End useEffect

  const handleLogout = async () => {
    try {
      await axios.post(`${appConfig.SERVER_URL}/api/logout`, {
        refresh_token: localStorage.getItem('refresh_token')
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(function(response) {
        localStorage.removeItem('access_token'); // Remove the token
        localStorage.removeItem('refresh_token'); // Remove the refresh token
      });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <div>
      {userId && (
        <button onClick={handleLogout} className="w-full text-blue-500 text-center py-2">
          Logout
        </button>
      )}
    </div>
  );
};

export default LogoutComponent;