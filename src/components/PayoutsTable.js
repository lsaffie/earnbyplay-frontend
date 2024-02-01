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
    <table className="w-full text-sm text-left text-white">
      <thead className="text-xs text-gray-800 uppercase bg-gray-100">
        <tr>
          <th className="px-6 py-3">Award Date</th>
          <th className="px-6 py-3">Payout URL</th>
        </tr>
      </thead>
      <tbody>
        {payouts.map((payout) => (
          <tr key={payout.id} className="bg-gray-100 border-b border-gray-700">
            <td className="px-6 py-4">
              <div className="text-gray-800">{formatDate(payout.created_at)}</div>
            </td>
            <td className="px-6 py-4">
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
