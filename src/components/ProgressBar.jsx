import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Get Code', 'Verify', 'Pay', 'Claim'];

  return (
    <div className="flex justify-between space-x-4 mb-0">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-start flex-grow">
          <div className={`w-full h-3 rounded ${index < currentStep ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          <div className="text-white text-xs mt-1 w-20">{index+1}. {step}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;