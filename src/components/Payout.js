// React Rewards.jsx
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import appConfig from '../config';
import WalletBalance from './WalletBalance.jsx'
import PayoutsTable from './PayoutsTable.js'
import Modal from './Modal'
import { useUser } from '../UserContext'; // Import useUser hook

const Payout = () => {
  const [user, setUser] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState('');
  const [amount, setAmount] = useState(''); // do I need this?
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { currentUser } = useUser(); // Use useUser hook to get currentUser
  
  const getJwtToken = () => {
    return localStorage.getItem('access_token'); // Or however you've named the token in storage
  };

  useEffect(() => {
    // Fetch User Details
    // axios.get(`${appConfig.SERVER_URL}/api/user`, {
    //   headers: {
    //     'Authorization': `Bearer ${getJwtToken()}`
    //   }
    // })
    //   .then(response => setUser(response.data.user))
    //   .catch(error => console.error('Error fetching user data:', error));

    // Fetch Wallet Details
    axios.get(`${appConfig.SERVER_URL}/api/wallet/`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
      })
      .then(response => setWallet(response.data))
      .catch(error => console.error('Error fetching wallet data:', error));
  }, [currentUser]);

    const selectReward = (reward) => {
      setSelectedReward(reward);
    };

    const handleCashOut = (e) => {
      e.preventDefault();
      if (currentUser && wallet) {
        //TODO: link this to GeneratePayoutLinkView
        const floorBalance = Math.floor(wallet.balance); // Get the floor value of wallet.balance

        axios
          .post(
            `${appConfig.SERVER_URL}/api/generate-payout-link/`,
            { user_id: currentUser.id, wallet_balance: floorBalance },
            {
              headers: {
                Authorization: `Bearer ${getJwtToken()}`,
              },
            }
          )
          .then((response) => {
            if (response.data && response.data.success) {
              const payoutUrl = response.data.payout_url;
              setModalContent(
                <div>
                  Cashout Successful.
                  <a href={payoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"> 
                      Click here to view your payout
                  </a>
                </div>
              );
            } else {
              setModalContent("Cashout failed: " + (response.data.message || "An unexpected error occurred. Please contact us."));
            }
            setIsModalOpen(true);
          })
          .catch((error) => {
            // Check if error response exists and has a data object
            if (
              error.response && error.response.data && error.response.data.error
            ) {
              setModalContent("Cashout failed: " + error.response.data.error);
            } else {
              setModalContent("Cashout failed: An unexpected error occurred");
            }
            setIsModalOpen(true);
            console.error(error);
          });
      }
    };

  if (!currentUser) {
    return (
      <div className="w-full px-4">
        <p className="text-3xl mt-3 text-red-500">
          Sign up to earnbyplay!
        </p>
        <a href="/signup" className="w-full py-100 m-10 text-center bg-ebp-cta-green rounded hover:bg-ebp-cta-green transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg text-sm font-medium">
          Sign Up 
        </a>
      </div>
    );
  }

  if ( currentUser && !currentUser?.active_subscription) {
    return (
      <>
        <p className="text-md mt-3 text-red-500">
          Subscribe to cashout!
        </p>
        <a href="/subscribe" className="inline-block text-center bg-ebp-cta-green text-white py-2 px-4 mt-4 rounded hover:bg-ebp-cta-green transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg text-sm font-medium">
          Subscribe
        </a>
      </>
    );
  }

  return (
    <div className="m-2">
      {!wallet || (wallet && wallet.balance) < 1 ? (
        <div>
          <p className="text-white text-lg mt-10">
            You can only cash out when you have earned at least 1 reward.
          </p>
          <p className="text-white text-lg mb-10 mt-1">
            Click the link below to earn cash!
          </p>
          <Link
            to="/offerwall"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ebp-cta-green hover:bg-ebp-cta-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Earn
          </Link>
        </div>
      ) : (
        <>
          <h3 className="items-start text-left space-x-1 text-xl font-bold text-white mb-5">
            <span>${wallet ? Math.floor(wallet.balance) : "Loading..."}</span>
            <span>
              Available to redeem for cash or choose from our vast gift card
              selection.
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"></div>
          {selectedReward && (
            <button
              className="mt-4 px-4 py-2 bg-ebp-cta-green text-white rounded hover:bg-ebp-cta-green"
              onClick={handleCashOut}
            >
              Cash Out Selected Reward
            </button>
          )}
          <form onSubmit={handleCashOut} className="bg-ebp-header p-5 mb-5">
            <div className="mb-4">
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-ebp-cta-green hover:bg-ebp-cta-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Withdraw Gift Cards
            </button>
          </form>

          <h3 className="text-center space-x-1 text-xl font-bold text-white mb-5">
            Or
          </h3>

          <div className="bg-ebp-header p-5 mt-5 mb-5">
            <a
              href={/paypal-withdrawal/}
              rel="noopener noreferrer"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:ring-offset-2"
            >
              Withdraw Cash via PayPal
            </a>
          </div>

          <h2 className="text-sm text-left text-gray-400 mt-5">
            * Please note that redemptions from your wallet can only be made in
            whole dollar amounts. Any remaining cents will stay in your wallet
            for future use.
          </h2>

          <PayoutsTable />
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        content={modalContent}
      />
    </div>
  );

};

export default Payout;