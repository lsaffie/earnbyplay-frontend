import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';

const SignupForm = ({ onUserChange }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const endpoint = `${appConfig.SERVER_URL}/api/register`;
    try {
      let response;
      response = await axios.post(endpoint, { email, username, password });

      // set token 
      if (response.data.access && response.data.refresh) {
        localStorage.setItem('access_token', response.data.access); // Store the token in localStorage
        localStorage.setItem('refresh_token', response.data.refresh); // Store the token in localStorage
      }

      onUserChange(response.data);
      navigate('/offerwall');
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const checkFormValidity = () => {
    // Add your validation logic here (e.g., checking if fields are not empty)
    const isValid = username.trim() !== '' && email.trim() !== '' && password.trim() !== '';
    setIsFormValid(isValid);
  };

  return (
    <div>

    <h2 className="text-2xl font-bold text-white mb-6 text-left">
      Create your Account
    </h2>

    <h2 className="text-base text-white mb-6 text-left">
      Join Earn By Play for Free
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="formBasicEmail" className="block text-sm font-medium text-gray-400">Email address</label>
        <input 
          type="email" 
          id="formBasicEmail" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          onBlur={checkFormValidity}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <p className="mt-2 text-xs text-gray-500">We'll never share your email with anyone else.</p>
      </div>
      <div className="mb-4">
        <label htmlFor="formBasicUsername" className="block text-sm font-medium text-gray-400">Username</label>
        <input 
          type="text" 
          id="formBasicUsername" 
          placeholder="Enter username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          onBlur={checkFormValidity}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="formBasicPassword" className="block text-sm font-medium text-gray-400">Password</label>
        <input 
          type="password" 
          id="formBasicPassword" 
          placeholder="Password" 
          onBlur={checkFormValidity}
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-4 text-xs text-gray-500 mt-3 text-center">
        By signing up, you agree with Earn By Play's
        <a href="#" className="text-blue-600 hover:underline"> Terms of service</a>.
      </div>


      { isFormValid ? (
        <button 
          type="submit" 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      ) : (
        <button 
          type="submit" 
          disabled
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg--700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>

      )}

    </form>

      <div className="mb-4 text-sm text-white mt-3 text-center">
        Aready have an account?
        <a href="/login" className="text-blue-600 hover:underline"> Login</a>.
      </div>

    </div>

  );
};

export default SignupForm;