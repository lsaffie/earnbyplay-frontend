import React from 'react';

const Footer = () => {
  return (
    <div className="bg-ebp-header p-5 m-5">
        <div className="text-gray-500 mb-5 text-center">
            <p>Contact us: info@earnbyplay.com</p>
            <p>© {new Date().getFullYear()} Earn by Play. All rights reserved.</p>
        </div>
    </div>
  );
};

export default Footer;