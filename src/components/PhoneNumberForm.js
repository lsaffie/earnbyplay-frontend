import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import appConfig from "../config";
import ProgressBar from "./ProgressBar";
import { trackEventWithUrlParams } from '../utils/amplitudeUtils';



const PhoneNumberForm = ({
  onSubmit,
  phoneNumber,
  setPhoneNumber,
  fullName,
  setFullName,
  mode,
  acceptTerms,
  setAcceptTerms
}) => {

  // const [mode, setMode] = useState("signIn"); // signIn or signUp
  // const [acceptTerms, setAcceptTerms] = useState(false);

  const handleTermsChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

  return (
    <>
      {mode === "signIn" ? (
        <h2 className="text-2.5xl font-bold mb-4 text-left">
          Welcome back!
        </h2>
      ):(
        <h2 className="text-2.5xl font-bold mb-4 text-left">
          Welcome to Earn by Play.
          <br />
          Sign up below!
        </h2>
      )}
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
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        {mode === "signIn" && (
          <p className="text-xs text-gray-500 mt-3 text-center w-80">
            Click "Send code" to agree to our
            <a href="#" className="text-ebp-cta-green hover:underline">
              {" "}
              Terms
            </a>{" "}
            and receive marketing messages. Rates may apply to messages, which may
            be sent by automated system.
          </p>
        )}
      </form>
      {mode === "signUp" && (
        <div className="text-xs text-gray-500 mt-3 text-center w-80">
          <label htmlFor="acceptTerms" className="flex items-center">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={handleTermsChange}
              className="mr-2"
            />
            I accept the <a href="/terms" className="text-ebp-cta-green underline">Terms and Conditions</a>
          </label>
        </div>
      )}
    </>
  );
};

export default PhoneNumberForm;