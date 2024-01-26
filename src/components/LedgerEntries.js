import React, { useState, useEffect } from 'react';
import appConfig from '../config';
import axios from 'axios';
import { useUser } from '../UserContext';

const LedgerEntriesComponent = () => {
    const [ledgerEntries, setLedgerEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useUser();

    //TODO: I believe this is pulling all ledger entries, not just the user?

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        axios.get(`${appConfig.SERVER_URL}/api/ledger/`, {
          headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setLedgerEntries(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching ledger data:', error);
                setError(error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data.</div>;

    return (
      <div className="bg-white shadow rounded-sm p-2 sm:p-4 lg:p-6 mt-3">
        <h3 className="text-md sm:text-lg leading-6 font-medium text-gray-900">Ledger Entries</h3>
        <div className="overflow-x-auto mt-4">
          <div className="inline-block min-w-full">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  {/* Hidden ID column on small screens */}
                  <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">ID</th>
                  <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  {/* Adjusted header for mobile */}
                  <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Desc</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ledgerEntries.map(entry => (
                  <tr key={entry.id}>
                    {/* Hidden ID cell on small screens */}
                    <td className="px-1 sm:px-3 py-2 text-xs sm:text-sm hidden sm:table-cell">{entry.id}</td>
                    <td className="px-1 sm:px-3 py-2 text-xs sm:text-sm">{entry.amount}</td>
                    <td className="px-1 sm:px-3 py-2 text-xs sm:text-sm">{entry.transaction_type || 'N/A'}</td>
                    <td className="px-1 sm:px-3 py-2 text-xs sm:text-sm">{new Date(entry.timestamp).toLocaleString()}</td>
                    <td className="px-1 sm:px-3 py-2 text-xs sm:text-sm">{entry.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    );
};

export default LedgerEntriesComponent;
