import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import SignupForm from './SignupForm'


const Home= ({ onUserChange }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center m-5 min-h-screen h-auto">

      <h2 className="text-2xl font-bold mb-6 text-center">
        <span className="text-ebp-cta-green-earn-font">Earn</span>
        <span className="text-white"> cash by playing games </span>
      </h2>


      <div className="bg-ebp-header p-5 mb-5">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span className="text-white">How it works?</span>
        </h2>

        <h2 className="text-xl font-bold text-center text-white">
          1. Choose a game
        </h2>

        <div className="text-gray-500 mb-5">
          Pick a game from our selection
        </div>

        <h2 className="text-xl font-bold text-center text-white">
          2. Complete the game
        </h2>
        <div className="text-gray-500 mb-5">
          Finish simple in-game tasks.
        </div>

        <h2 className="text-xl font-bold text-center text-white">
          3. Earn cash
        </h2>
        <div className="text-gray-500 mb-5">
          Earn coins for tasks, redeem for rewards.
        </div>
      </div>

      <div className="bg-ebp-header p-5">
        <SignupForm />
      </div>

    </div>
    
    );
  };
  
  export default Home;
  