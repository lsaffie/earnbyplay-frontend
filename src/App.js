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

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import Home from "./components/Home";
import Footer from "./components/Footer";

import Rewards from "./components/Rewards";
import Payout from "./components/Payout";

import UserSubscription from "./components/UserSubscription";
import PhoneLogin from "./components/PhoneLogin";

import * as amplitude from '@amplitude/analytics-browser';

import appConfig from "./config";

import { UserProvider } from './UserContext';


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: `${appConfig.SERVER_URL}`,
});

function App() {
  // const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);

  // const handleUserChange = (userData) => {
  //   setCurrentUser(userData);
  // };

  const getJwtToken = () => {
    return localStorage.getItem("access_token"); // Or however you've named the token in storage
  };

  useEffect(() => {
    // Initialize Amplitude instance
    amplitude.init(process.env.REACT_APP_AMPLITUDE_API_KEY);

    // client
    //   .get("/api/user", {
    //     headers: {
    //       Authorization: `Bearer ${getJwtToken()}`,
    //     },
    //   })
    //   .then((res) => {
    //     setCurrentUser(res.data.user);
    //   })
    //   .catch((error) => setCurrentUser(null));

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
          <div className="flex-grow justify-center container w-full pb-16 md:pb-16 mt-8 px-2 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/login" element={
                  <div className="center">
                    <PhoneLogin />
                  </div>
              } />
              <Route path="/signup"            element={<PhoneNumberVerification /> } />
              <Route path="/phone-verify"      element={<PhoneNumberVerification />} />

              <Route path="/phone-login"       element={<PhoneLogin /> } />
              <Route path="/subscribe"         element={<BraintreeDropin />} />

              <Route path="/offerwall"         element={<OfferWallIframe />} />
              <Route path="/earn"              element={<OfferWallIframe />} />

              <Route path="/wallet"            element={<WalletView /> } />
              <Route path="/user"              element={<UserDetails /> } />
              <Route path="/rewards"           element={<Rewards /> } />
              <Route path="/payout"            element={<Payout /> } />
              <Route path="/ledger-entries"    element={<LedgerEntries /> } />
              <Route path="/user-subscription" element={<UserSubscription /> } />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;