import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    axios.get(`/api/user`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
    })
      .then(response => setUser(response.data.user))
      .catch(error => console.error('Error fetching user data:', error));

    // Fetch Subscriptions
    axios.get(`/api/subscription/`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
    })
      .then(response => setSubscriptions(response.data.subscriptions))
      .catch(error => console.error('Error fetching subscriptions:', error));

    // Fetch Wallet Details
    axios.get(`/api/wallet/`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
      })
      .then(response => setWallet(response.data))
      .catch(error => console.error('Error fetching wallet data:', error));

    // Fetch Wallet Transactions
    axios.get(`/api/ledger/`,{
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
    axios.patch(`/api/user`, user, {
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


      {subscriptions.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Subscriptions</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {subscriptions.map((subscription, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm font-medium text-gray-600">Id</p>
                    <p className="mt-1 text-sm text-gray-900">{subscription.id}</p>
                  </div>
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm font-medium text-gray-600">Plan Name</p>
                    <p className="mt-1 text-sm text-gray-900">{subscription.plan_name}</p>
                  </div>
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm font-medium text-gray-600">Start Date</p>
                    <p className="mt-1 text-sm text-gray-900">{subscription.start_date}</p>
                  </div>
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm font-medium text-gray-600">End Date</p>
                    <p className="mt-1 text-sm text-gray-900">{subscription.end_date}</p>
                  </div>
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="mt-1 text-sm text-gray-900">{subscription.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Braintree Subscription ID</p>
                    <p className="mt-1 text-sm text-gray-900">{subscription.braintree_subscription_id}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
      </div>

      )}
      
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
      
      {transactions.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Transactions</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;