import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import appConfig from '../config';

import { ReactComponent as MoreIcon} from '../assets/icons/more.svg';
import { ReactComponent as HomeIcon} from '../assets/icons/home.svg';
import { ReactComponent as AtmCashout} from '../assets/icons/atm-cashout.svg';

const Navbar = ({ currentUser }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
          <div className="flex justify-between items-center">
              <a href="#" className="flex items-center py-4 px-2">
                <span className="font-semibold text-slate-50 text-lg"></span>
              </a>
            <div className="flex space-x-6 justify-center">
                {/* Website Logo */}
                <a href="/" className="flex items-center py-4 px-2">
                  <img src={`${process.env.PUBLIC_URL}/${logo_filename}`} alt="Logo" className="h-8 w-auto" />
                </a>
              {/* Primary Navbar items */}
              <div className="md:flex items-center space-x-1">
                <a href="/phone-verify" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">login via phone</a>
                <a href="/wallet" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">Wallet</a>
                <a href="/subscribe" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">Subscribe</a>
                <a href="/user" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">User Details</a>
                <a href="/offerwall" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">Offerwall</a>
                <a href="/payout" className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex">Payout</a>
                {/* Signin/signup/logout buttons - Conditional rendering based on currentUser */}
                {currentUser ? (
                  <div className="py-4 px-2 text-slate-50 font-semibold">
                    <button onClick={handleLogout} className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 md:flex">
                      Logout {currentUser.email}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 py-4 px-2">
                    <a href="/login" className="py-2 px-4 bg-ebp-cta-green text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 whitespace-nowrap">
                      Sign In
                    </a>
                    <a href="/signup" className="py-2 px-4 text-green-700 font-semibold rounded-lg border border-green-700 hover:bg-green-600 hover:text-white transition duration-300 whitespace-nowrap">
                      Sign Up
                    </a>
                  </div>
                )}
                {/* End new code */}

              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar for mobile screens */}
      <nav className="fixed inset-x-0 bottom-0 bg-ebp-header shadow-lg md:hidden">
        <div className="flex justify-between">

          <button onClick={toggleDrawer} className="md:hidden">
            {/* SVG for Menu icon */}
            <Link to="/" className="flex-1 text-center py-2">
              <MoreIcon className="w-16 h-6 mx-auto" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" />
              <span className="block text-xs text-gray-300">More</span>
            </Link>
          </button>

          {/* Sidebar Drawer */}
          <div className={`fixed inset-y-0 left-0 transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} w-64 bg-ebp-header text-white transition-transform duration-300 ease-in-out z-50`}>
            {/* Drawer content */}
            <div className="p-4 flex flex-col h-full justify-between">
              {/* Top links */}
              <div>
                <a href="/profile" className="block py-2">Profile</a>
                <a href="/settings" className="block py-2">Settings</a>
                {/* Add other links */}
              </div>

              {/* Logout link at the bottom */}
              <div className="pt-4">
                {currentUser ? (
                  <button onClick={handleLogout} className="w-full text-left py-2">
                    Logout
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <a href="/login" className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-ebp-cta-green transition duration-300 whitespace-nowrap">
                      Sign In
                    </a>
                    <a href="/signup" className="py-2 px-4 text-green-600 font-semibold rounded-lg border border-green-600 hover:bg-green-600 hover:text-white transition duration-300 whitespace-nowrap">
                      Sign Up
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <Backdrop show={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />

          <Link to="/" className="flex-1 text-center py-2">
            <HomeIcon className="w-6 h-6 mx-auto" fill="#FFF" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" />
            <span className="block text-xs text-gray-300">Home</span>
          </Link>

          <Link to="/offerwall" className="flex-1 text-center py-2">
            <AtmCashout className="w-6 h-6 mx-auto" fill="#FFF" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" />
            <span className="block text-xs text-gray-300">Earn</span>
          </Link>

          <Link to="/offerwall" className="flex-1 text-center py-2 green">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1v22"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 5H9.5a3.5 3.5 0 100 7H17m-5 6H6.5a3.5 3.5 0 110-7H12"></path>
            </svg>
            <span className="block text-xs text-gray-300">Offerwall</span>
          </Link>

          <Link to="/subscribe" className="flex-1 text-center py-2">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18"></path></svg>
            <span className="block text-xs text-gray-300">Subscribe</span>
          </Link>
          <Link to="/user" className="flex-1 text-center py-2">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c3.866 0 7-3.582 7-8S15.866 0 12 0 5 3.582 5 8s3.134 8 7 8z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 22c0-3-5.072-5-7.5-5s-7.5 2-7.5 5"></path></svg>
            <span className="block text-xs text-gray-300">User</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;