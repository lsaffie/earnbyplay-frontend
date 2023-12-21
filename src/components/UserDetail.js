import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import UserSubscription from './UserSubscription'
import LedgerEntries from './LedgerEntries'

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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

    // Fetch Subscriptions
    axios.get(`${appConfig.SERVER_URL}/api/subscription/`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
    })
      .then(response => setSubscriptions(response.data.subscriptions))
      .catch(error => console.error('Error fetching subscriptions:', error));

    // Fetch Wallet Details
    axios.get(`${appConfig.SERVER_URL}/api/wallet/`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
      })
      .then(response => setWallet(response.data))
      .catch(error => console.error('Error fetching wallet data:', error));

    // Fetch Wallet Transactions
    axios.get(`${appConfig.SERVER_URL}/api/ledger/`,{
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
      })
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, [userId]); // End useEffect

    // Function to handle input change
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to update user
    axios.patch(`${appConfig.SERVER_URL}/api/user`, user, {
      headers: {
        'Authorization': `Bearer ${getJwtToken()}`
      }
    })
    .then(response => {
      setUser(response.data.user);
      setIsEditing(false); // Exit edit mode
    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
  };


  return (
    <div>

    {isEditing ? (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">First name:</label>
          <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">Last name:</label>
          <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">Username:</label>
          <input type="text" name="username" value={user.username} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">Phone Number:</label>
          <input type="text" name="phone_number" value={user.phone_number} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        {/* Include other fields as necessary */}
        <div className="flex justify-end space-x-2">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Save Changes</button>
          <button onClick={() => setIsEditing(false)} type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">Cancel</button>
        </div>
      </form>
    ) : (
      user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-50">First name:</label>
            <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-50">Last name:</label>
            <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-50">Username:</label>
            <input type="text" name="username" value={user.username} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-50">Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-50">Phone Number:</label>
            <input type="text" name="phone_number" value={user.phone_number} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          {/* Include other fields as necessary */}
          <div className="flex justify-end space-x-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">Save Changes</button>
            <button onClick={() => setIsEditing(false)} type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">Cancel</button>
          </div>
        </form>
      )

    )}
    <UserSubscription userId={userId}/>
    {wallet && (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Wallet</h3>
        </div>
        <div>
          <p className="text-md text-gray-600">Balance:</p>
          <p className="text-xl font-bold text-gray-900">{wallet.balance}</p>
        </div>
        {/* Include other wallet details here as needed */}
      </div>
    )}
    <LedgerEntries userId={userId} />
      
    </div>
  );
};

export default UserDetails;