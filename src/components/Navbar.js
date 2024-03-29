import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import appConfig from "../config";
import { useLocation } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as AtmCashout } from "../assets/icons/atm-cashout.svg";
import { ReactComponent as Earn } from "../assets/icons/earn.svg";
import WalletBalance from "./WalletBalance";

import { useUser } from '../UserContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('');
  const { currentUser, isLoading } = useUser();

  const handleComponentClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const location = useLocation();
  const shouldExcludeAuthButtons = ["/phone-verify", "/subscribe"].includes(
    location.pathname
  );

  const logo_filename = "logo-dark-bkg.svg";

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const Backdrop = ({ show, onClick }) => {
    return show ? (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClick}
      ></div>
    ) : null;
  };

  const handleLogout = async () => {
    try {
      await axios
        .post(
          `${appConfig.SERVER_URL}/api/logout`,
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then(function (response) {
          localStorage.removeItem("access_token"); // Remove the token
          localStorage.removeItem("refresh_token"); // Remove the refresh token
        });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <>
      <nav className="bg-ebp-header shadow-lg">
        <div className="max-w-6xl mx-auto px-0 flex justify-between items-center">
              <a href="/" className="flex items-center py-4 px-2">
                <img
                  src={`${process.env.PUBLIC_URL}/${logo_filename}`}
                  alt="Logo"
                  className="h-16 w-48"
                />
              </a>
              {/* Primary Navbar items */}
              <div className="md:flex items-center space-x-1">
                <a
                  href="/wallet"
                  className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex"
                >
                  Wallet
                </a>
                <a
                  href="/subscribe"
                  className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex"
                >
                  Subscribe
                </a>
                <a
                  href="/offerwall"
                  className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex"
                >
                  Offerwall
                </a>
                <a
                  href="/payout"
                  className="py-4 px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300 hidden md:flex"
                >
                  Payout
                </a>
                {/* Signin/signup/logout buttons - Conditional rendering based on currentUser */}
              </div>
              {currentUser ? (
                <div className="md:flex md:justify-start gap-2 py-4 px-2">
                  <a href="/wallet" className="">
                    <WalletBalance wallet={currentUser} />
                  </a>
                </div>
              ) : (
                !shouldExcludeAuthButtons && (
                  <div className="flex gap-2 py-4 px-2">
                    <a
                      href="/login"
                      className="py-2 px-4 text-green-700 font-semibold rounded-lg border border-green-700 hover:bg-ebp-cta-green hover:text-white transition duration-300 whitespace-nowrap"
                    >
                      Sign In
                    </a>
                    <a
                      href="/signup"
                      className="py-2 px-4 bg-ebp-cta-green text-white font-semibold rounded-lg hover:bg-ebp-cta-green transition duration-300 whitespace-nowrap"
                    >
                      Sign Up
                    </a>
                  </div>
                )
              )}
        </div>
      </nav>

      
      {!shouldExcludeAuthButtons && (

      <nav className="fixed inset-x-0 bottom-0 bg-ebp-header shadow-lg md:hidden z-50">
        <div className="flex justify-between">
          <button onClick={toggleDrawer} className="flex-1 text-center md:hidden">
            {/* SVG for Menu icon */}
            <div className="flex flex-col items-center justify-center md:hidden">
            {/* flex flex-col items-center justify-center */}
              <svg
                width="46"
                height="18"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="line-1"
                  d="M0.75 0.75H15.25"
                  stroke="white"
                ></path>
                <path
                  className="line-2"
                  d="M0.75 13.25H15.25"
                  stroke="white"
                ></path>
                <path
                  className="line-3"
                  d="M1 7H9"
                  stroke="white"
                ></path>
              </svg>
              <span className="block text-xs text-gray-300">More</span>
            </div>
          </button>

          {/* Mobile Menu: Sidebar Drawer */}
          <div
            className={`fixed inset-y-0 left-0 mb-16 transform ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            } w-60 bg-ebp-header text-white transition-transform duration-300 ease-in-out z-50`}
          >
            {/* Drawer content */}
            <div className="p-4 flex flex-col v-full justify-between">
              {/* Top links */}
              <img
                src={`${process.env.PUBLIC_URL}/${logo_filename}`}
                alt="Logo"
                className="h-16 w-48"
              />
              <div>
                <a href="/" className="block py-2 text-ebp-text-light">
                  Home
                </a>
                {currentUser ? (
                  <>
                    <a href="/user" className="block py-2 text-ebp-text-light">
                      Profile
                    </a>
                    <a href="/user-subscription" className="block py-2 text-ebp-text-light">
                      Manage Subscription
                    </a>
                    {!currentUser.active_subscription  && (
                      <a href="/subscribe" className="block py-2 text-ebp-cta-green-earn-font">
                        Subscribe
                      </a>
                    )}
                      <a href="/user-payouts" className="block py-2 text-ebp-text-light">
                      Payouts
                    </a>
                  </>
                ) : (
                  <a href="/signup" className="block py-2 text-ebp-cta-green hover:text-ebp-cta-green-earn-font">
                    Sign up!
                  </a>
                )}
                <a
                  href="https://tawk.to/chat/659853700ff6374032bd0622/1hjdgbsgi"
                  className="block py-2 text-ebp-text-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </a>
                {/* Add other links */}
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <Backdrop
            show={isDrawerOpen}
            onClick={() => setIsDrawerOpen(false)}
          />

          <Link
            to="/offerwall"
            className="flex-1 text-center py-2"
            onClick={() => handleComponentClick("Earn")}
          >
            <Earn
              className="w-8 h-8 mx-auto"
              fill={activeComponent === "Earn" ? "#48BB78" : "#FFF"}
              stroke="white"
              xmlns="http://www.w3.org/2000/svg"
            />
            <span className="block text-xs text-gray-300">Earn</span>
          </Link>

          <Link
            to="/payout"
            className="flex-1 text-center py-2"
            onClick={() => handleComponentClick("AtmCashout")}
          >
            <AtmCashout
              className="w-14 h-8 mx-auto"
              fill={activeComponent === "AtmCashout" ? "#48BB78" : "#FFF"}
              stroke="white"
              xmlns="http://www.w3.org/2000/svg"
            />
            <span className="block text-xs text-gray-300">Cashout</span>
          </Link>

        </div>
      </nav>
      )}
    </>
  );
};

export default Navbar;
