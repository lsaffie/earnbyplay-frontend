import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import OfferWallIframe from "./components/OfferWallIframe";
import PhoneNumberVerification from "./components/PhoneNumberVerification";
import WalletView from "./components/WalletView";
import BraintreeDropin from "./components/BraintreeDropin";
import UserDetails from "./components/UserDetail";
import LedgerEntries from "./components/LedgerEntries";
import TermsAndConditions from "./components/TermsAndConditions";
import Privacy from "./components/Privacy";
import ReactPixel from 'react-facebook-pixel'

// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";

import Home from "./components/Home";
import Footer from "./components/Footer";

import Rewards from "./components/Rewards";
import Payout from "./components/Payout";
import PayoutsTable from "./components/PayoutsTable";
import PayPalWithdrawalForm from "./components/PayPalWithdrawalForm";

import UserSubscription from "./components/UserSubscription";
import PhoneLogin from "./components/PhoneLogin";

import * as amplitude from '@amplitude/analytics-browser';

import appConfig from "./config";

import { UserProvider } from './UserContext';


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

function App() {
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [mode, setMode] = useState("signIn"); // signIn or signUp



  useEffect(() => {
    // Initialize Amplitude instance
    amplitude.init(process.env.REACT_APP_AMPLITUDE_API_KEY);

    // Facebook pixel
    ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID);
    ReactPixel.pageView(); 
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-ebp-bg-dark pb-16 md:pb-16">
          {/* Responsive Navbar */}
          {/* <Navbar currentUser={currentUser} /> */}
          <Navbar />

          {/* Content */}
          <div className="flex-grow justify-center container w-full md:pb-8 mt-4 px-2 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/login" element={
                  <div className="center">
                    <PhoneLogin mode="signIn" />
                  </div>
              } />
              <Route path="/signup" element={
                <div className="center">
                  <PhoneLogin mode="signUp" />
                </div>
              } />
              <Route path="/phone-verify"      element={<PhoneNumberVerification />} />

              <Route path="/phone-login"       element={<PhoneLogin /> } />
              <Route path="/subscribe"         element={<BraintreeDropin />} />

              <Route path="/offerwall"         element={<OfferWallIframe />} />
              <Route path="/earn"              element={<OfferWallIframe />} />

              <Route path="/wallet"            element={<WalletView /> } />
              <Route path="/user"              element={<UserDetails /> } />
              <Route path="/rewards"           element={<Rewards /> } />
              <Route path="/payout"            element={<Payout /> } />
              <Route path="/user-payouts"      element={<PayoutsTable/> } />
              <Route path="/ledger-entries"    element={<LedgerEntries /> } />
              <Route path="/user-subscription" element={<UserSubscription /> } />
              <Route path="/paypal-withdrawal" element={<PayPalWithdrawalForm/> } />
              <Route path="/terms" element={<TermsAndConditions /> } />
              <Route path="/privacy" element={<Privacy /> } />
              <Route path="/privacy-policy" element={<Privacy /> } />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;