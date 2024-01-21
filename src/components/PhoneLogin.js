import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import appConfig from "../config";
import ProgressBar from "./ProgressBar";
import { trackEventWithUrlParams } from '../utils/amplitudeUtils';

// Helper Functions
const formatToE164 = (phone) => {
  let digits = phone.replace(/\D/g, "");
  return `+1${digits}`;
};

const login = async (formattedPhoneNumber, first_name) => {
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

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">

        <div className="mb-4">
          <label
            htmlFor="verifyPhoneNumber"
            className="block text-sm font-medium text-slate-50"
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
          className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-ebp-cta-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Code
        </button>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Click "Send code" to agree to our
          <a href="#" className="text-green-600 hover:underline">
            {" "}
            Terms
          </a>{" "}
          and receive marketing messages. Rates may apply to messages, which may
          be sent by automated system.
        </p>
      </form>
    </>
  );
};

const VerificationCodeForm = ({
  onSubmit,
  verificationCode,
  setVerificationCode,
  formattedPhoneNumber,
}) => (
  <div className="">

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
        className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-ebp-cta-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Verify Code
      </button>
    </form>
  </div>
);

// Main Component
// In use
const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  })

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    trackEventWithUrlParams("Login with phone initiatied")

    setError(''); // Clear any existing errors
    const formattedPhoneNumber = formatToE164(phoneNumber);
    setFormattedPhoneNumber(formattedPhoneNumber);

    try {
      const response = await axios.post(`${appConfig.SERVER_URL}/api/login`, {
        phone_number: formattedPhoneNumber
      });

      if (response.status === 200) {
        setSmsSent(true);
      } else {
        // Handle non 200 errors
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error.response.data.error || 'An error occurred')
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError('') // Clear errors

    try {
      const response = await verifyCode(verificationCode, formattedPhoneNumber);
      if (response.status === 200) {
        console.log("Code verified successfully");
        setIsVerified(true);
        navigate("/earn");
      } else {
        // Handle non 200 errors
        setError('Wrong code');
      }
    } catch (error) {
      setError(error.response.data.error || 'An error occurred')
    }
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-left">
        Welcome Back
      </h2>


      {!isVerified && // New condition
        (!smsSent ? (
          <PhoneNumberForm
            onSubmit={handlePhoneSubmit}
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
      {error && <div className="text-red-500 text-sm my-2">{error}</div>}
    </div>
  );
};

export default PhoneLogin;