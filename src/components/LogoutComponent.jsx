import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import UserSubscription from './UserSubscription'
import LedgerEntries from './LedgerEntries'
import WalletView from './WalletView'
import { useUser } from '../UserContext';

const LogoutComponent = () => {
  const { currentUser, isLoading } = useUser();

  const getJwtToken = () => {
    return localStorage.getItem('access_token'); // Or however you've named the token in storage
  };

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
      {currentUser && (
        <button
          onClick={handleLogout}
          className="w-full bg-ebp-header text-white text-center py-2 px-4 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-red-700 transition ease-in duration-200 text-md font-semibold shadow-md focus:ring-opacity-50 border border-red-700"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default LogoutComponent;