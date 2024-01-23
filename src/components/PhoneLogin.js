import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import appConfig from "../config";
import ProgressBar from "./ProgressBar";
import { trackEventWithUrlParams } from '../utils/amplitudeUtils';
import PhoneNumberForm from './PhoneNumberForm'
import VerificationCodeForm from './VerificationCodeForm'

  const formatToE164 = (phone) => {
    let digits = phone.replace(/\D/g, "");

    if (digits.startsWith('1') && digits.length === 11) {
      return { formatted: `+${digits}`, error: null };
    }

    if (digits.length !== 10) {
      return { formatted: '', error: "Invalid US phone number format." };
    }

    return { formatted: `+1${digits}`, error: null };
  };

const login = async (formattedPhoneNumber, first_name) => {
  trackEventWithUrlParams("Click on sendSMS")

  return axios.post(`${appConfig.SERVER_URL}/api/send_sms/`, {
    phone_number: formattedPhoneNumber,
    first_name: first_name,
  });
};

// Main Component
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
    const { formatted, error } = formatToE164(phoneNumber);

    try {
      const response = await axios.post(`${appConfig.SERVER_URL}/api/login`, {
        phone_number: formatted 
      });

      if (response.status === 200) {
        setSmsSent(true);
        setFormattedPhoneNumber(formatted); // Update this state
      } else {
        // Handle non 200 errors
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error.response.data.error || 'An error occurred')
    }
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">

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
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            formattedPhoneNumber={formattedPhoneNumber}
            setError={setError}
          />
        ))}
      {isVerified && <div>Successfully Verified</div>}
      {error && <div className="text-red-500 text-sm my-2">{error}</div>}
    </div>
  );
};

export default PhoneLogin;