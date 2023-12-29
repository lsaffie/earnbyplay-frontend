import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';

const WalletBalance = ({ userId }) => {
  const [wallet, setWallet] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(`${appConfig.SERVER_URL}/api/wallet/`, config)
      .then(response => setWallet(response.data))
      .catch(error => {
        setError('Error fetching wallet data');
      });
  }, [userId]);

  // Render wallet data or an error message
  return (
    <div className="md:flex"> {/* Responsive Padding */}
        <div className="bg-ebp-cta-green-earn-font shadow rounded-md p-3">
          <p className="text-sm font-bold text-gray-900">${wallet.balance}</p>
        </div>
    </div>
  );
};

export default WalletBalance;