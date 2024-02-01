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
    <table className="min-w-full divide-y divide-gray-200 table-fixed">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Award Date</th>
          <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Payout url</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {payouts.map((payout) => (
          <tr key={payout.id}>
            <td className="px-1 sm:px-3 py-2 text-xs sm:text-sm">
              <div className="text-gray-800">{formatDate(payout.created_at)}</div>
            </td>
            <td className="px-1 sm:px-3 py-2 text-xs sm:text-sm">
              <a
                href={payout.payout_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-800"
              >
                {payout.payout_url}
              </a>
            </td>
            {/* Add other data cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PayoutsTable;
