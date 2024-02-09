import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import appConfig from "../config";
import ProgressBar from "./ProgressBar";
import { trackEventWithUrlParams } from '../utils/amplitudeUtils';
import PhoneNumberForm from './PhoneNumberForm'
import VerificationCodeForm from './VerificationCodeForm'
import ToggleSwitch from './ToggleSwitch'

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

// Main Component
const PhoneLogin = ({mode, setMode}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const [mode, setMode] = useState("signIn"); // signIn or signUp
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleModeToggle = () => {
    setMode(mode === "signIn" ? "signUp" : "signIn");
    // Reset relevant states if needed
    setAcceptTerms(false);
  };

  const handleTermsChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    trackEventWithUrlParams("Login with phone initiatied")

    // terms acceptance check
    if (mode === "signUp" && !acceptTerms) {
      setError("You must accept the terms and conditions to sign up.");
      return;
    }

    setError(''); // Clear any existing errors
    const { formatted, error: formatError } = formatToE164(phoneNumber);
    if (formatError) {
      setError(formatError);
      return;
    }
    try {

      const url = mode === "signUp" ? `${appConfig.SERVER_URL}/api/register` : `${appConfig.SERVER_URL}/api/login`;
      console.log("the urls is ")
      console.log(url)
      const response = await axios.post(url, {
        phone_number: formatted
      });
      // const url = mode === "Signup" ? "/api/subscribe" : 'api/login'
      // const response = await axios.post(`${appConfig.SERVER_URL}/api/login`, {
      //   phone_number: formatted 
      // });

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
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 text-white">

      {!isVerified && // New condition
        (!smsSent ? (
          <>
            {/* <ToggleSwitch mode={mode} setMode={setMode}/> */}
            <PhoneNumberForm
              onSubmit={handleSubmit}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              fullName={fullName}
              setFullName={setFullName}
              mode={mode}
              acceptTerms={acceptTerms}
              setAcceptTerms={setAcceptTerms}
            />
          </>
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