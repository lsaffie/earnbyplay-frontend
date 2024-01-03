import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import appConfig from '../config';
import { useLocation } from 'react-router-dom';

import { ReactComponent as HomeIcon} from '../assets/icons/home.svg';
import { ReactComponent as AtmCashout} from '../assets/icons/atm-cashout.svg';
import WalletBalance from './WalletBalance'

const Navbar = ({ currentUser }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const location = useLocation();
  const shouldExcludeAuthButtons = !['/phone-verify', '/subscribe'].includes(location.pathname);

  const logo_filename = "logo-dark-bkg.svg";

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const Backdrop = ({ show, onClick }) => {
  return show ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClick}></div>
  ) : null;
  };



  const handleLogout = async () => {
    try {
      await axios.post(`${appConfig.SERVER_URL}/api/logout`, {
        refresh_token: localStorage.getItem('refresh_token')
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(function(response) {
        localStorage.removeItem('access_token'); // Remove the token
        localStorage.removeItem('refresh_token'); // Remove the refresh token
      });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <nav className="bg-ebp-header shadow-lg">
        <div className="max-w-6xl mx-auto px-0">
          <div className="flex justify-start items-center">
              <a href="#" className="flex items-center py-4 px-2">
                <span className="font-semibold text-slate-50 text-lg"></span>
              </a>
            <div className="flex space-x-4 justify-between">
                {/* Website Logo */}
                <a href="/" className="flex items-center">
                  <img src={`${process.env.PUBLIC_URL}/${logo_filename}`} alt="Logo" className="h-12 sm:h-10 md:h-10 w-auto" />
                </a>
              {/* Primary Navbar items */}
              <div className="md:flex items-center space-x-1">
                <a href="/wallet" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">Wallet</a>
                <a href="/subscribe" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">Subscribe</a>
                <a href="/offerwall" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">Offerwall</a>
                <a href="/payout" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">Payout</a>
                {/* Signin/signup/logout buttons - Conditional rendering based on currentUser */}
              </div>
                {currentUser ? (
                  <div className="md:flex md:justify-start gap-2 py-4 px-2">
                    <WalletBalance wallet={currentUser} />
                  </div>
                ) : (shouldExcludeAuthButtons && (
                    <div className="flex gap-2 py-4 px-2">
                      <a href="/login" className="py-2 px-4 bg-ebp-cta-green text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 whitespace-nowrap">
                        Sign In
                      </a>
                      <a href="/signup" className="py-2 px-4 text-green-700 font-semibold rounded-lg border border-green-700 hover:bg-green-600 hover:text-white transition duration-300 whitespace-nowrap">
                        Sign Up
                      </a>
                    </div>
                  ))
                }
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar for mobile screens */}
      <nav className="fixed inset-x-0 bottom-0 bg-ebp-header shadow-lg md:hidden">
        <div className="flex justify-between">

          <button onClick={toggleDrawer} className="md:hidden">
            {/* SVG for Menu icon */}
            <div className="flex-1 text-center py-4">
              <svg width="46" height="18" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="line-1" d="M0.75 0.75H15.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path class="line-2" d="M0.75 13.25H15.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path class="line-3" d="M1 7H9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span className="block text-xs text-gray-300">More</span>
            </div>
          </button>

          {/* Sidebar Drawer */}
          <div className={`fixed inset-y-0 left-0 mb-16 transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} w-60 bg-ebp-header text-white transition-transform duration-300 ease-in-out z-50`}>
            {/* Drawer content */}
            <div className="p-4 flex flex-col h-full justify-between">
              {/* Top links */}
              <div>
                <a href="/" className="block py-2">Home</a>
                <a href="/user" className="block py-2">Profile</a>
                <a href="/user-subscription" className="block py-2">Manage Subscription</a>
                <a href="/support" className="block py-2">Support</a>
                <a href="/tos" className="block py-2">Terms of Service</a>
                <a href="/tos" className="block py-2">Privacy Policy</a>
                {/* Add other links */}
              </div>

            </div>
          </div>

          {/* Backdrop */}
          <Backdrop show={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />

          <Link to="/payout" className="flex-1 text-center py-2">
            <AtmCashout className="w-6 h-6 mx-auto" fill="#FFF" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" />
            <span className="block text-xs text-gray-300">Cashout</span>
          </Link>

          <Link to="/offerwall" className="flex-1 text-center py-2 bg-ebp-cta-green">
            <AtmCashout className="w-6 h-6 mx-auto" fill="white" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" />
            <span className="block text-xs text-gray-300">Earn</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;