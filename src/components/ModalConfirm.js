import React, { Component } from "react";

const ModalConfirm = ({ isOpen, setIsOpen, content, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{content}</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">Are you sure you want to cancel your subscription? Please note that upon cancellation, you will no longer be able to cash out any money earned in your account</p>
          </div>
          <div className="flex justify-center gap-4 pt-3">
            <button
              className="px-4 py-2 bg-ebp-cta-green text-white rounded-md hover:bg-ebp-cta-green focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => setIsOpen(false)}
            >
              {cancelText}
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => {
                onConfirm();
                setIsOpen(false);
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;