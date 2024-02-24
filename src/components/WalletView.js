import React, { useState, useEffect } from "react";
import axios from "axios";
import appConfig from "../config";
import LedgerEntries from "./LedgerEntries";
import PayoutsTable from "./PayoutsTable";
import { useUser } from '../UserContext';

const WalletView = () => {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useUser();

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
  }, [currentUser]); // End useEffect

  // Render wallet data, error message, or loading message
  return (
    <>
      <div className="px-0 sm:px-6 lg:px-8 my-5 mx-1 sm:mx-5">
        {error && <p className="text-red-500">{error}</p>}
        {!error && isLoading && <p className="text-gray-600">Loading wallet data...</p>}
        {wallet && (
          <div>
            <div className="bg-ebp-header shadow rounded-sm p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-4">Wallet Details</h2>
              <p className="text-md text-gray-200">Points Balance:</p>
              <p className="text-xl font-bold text-gray-200">{wallet.balance}</p>
              {/* Render additional wallet details here */}
              {currentUser?.active_subscription ? (
                <a href="/payout" className="inline-block text-center bg-ebp-cta-green text-white py-2 px-4 mt-4 rounded hover:bg-ebp-cta-green transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg text-sm font-medium">
                  Cash Out
                </a>
              ) : (
                <>
                  <p className="text-md mt-3 text-red-500">
                    Only subscribed users can cashout. Please subscribe or contact us.
                  </p>
                  <a href="/subscribe" className="inline-block text-center bg-ebp-cta-green text-white py-2 px-4 mt-4 rounded hover:bg-ebp-cta-green transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg text-sm font-medium">
                    Subscribe
                  </a>
                </>
              )}
            </div>
            <div className="overflow-x-auto">
              <LedgerEntries />
            </div>
            <div className="overflow-x-auto">
              <PayoutsTable />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WalletView;
