import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import appConfig from "../config";
import ProgressBar from "./ProgressBar";
import { trackEventWithUrlParams } from '../utils/amplitudeUtils';
import ReactPixel from 'react-facebook-pixel'

// Helper Functions
const formatToE164 = (phone) => {
  let digits = phone.replace(/\D/g, "");
  return `+1${digits}`;
};

const sendSMS = async (formattedPhoneNumber, first_name) => {
  trackEventWithUrlParams("Click on sendSMS")

  return axios.post(`${appConfig.SERVER_URL}/api/send_sms/`, {
    phone_number: formattedPhoneNumber,
    first_name: first_name,
  });
};

const verifyCode = async (verificationCode, formattedPhoneNumber) => {
  try {
    const response = await axios.post(
      `${appConfig.SERVER_URL}/api/verify_sms_code/`,
      {
        verification_code: verificationCode,
        phone_number: formattedPhoneNumber,
      }
    );

    // Assuming the token is in the 'token' property of the response data
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    localStorage.setItem("access_token", accessToken); // Store the token in localStorage
    localStorage.setItem("refresh_token", refreshToken); // Store the token in localStorage

    return response; // You may want to return the entire response or just the data you need
  } catch (error) {
    console.error("Error verifying code:", error);
    // Handle any errors, such as by displaying a message to the user
    throw error;
  }
};

// Functional Components
const PhoneNumberForm = ({
  onSubmit,
  phoneNumber,
  setPhoneNumber,
  fullName,
  setFullName,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleMembershipDetailsClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* <h2 className="text-2xl font-bold text-white mt-6 mb-6 text-center">
          Earn up to
          <span className="text-ebp-cta-green"> $300/week </span>& get a
          <span className="text-ebp-cta-green"> $20 </span>
          welcome offer
        </h2> */}
        <button className="w-full bg-ebp-cta-green text-ebp-text-light p-3 rounded-md font-semibold mb-4 hover:bg-ebp-cta-green">
          Get Started
        </button>

        <p className="text-gray-100 mb-4 text-base sm:text-xs md:text-xs">
          Earn rewards by playing games anywhere, anytime. See
          <a
            href="#"
            className="text-ebp-cta-green hover:underline"
            onClick={handleMembershipDetailsClick}
          >
            {" "}
            Membership details
          </a>
          <br />
          Get these exclusive member perks with a 7 day trial for only $1.97 and
          then only $14.99/month†.
        </p>

        <ProgressBar currentStep="1" />
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-slate-50 text-left"
          >
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            name="name"
            autoComplete="name"
            id="fullName"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="verifyPhoneNumber"
            className="block text-sm font-medium text-slate-50 text-left"
          >
            Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="Enter a valid US phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="verifyPhoneNumber"
            name="tel"
            autoComplete="tel"
          />
        </div>
        <button
          type="submit"
          className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-ebp-cta-green hover:bg-ebp-cta-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Code
        </button>
        <p className="text-xs text-gray-500 mt-3 text-left">
          By clicking 'Send code', you agree to our
          <a href="/terms" className="text-ebp-cta-green hover:underline ml-1">
            terms
          </a>
          , confirm that you are 18 years of age or older, and receive marketing
          messages. Rates may apply to messages, which may be sent by automated
          system.
        </p>
      </form>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          {/* Put your modal content here */}
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">
                  Introducing the ultimate earnings membership!
                </span>
                <button onClick={handleCloseModal} className="text-2xl">
                  ×
                </button>
              </div>
              <h2 className="text-2xl font-bold text-ebp-cta-green mb-4">
                WELCOME TO THE EARN BY PLAY CLUB!
              </h2>
              <p className="mb-4">
                Hey there, savvy earner! Earn some money on the side by doing
                tasks like playing games with your Earn by Play membership
              </p>
              <h3 className="font-bold mb-2">About Earn by Play membership</h3>
              <p className="mb-4">
                Welcome to Earn by Play, where you can make money by playing
                games (and many more)! By joining, you're enrolling in a monthly
                subscription that only terminates when you say so. Our Earn by
                Play members benefit from being able to earn money by doing
                different tasks like playing games, downloading apps, etc...
              </p>
              <button
                className="bg-ebp-cta-green text-white py-2 px-4 rounded-2xl hover:bg-ebp-cta-green focus:outline-none w-full"
                onClick={handleCloseModal}
              >
                Join Now
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

const Modal = ({ onClose, children }) => (
  <div className="modal-backdrop">
    <div className="modal-content">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const VerificationCodeForm = ({
  onSubmit,
  verificationCode,
  setVerificationCode,
  formattedPhoneNumber,
}) => (
  <div className="">
    <ProgressBar currentStep="2" />

    <h2 className="text-2xl font-bold text-white mb-6 text-center">
      Verify phone number
    </h2>
    <p className="text-center text-gray-300 mb-6">
      Enter the 6-digit code we texted you to <br /> {formattedPhoneNumber}{" "}
    </p>

    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="verifyCode"
          className="block text-sm font-medium text-slate-50"
        >
          Enter Code
        </label>
        <input
          type="text"
          required
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="verifyCode"
        />
      </div>
      <button
        type="submit"
        className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-ebp-cta-green hover:bg-ebp-cta-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Verify Code
      </button>
    </form>
  </div>
);

// Main Component
const PhoneNumberVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    trackEventWithUrlParams("View Landing page")
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPhoneNumberVar = formatToE164(phoneNumber);
    setFormattedPhoneNumber(formattedPhoneNumberVar);

    try {
      const response = await sendSMS(formattedPhoneNumberVar, fullName);
      if (response.status === 200) {
        setSmsSent(true);

        // Track successful registration  via facebook pixel
        ReactPixel.track('CompleteRegistration')
        ReactPixel.track('StartTrial')
        ReactPixel.trackCustom('smsSent', {});
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyCode(verificationCode, formattedPhoneNumber);
      if (response.status === 200) {
        console.log("Code verified successfully");
        setIsVerified(true);
        navigate("/subscribe");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">
      {" "}
      {/* Responsive Padding */}
      {!isVerified && // New condition
        (!smsSent ? (
          <PhoneNumberForm
            onSubmit={handleSubmit}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            fullName={fullName}
            setFullName={setFullName}
          />
        ) : (
          <VerificationCodeForm
            onSubmit={handleCodeSubmit}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            formattedPhoneNumber={formattedPhoneNumber}
          />
        ))}
      {isVerified && <div>Successfully Verified</div>}
    </div>
  );
};

export default PhoneNumberVerification;
