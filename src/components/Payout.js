// React Rewards.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import WalletBalance from './WalletBalance.jsx'

const Payout = ({ userId }) => {
  const [user, setUser] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState('');
  const [amount, setAmount] = useState(''); // do I need this?
  
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

    // Fetch Wallet Details
    axios.get(`${appConfig.SERVER_URL}/api/wallet/`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
      })
      .then(response => setWallet(response.data))
      .catch(error => console.error('Error fetching wallet data:', error));
  }, [userId]);

    const selectReward = (reward) => {
      setSelectedReward(reward);
    };

    const handleCashOut = (e) => {
      e.preventDefault();
      if (userId && wallet) {
        //TODO: link this to GeneratePayoutLinkView
        const floorBalance = Math.floor(wallet.balance); // Get the floor value of wallet.balance

        axios.post(`${appConfig.SERVER_URL}/api/generate-payout-link/`, 
          { user_id: userId,
            wallet_balance: floorBalance
          }, 
          { 
            headers: {
              'Authorization': `Bearer ${getJwtToken()}`
            }
          }
        )
            .then(response => {
                alert("Cash out successful");
            })
            .catch(error => {
                alert("Cash out failed");
                console.error(error);
            });
      }
    };

    return (
        <div className="m-2">
            <h2 className="flex items-left space-x-1 text-xl font-bold text-white">
              <span> Available balance: </span>
              <span> ${wallet ? Math.floor(wallet.balance) : 'Loading...'} </span> {/* Display the floor value of wallet.balance */}
              <span>Click to redeem for cash or choose from our vast gift card selection.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            </div>
            {selectedReward && (
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleCashOut}>
                    Cash Out Selected Reward
                </button>
            )}
            <form onSubmit={handleCashOut} className="bg-ebp-header p-5 mb-5">
              <div className="mb-4">
                <label htmlFor="formBasicUsername" className="block text-md font-medium text-gray-200">Amount to redeem: ${wallet ? Math.floor(wallet.balance) : 'Loading...'}</label>
              </div>

              <button 
                type="submit" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                redeem
              </button>

              <h2 className="text-sm text-left text-gray-400 mt-5">
              Click "Submit" to get a link for cashing out from our partner selection. Your wallet will be automatically debited for the chosen amount.
              </h2>
            </form>

        </div>
    );
};

export default Payout;