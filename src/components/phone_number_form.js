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
          className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-ebp-cta-green hover:bg-ebp-cta-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Code
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          By clicking 'Send code', you agree to our
          <a href="#" className="text-ebp-cta-green hover:underline">
            {" "}
            Terms
          </a>{" "}
          , confirm that you are 18 years of age or older, and receive marketing messages. Rates may apply to messages, which may
          be sent by automated system.
        </p>
      </form>
    </>
  );
};

export default PhoneNumberForm;