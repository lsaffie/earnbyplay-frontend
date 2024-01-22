import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import appConfig from "../config";
import ProgressBar from "./ProgressBar";
import { trackEventWithUrlParams } from '../utils/amplitudeUtils';

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

export default VerificationCodeForm