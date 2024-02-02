import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import appConfig from "./../config";

const PayPalWithdrawalForm = ({ submitWithdrawal }) => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const response = await axios.post(`${appConfig.SERVER_URL}/api/paypal-cashout`, {
            email: email,
        });
        if (response.status === 200) {
          setModalContent("Withdrawal request submitted successfully!");
        } else {
          setModalContent(
            "There was an issue with your request. Please try again later."
          );
        }
      } catch (error) {
        setModalContent(error.response?.data?.message || 'An error occurred. Please try again.');
      }
    } else {
      setModalContent("Please enter a valid PayPal email address.");
    }
    setModalOpen(true);
  };

  return (
    <>
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-gray-200 mb-3">PayPal Cashout Request</h2>
        <p className="text-m text-gray-200">
          Use this form to transfer your earned funds to your PayPal account.
        </p>
      </div>
      <div className="bg-ebp-header text-white p-4 rounded-lg shadow-lg max-w-md mx-auto my-8">

        <div className="bg-ebp-green p-2 rounded text-center mb-6">
          <h3 className="text-xl font-medium">Transfer Amount</h3>
          <p className="text-3xl font-bold">$28.67</p>
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
            className="p-2 bg-ebp-cta-green rounded-md hover:bg-ebp-cta-hover focus:outline-none focus:ring focus:ring-ebp-focus transition ease-in duration-200 text-md font-semibold shadow-md"
          >
            Submit Withdrawal
          </button>
        </form>
        <h2 className="text-sm text-left text-gray-400 mt-5">
          * Please note that redemptions from your wallet can only be made in whole dollar amounts. Any remaining cents will stay in your wallet for future use.
        </h2>
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen} content={modalContent} />
    </>
  );
};

export default PayPalWithdrawalForm;