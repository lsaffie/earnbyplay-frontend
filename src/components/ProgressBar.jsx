import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Phone', 'Verify', 'Join & Claim $20'];

  return (
    <div className="flex justify-between space-x-3 mb-0">
      {steps.map((step, index) => (
        <div key={step} className="p-2 flex flex-col items-start flex-grow">
          <div className={`w-full h-3 w-20 rounded ${index < currentStep ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          <div className="text-white text-xs mt-1">{index+1}. {step}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;