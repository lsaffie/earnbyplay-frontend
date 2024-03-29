import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Modal from './Modal';
import axios from 'axios';
import appConfig from "./../config";
import { useUser } from '../UserContext'; // Import useUser hook

const PayPalWithdrawalForm = ({ submitWithdrawal }) => {
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [wallet, setWallet] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { currentUser } = useUser(); // Use useUser hook to get currentUser

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // const floorBalance = Math.floor(wallet.balance); // Get the floor value of wallet.balance
  const floorBalance = wallet.balance; // Get the floor value of wallet.balance

  const getJwtToken = () => {
    return localStorage.getItem("access_token");
  };

  useEffect(() => {
    axios
      .get(`${appConfig.SERVER_URL}/api/wallet/`, {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
      })
      .then((response) => setWallet(response.data))
      .catch((error) => console.error("Error fetching wallet data:", error));
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const response = await axios.post(
          `${appConfig.SERVER_URL}/api/paypal-cashout/`,
          {
            email: email,
            withdrawal_requested_amount: floorBalance,
            method: "paypal",
          }, // This is the data payload
          {
            headers: {
              Authorization: `Bearer ${getJwtToken()}`, // This is part of the config object
            },
          }
        );

        if (response.status === 200) {
          setModalContent("Withdrawal request submitted successfully!");
        } else {
          setModalContent(
            "There was an issue with your request. Please try again later."
          );
        }
      } catch (error) {
        setModalContent(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      }
    } else {
      setModalContent("Please enter a valid PayPal email address.");
    }
    setModalOpen(true);
  };

  return (
    <>
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
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-200 mb-3">
              PayPal Cashout Request
            </h2>
            <p className="text-m text-gray-200">
              Use this form to transfer your earned funds to your PayPal
              account.
            </p>
            <p className="text-m text-gray-200 mt-3">
              Be sure to use your paypal email to widthdraw the funds
            </p>
          </div>
          <div className="bg-ebp-header text-white p-4 rounded-lg shadow-lg max-w-md mx-auto my-8">
            <div className="bg-ebp-green p-2 rounded text-center mb-6">
              <h3 className="text-xl font-medium">Transfer Amount</h3>
              <p className="text-3xl font-bold">${floorBalance}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label
                htmlFor="paypalEmail"
                className="text-md font-semibold sr-only"
              >
                PayPal Email Address
              </label>
              <input
                type="email"
                id="paypalEmail"
                required
                className="p-2 border border-gray-300 rounded-md text-black"
                placeholder="Enter your PayPal email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#0070BA] hover:bg-[#005EA6] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center space-x-2"
              >
                <span>Transfer with Paypal</span>
              </button>
            </form>
          </div>
          <Modal
            isOpen={isModalOpen}
            setIsOpen={setModalOpen}
            content={modalContent}
          />
        </>
      )}
    </>
  );
};

export default PayPalWithdrawalForm;