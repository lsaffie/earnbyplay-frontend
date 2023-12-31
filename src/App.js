import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import OfferWallIframe from './components/OfferWallIframe';
import PhoneNumberVerification from './components/PhoneNumberVerification';
import WalletView from './components/WalletView'
import BraintreeDropin from './components/BraintreeDropin'
import UserDetails from './components/UserDetail'
import LedgerEntries from './components/LedgerEntries'

import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

import Home from './components/Home'

import Rewards from './components/Rewards'
import UserSubscription from './components/UserSubscription'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import appConfig from './config';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: `${appConfig.SERVER_URL}`
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);


  const getJwtToken = () => {
    return localStorage.getItem('access_token'); // Or however you've named the token in storage
  };

  useEffect(() => {
    client.get("/api/user", {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
    })
    .then(res => {
      setCurrentUser(res.data.user)
    })
    .catch(error => setCurrentUser(null));
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

  function handleUserChange(user) {
    setCurrentUser(user);
  }

  return (
    <Router>
      <div className="min-h-screen bg-ebp-background-dark">
        {/* Responsive Navbar */}
        <Navbar currentUser={currentUser} />

        {/* Content */}
        <div className="container w-full">
          <Routes>
            <Route path="/" element={
              <Home currentUser={currentUser}/>
            } />
            <Route path="/login" element={
              <div className="center">
                <LoginForm onUserChange={handleUserChange} />
              </div>
            } />
            <Route path="/signup" element={
              <div className="center">
                <SignupForm onUserChange={handleUserChange} />
              </div>
            } />
           <Route path="/phone-verify" element={
              <PhoneNumberVerification />
           } />
           <Route path="/subscribe" element={
              <BraintreeDropin />
           } />
           <Route path="/offerwall" element={
             <OfferWallIframe currentUser={currentUser}/>
           } />
           <Route path="/wallet" element={
             <div className="center">
               <WalletView />
             </div>
           } />
           <Route path="/user" element={
              <UserDetails userId={currentUser}/>
           } />
           <Route path="/rewards" element={
             <div className="center">
               <Rewards userId={currentUser}/>
             </div>
           } />
           <Route path="/ledger-entries" element={
             <div className="center">
               <LedgerEntries userId={currentUser}/>
             </div>
           } />
           <Route path="/user-subscription" element={
             <div className="center">
               <UserSubscription userId={currentUser}/>
             </div>
           } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;