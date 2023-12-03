import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import appConfig from '../config';

// Helper Functions
const formatToE164 = (phone) => {
  let digits = phone.replace(/\D/g, "");
  return `+1${digits}`;
};

const sendSMS = async (formattedPhoneNumber, first_name) => {
  return axios.post(`${appConfig.SERVER_URL}`, {
    phone_number: formattedPhoneNumber,
    first_name: first_name,
  });
};


const verifyCode = async (verificationCode, formattedPhoneNumber) => {
  try {
    const response = await axios.post(`${appConfig.SERVER_URL}/api/verify_sms_code/`, { 
      verification_code: verificationCode,
      phone_number: formattedPhoneNumber,
    });

    // Assuming the token is in the 'token' property of the response data
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    localStorage.setItem('access_token', accessToken); // Store the token in localStorage
    localStorage.setItem('refresh_token', refreshToken); // Store the token in localStorage

    return response; // You may want to return the entire response or just the data you need
  } catch (error) {
    console.error('Error verifying code:', error);
    // Handle any errors, such as by displaying a message to the user
    throw error;
  }
};


// Functional Components
const PhoneNumberForm = ({ onSubmit, phoneNumber, setPhoneNumber, firstName, setFirstName }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Earn up to $300/week & get a $20 welcome offer
      </h2>
      <button className="w-full bg-ebp-cta-green text-ebp-text-light p-3 rounded-md font-semibold mb-4 hover:bg-green-600">
        Get Started
      </button>

      <p className="text-gray-100 mb-4">
        Earn by playing games anywhere, anytime. Plus up to 10% cashback at 1,000s of stores.
        <a href="#" className="text-green-600 hover:underline"> Membership details</a>
      </p>

      <div className="flex items-center space-x-2 mb-5">
        <div className="flex-1 h-1 bg-green-600 rounded text-white text-sm whitespace-nowrap">Get code</div>
        <div className="text-indigo-600">1</div>
        <div className="flex-1 h-1 bg-gray-300 rounded text-white text-sm whitespace-nowrap">Verify</div>
        <div className="text-indigo-600">2</div>
        <div className="flex-1 h-1 bg-gray-300 rounded text-white text-sm whitespace-nowrap">Address</div>
        <div className="text-gray-300">3</div>
        <div className="flex-1 h-1 bg-gray-300 rounded text-white text-sm whitespace-nowrap">Claim</div>
      </div>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-slate-50">
          First Name
        </label>
        <input 
          type="text" 
          required 
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="firstName"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="verifyPhoneNumber" className="block text-sm font-medium text-slate-50">
          Phone Number
        </label>
        <input 
          type="tel" 
          required 
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="verifyPhoneNumber"
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
        <a href="#" className="text-green-600 hover:underline">Terms</a> and receiving marketing messages. Rates may apply to messages, which may be sent by automated system. Purchasing doesn’t require consent.
      </p>
    </form>
);


const VerificationCodeForm = ({ onSubmit, verificationCode, setVerificationCode, formattedPhoneNumber }) => (
  <>

      <div className="flex items-center space-x-2 mb-5">
        <div className="flex-1 h-1 bg-green-600 rounded text-white text-sm whitespace-nowrap">Get code</div>
        <div className="text-indigo-600">1</div>
        <div className="flex-1 h-1 bg-green-600 rounded text-white text-sm whitespace-nowrap">Verify</div>
        <div className="text-indigo-600">2</div>
        <div className="flex-1 h-1 bg-gray-300 rounded text-white text-sm whitespace-nowrap">Address</div>
        <div className="text-gray-300">3</div>
        <div className="flex-1 h-1 bg-gray-300 rounded text-white text-sm whitespace-nowrap">Claim</div>
      </div>

  <h2 className="text-2xl font-bold text-white mb-6 text-center">Verify phone number</h2>
  <p className="text-center text-gray-300 mb-6">Enter the 6-digit code we texted you to <br/> {formattedPhoneNumber} </p>

  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label htmlFor="verifyCode" className="block text-sm font-medium text-slate-50">
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
  </>
);

// Main Component
const PhoneNumberVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPhoneNumberVar = formatToE164(phoneNumber);
    setFormattedPhoneNumber(formattedPhoneNumberVar)

    try {
      const response = await sendSMS(formattedPhoneNumberVar, firstName);
      if (response.status === 200) setSmsSent(true);
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
        navigate('/subscribe')
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <div>
      {!isVerified && (  // New condition
      !smsSent 
        ? <PhoneNumberForm
            onSubmit={handleSubmit}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            firstName={firstName}
            setFirstName={setFirstName}
          />
        : <VerificationCodeForm
            onSubmit={handleCodeSubmit}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            formattedPhoneNumber={formattedPhoneNumber}
          />
      )}
      {isVerified && <div>Successfully Verified</div>} 
    </div>
  );
};

export default PhoneNumberVerification;