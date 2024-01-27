import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [isAboutOpen, setIsAboutOpen] = useState(!isMobileView);
  const [isSupportOpen, setIsSupportOpen] = useState(!isMobileView);

  const location = useLocation();


  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      setIsAboutOpen(!isMobile);
      setIsSupportOpen(!isMobile);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't render the footer for the /offerwall route
  const excludedPaths = ['/offerwall', '/earn', '/phone-verify'];
  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="w-full bg-ebp-header shadow-lg mb-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex md:flex-row justify-between text-gray-500 pt-1 mx-5">
          {/* About Section */}
          <div className="mb-4 md:mb-0">
            <button
              onClick={() => isMobileView && setIsAboutOpen(!isAboutOpen) && setIsSupportOpen(!isSupportOpen)}
              className="text-left w-full font-semibold underline"
            >
              About
            </button>
            {(isAboutOpen || isSupportOpen)&& (
              <div className="flex flex-col mt-2">
                <a href="/contact" className="hover:text-gray-300">
                  Contact Us
                </a>
                <a href="/privacy-policy" className="hover:text-gray-300">
                  Privacy Policy
                </a>
                <a href="/terms-of-service" className="hover:text-gray-300">
                  Terms of Service
                </a>
              </div>
            )}
          </div>

          {/* Support Section */}
          <div>
            <button
              onClick={() => isMobileView && setIsAboutOpen(!isAboutOpen) && setIsSupportOpen(!isSupportOpen)}
              className="text-left w-full font-semibold underline" >
              Support
            </button>
            {(isSupportOpen || isAboutOpen) && (
              <div className="flex flex-col mt-2">
                <a href="/faq" className="hover:text-gray-300">
                  FAQ
                </a>
                <a href="https://tawk.to/chat/659853700ff6374032bd0622/1hjdgbsgi"
                  className="hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
