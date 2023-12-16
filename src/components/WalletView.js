import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import LedgerEntries from './LedgerEntries'

const WalletView = () => {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to fetch wallet data
    const fetchWallet = async () => {
      try {
        // Get the stored token from localStorage or wherever it's stored
        const token = localStorage.getItem('access_token');
        // Include the token in the Authorization header
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Make the API call to the endpoint (make sure to replace with your actual API URL)
        const response = await axios.get(`${appConfig.SERVER_URL}/api/wallet/`,config);
        setWallet(response.data); // Set wallet data
      } catch (error) {
        // Handle error: you can set different error messages based on the error status code
        setError('Error fetching wallet data');
      }
    };

    fetchWallet();
  }, []);

  // Render wallet data or an error message
  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {wallet ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Wallet Details</h2>
          <p className="text-md text-gray-600">Balance:</p>
          <p className="text-xl font-bold text-gray-900">{wallet.balance}</p>
          {/* Render additional wallet details here */}
        </div>
      ) : (
        <p className="text-gray-600">Loading wallet data...</p>
      )}
      <LedgerEntries />
    </div>
  );
};

export default WalletView;