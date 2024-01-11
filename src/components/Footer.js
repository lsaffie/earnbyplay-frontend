import React from 'react';

const Footer = () => {
  return (
      <footer className="hidden sm:block w-full bg-ebp-header shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="flex justify-between items-center sm:py-5 text-white">
            <p>Contact us: info@earnbyplay.com</p>
            <p>© {new Date().getFullYear()} Earn by Play. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;