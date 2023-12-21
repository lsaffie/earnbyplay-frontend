import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';

const UserSubscription= ({ userId }) => {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  const getJwtToken = () => {
    return localStorage.getItem('access_token'); // Or however you've named the token in storage
  };

  useEffect(() => {
    // Fetch Subscriptions
    axios.get(`${appConfig.SERVER_URL}/api/subscription/`, {
        headers: {
          'Authorization': `Bearer ${getJwtToken()}`
        }
    })
      .then(response => setSubscriptions(response.data.subscriptions))
      .catch(error => console.error('Error fetching subscriptions:', error));

  }, [userId]); // End useEffect

  const cancelSubscription = (subscriptionId) => {
    axios.delete(`${appConfig.SERVER_URL}/api/subscription/`, {
      data: {
        subscription_id: subscriptionId
      },
      headers: {
        'Authorization': `Bearer ${getJwtToken()}`
      }
    })
    .then(() => {
      // Filter out the cancelled subscription or refresh the list
      setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
    })
    .catch(error => {
      console.error('Error canceling subscription:', error);
      alert('Failed to cancel subscription.'); // Provide user feedback
    });
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {subscriptions.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Subscription Details</h3>
          </div>
          {subscriptions.filter(subscription => subscription.status === 'Active').map((subscription, index) => (
            <div key={index}>
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <tbody className="bg-white">
                  {/* Table rows */}
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-gray-600">Id</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{subscription.id}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-gray-600">Plan Name</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{subscription.plan_name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-gray-600">Start Date</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{subscription.start_date}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-gray-600">End Date</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{subscription.end_date}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-gray-600">Braintree Subscription ID</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{subscription.braintree_subscription_id}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-gray-600">Status</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{subscription.status}</td>
                  </tr>
                </tbody>
              </table>
              {subscription.status === 'Active' && (
                <div className="px-4 py-4 sm:px-6 text-right">
                  <button
                    onClick={() => cancelSubscription(subscription.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Cancel Subscription
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No subscription data available.</p>
      )}
    </div>
  );



};

export default UserSubscription