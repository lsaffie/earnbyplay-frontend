import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Phone', 'Verify', 'Join & Claim $20'];

  return (
    <div className="flex justify-between space-x-3 mb-0 w-full">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center flex-1">
          <div className={`w-full h-3 rounded ${index < currentStep ? 'bg-ebp-cta-green-earn-font' : 'bg-gray-300'}`}></div>
          <div className="text-white text-xs mt-1">{index+1}. {step}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;