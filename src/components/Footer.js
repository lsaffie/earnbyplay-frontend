import React from 'react';

const Footer = () => {
  return (
    <div className="bg-ebp-header p-5 mx-5 mb-5">
        <div className="text-gray-500 text-center">
            <p>Contact us: info@earnbyplay.com</p>
            <p>© {new Date().getFullYear()} Earn by Play. All rights reserved.</p>
        </div>
    </div>
  );
};

export default Footer;