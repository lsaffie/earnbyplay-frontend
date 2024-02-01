import React, { useEffect, useState } from "react";
import axios from "axios";
import appConfig from "../config";
import { useUser } from "../UserContext"; // Import useUser hook

const PayoutsTable = () => {
  const [payouts, setPayouts] = useState([]);

  const getJwtToken = () => {
    return localStorage.getItem("access_token"); // Or however you've named the token in storage
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    axios
      .get(`${appConfig.SERVER_URL}/api/user-payouts/`, {
        headers: { Authorization: `Bearer ${getJwtToken()}` },
      })
      .then((response) => {
        setPayouts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user payouts:", error);
      });
  }, []);

  return (
    <div className="shadow rounded-sm p-2 sm:p-4 lg:p-6 mt-3">
      <h3 className="text-md sm:text-lg leading-6 font-medium text-gray-200">
        Payouts
      </h3>
      <div className="overflow-x-auto mt-4">
        <div className="inline-block min-w-full">
          <table className="min-w-full divide-y divide-gray-400 table-fixed">
            <thead className="bg-ebp-header">
              <tr>
                <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Award Date
                </th>
                <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Payout url
                </th>
              </tr>
            </thead>
            <tbody className="bg-ebp-header divide-y divide-gray-800">
              {payouts.map((payout) => (
                <tr key={payout.id}>
                  <td className="px-1 sm:px-3 py-2 text-xs sm:text-sm">
                    <div className="text-gray-200">
                      {formatDate(payout.created_at)}
                    </div>
                  </td>
                  <td className="px-1 sm:px-3 py-2 text-xs sm:text-sm">
                    <a
                      href={payout.payout_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-white"
                    >
                      {payout.payout_url}
                    </a>
                  </td>
                  {/* Add other data cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayoutsTable;
