import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';


const AuthForm = ({ isRegistering, onUserChange }) => {
  const [acceptTerms, setAcceptTerms] = useState(false); // Add this state for the checkbox
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAcceptTermsChange = () => {
    setAcceptTerms(!acceptTerms); // Toggle checkbox state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegistering && !acceptTerms) {
      console.error('You must accept the terms.');
      return;
    }
    
    const endpoint = isRegistering ? `${appConfig.SERVER_URL}/api/register` : "/api/login";
    try {
      let response;
      if (isRegistering) {
        response = await axios.post(endpoint, { email, username, password });
      } else {
        response = await axios.post(`${appConfig.SERVER_URL}/api/login`, { email, password });
      }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label htmlFor="formBasicEmail" className="block text-sm font-medium text-gray-400">Email address</label>
        <input 
          type="email" 
          id="formBasicEmail" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
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
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="formBasicPassword" className="block text-sm font-medium text-gray-400">Password</label>
        <input 
          type="password" 
          id="formBasicPassword" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {isRegistering ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Accept Terms of Service</label>
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={handleAcceptTermsChange}
            className="mt-1 form-checkbox h-5 w-5 text-indigo-600"
          />
          <p className="mt-2 text-xs text-gray-500">Please accept our Terms of Service.</p>
        </div>
      ) : (
      <> </>
      )}

      { !isRegistering ||  acceptTerms ? (
        <button 
          type="submit" 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      ) : (
        <button 
          type="button" 
          disabled
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-gray-100 cursor-not-allowed"
        >
          Submit
        </button>
      )}

    </form>

  );
};

export default AuthForm;
