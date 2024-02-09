import React, { useState } from 'react';

const ToggleSwitch = (mode, setMode) => {

  const handleToggle = () => {
    setMode(prevMode => (prevMode === "signIn" ? "signUp" : "signIn"));
  };

  return (
    <div className="flex items-center justify-center py-5">
      <div className="relative w-24 rounded-full border-2 border-gray-400 bg-black p-1" onClick={handleToggle}>
        <div
          className={`absolute top-1 left-1 w-11 h-6 rounded-full transition-transform ${
            mode? 'translate-x-12 bg-green-400' : 'bg-gray-300'
          }`}
        />
        <div className="flex justify-between items-center px-1 text-white">
          <span className={`absolute w-12 text-center ${mode? 'text-gray-500' : 'text-white'}`}>Sign In</span>
          <span className={`absolute w-12 text-center ${mode? 'text-white' : 'text-gray-500'}`}>Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;