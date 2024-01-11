import React, { useState, useEffect } from "react";
import axios from "axios";
import appConfig from "../config";
import LedgerEntries from "./LedgerEntries";

const WalletView = () => {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);

  const getJwtToken = () => {
    return localStorage.getItem("access_token"); // Or however you've named the token in storage
  };

  useEffect(() => {
    // Fetch Wallet Details
    axios
      .get(`${appConfig.SERVER_URL}/api/wallet/`, {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
      })
      .then((response) => setWallet(response.data))
      .catch((error) => console.error("Error fetching wallet data:", error));

    // Fetch ledger entries
    axios
      .get(`${appConfig.SERVER_URL}/api/ledger/`, {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
      })
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []); // End useEffect

  // Render wallet data or an error message
  return (
    <>
    <div className="px-0 sm:px-6 lg:px-8 my-5 mx-1 sm:mx-5">
      {error && <p className="text-red-500">{error}</p>}
      {wallet ? (
        <div>
          <div className="bg-white shadow rounded-sm p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Wallet Details</h2>
            <p className="text-md text-gray-600">Balance:</p>
            <p className="text-xl font-bold text-gray-900">{wallet.balance}</p>
            {/* Render additional wallet details here */}
          </div>
          <div className="overflow-x-auto">
            <LedgerEntries />
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Loading wallet data...</p>
      )}
    </div>
    </>

  );
};

export default WalletView;
