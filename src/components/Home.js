import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import SignupForm from './SignupForm'
import PhoneNumberVerificationHome from './PhoneNumberVerificationHome'


const Home= () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center min-h-screen h-auto">

      <h2 className="text-2.5xl font-bold mb-6 text-center">
        <span className="text-ebp-cta-green-earn-font">Earn by Play </span> 
        <div className="text-white">Turn Gameplay into Paydays!</div>
      </h2>

      <div className="bg-ebp-header p-5">
        <PhoneNumberVerificationHome />
      </div>

    </div>
    
    );
  };
  
  export default Home;
  