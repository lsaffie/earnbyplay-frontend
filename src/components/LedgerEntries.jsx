import React, { useState, useEffect } from 'react';
import appConfig from '../config';
import axios from 'axios';

const LedgerEntriesComponent = () => {
    const [ledgerEntries, setLedgerEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
      <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ledger Entries</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {ledgerEntries.map(entry => (
                            <tr key={entry.id}>
                                <td className="px-4 py-2 whitespace-nowrap">{entry.id}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{entry.amount}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{entry.transaction_type || 'N/A'}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{new Date(entry.timestamp).toLocaleString()}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{entry.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LedgerEntriesComponent;
