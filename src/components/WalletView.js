import React, { useState, useEffect } from "react";
import axios from "axios";
import appConfig from "../config";
import LedgerEntries from "./LedgerEntries";

const WalletView = () => {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getJwtToken = () => {
    return localStorage.getItem("access_token");
  };

  useEffect(() => {
    const jwtToken = getJwtToken();

    if (!jwtToken) {
      setError("No wallet available, requires sign in.");
      setIsLoading(false);
      return;
    }

    // Fetch Wallet Details
    axios
      .get(`${appConfig.SERVER_URL}/api/wallet/`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setWallet(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wallet data:", error);
        setIsLoading(false);
      });

    // Fetch ledger entries
    axios
      .get(`${appConfig.SERVER_URL}/api/ledger/`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []); // End useEffect

  // Render wallet data, error message, or loading message
  return (
    <>
      <div className="px-0 sm:px-6 lg:px-8 my-5 mx-1 sm:mx-5">
        {error && <p className="text-red-500">{error}</p>}
        {!error && isLoading && <p className="text-gray-600">Loading wallet data...</p>}
        {wallet && (
          <div>
            <div className="bg-white shadow rounded-sm p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Wallet Details</h2>
              <p className="text-md text-gray-600">Balance:</p>
              <p className="text-xl font-bold text-gray-900">{wallet.balance}</p>
              {/* Render additional wallet details here */}
              <a href="/payout" className="inline-block text-center bg-green-500 text-white py-2 px-4 mt-4 rounded hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg text-sm font-medium">
                Cash Out
              </a>
            </div>
            <div className="overflow-x-auto">
              <LedgerEntries />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WalletView;
