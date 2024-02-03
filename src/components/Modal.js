import React, { Component } from "react";

const Modal = ({ isOpen, setIsOpen, content }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      id="my-modal"
    >
      <div className="relative border-ebp-cta-green top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-ebp-header">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-ebp-cta-green">
            {content}
          </h3>

          <div className="mx-auto flex items-center justify-center h-12 w-12">
          </div>


          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-ebp-cta-green text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={() => setIsOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
