import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import SignupForm from './SignupForm'
import PhoneNumberVerification from './PhoneNumberVerification'


const Home= () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center min-h-screen h-auto mt-0">



      <div className="p-5 mb-4 bg-ebp-header">
        <h2 className="text-2.5xl font-bold mb-4 text-center">
          <div className="text-white">Turn Gameplay into Paydays!</div>
        </h2>

        <h2 className="text-xl font-bold text-center text-white">
          1. Choose a game
        </h2>

        <div className="text-gray-500 mb-2">
          Pick a game from our selection
        </div>

        <h2 className="text-xl font-bold text-center text-white">
          2. Complete a level
        </h2>
        <div className="text-gray-500 mb-2">Finish simple in-game tasks.</div>

        <h2 className="text-xl font-bold text-center text-white">
          3. Earn cash
        </h2>
        <div className="text-gray-500">
          Earn coins for tasks, redeem for rewards.
        </div>
      </div>

      <div className="bg-ebp-header p-5">
        <PhoneNumberVerification />
      </div>

    </div>
    
    );
  };
  
  export default Home;
  