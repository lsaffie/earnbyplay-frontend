import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import UserSubscription from './UserSubscription'
import LedgerEntries from './LedgerEntries'
import WalletView from './WalletView'
import LogoutComponent from './LogoutComponent'
import Modal from './Modal'
import { useUser } from '../UserContext';

const UserDetails = () => {
  const [user, setUser] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [wallet, setWallet] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { currentUser, isLoading } = useUser();

  const getJwtToken = () => {
    return localStorage.getItem('access_token'); // Or however you've named the token in storage
  };

  useEffect(() => {
    // Fetch User Details
    // axios.get(`${appConfig.SERVER_URL}/api/user`, {
    //     headers: {
    //       'Authorization': `Bearer ${getJwtToken()}`
    //     }
    // })
    //   .then(response => setUser(response.data.user))
    //   .catch(error => console.error('Error fetching user data:', error));

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
  }, [currentUser]); // End useEffect

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
      // setUser(response.data.user);
      setModalContent("Changes Saved");
      setIsModalOpen(true);
      setIsEditing(false); // Exit edit mode
    })
    .catch(error => {
      setModalContent("error updating user: " + error);
      setIsModalOpen(true);
      console.error('Error updating user:', error);
    });
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
    // <div className="flex flex-col justify-between h-full">
    <div className="px-2 m-0 sm:px-4 md:px-6 lg:px-8"> {/* Responsive Padding */}


    {currentUser && (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">First name:</label>
          <input type="text" name="first_name" value={currentUser.first_name} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">Last name:</label>
          <input type="text" name="last_name" value={currentUser.last_name} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">Username:</label>
          <input type="text" name="username" value={currentUser.username} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">Email:</label>
          <input type="email" name="email" value={currentUser.email} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-50">Phone Number:</label>
          <input type="text" name="phone_number" value={currentUser.phone_number} onChange={handleInputChange} className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        {/* Include other fields as necessary */}
        <div className="flex justify-end space-x-2">
          <button type="submit" className="px-4 py-2 bg-ebp-cta-green text-white rounded-md hover:bg-ebp-cta-green focus:outline-none focus:ring-2 focus:ring-blue-300">Save Changes</button>
          <button onClick={() => setIsEditing(false)} type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">Cancel</button>
        </div>
      </form>
    )}

    <UserSubscription />
    <WalletView />
    <LogoutComponent />
      
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} content={modalContent} />
    </div>
  );
};

export default UserDetails;