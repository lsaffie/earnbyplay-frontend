import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import OfferWallIframe from './components/OfferWallIframe';
import PhoneNumberVerification from './components/PhoneNumberVerification';
import WalletView from './components/WalletView'
import BraintreeDropin from './components/BraintreeDropin'
import UserDetails from './components/UserDetail'
import { useNavigate } from 'react-router-dom';


import { useParams } from 'react-router-dom';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
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
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={
              <OfferWallIframe currentUser={currentUser}/>
            } />
            <Route path="/login" element={
              <div className="center">
                <AuthForm isRegistering={false} onUserChange={handleUserChange} />
              </div>
            } />
            <Route path="/signup" element={
              <div className="center">
                <AuthForm isRegistering={true} onUserChange={handleUserChange} />
              </div>
            } />
           <Route path="/phone-verify" element={
               <div className="center">
                 <PhoneNumberVerification />
               </div>
           } />
           <Route path="/subscribe" element={
             <div className="center">
               <BraintreeDropin />
             </div>
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
             <div className="center">
               <UserDetails userId={currentUser}/>
             </div>
           } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;