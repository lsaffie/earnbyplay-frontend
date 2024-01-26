import React, { useState, useEffect } from 'react';
import axios from 'axios';
import appConfig from '../config';
import ModalConfirm from './ModalConfirm'
import { useUser } from '../UserContext'; // Import useUser hook

const UserSubscription= () => {
  // const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);
  const { currentUser } = useUser(); // Use useUser hook to get currentUser


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

  }, [currentUser]); // End useEffect

  const handleCancelSubscription = (subscriptionId) => {
    setShowModal(true);
    setSelectedSubscriptionId(subscriptionId);
    setModalContent(`Cancel Subscription Confirmation`);
  };

  const cancelSubscription = () => {
    axios.delete(`${appConfig.SERVER_URL}/api/subscription/`, {
      data: {
        subscription_id: selectedSubscriptionId 
      },
      headers: {
        'Authorization': `Bearer ${getJwtToken()}`
      }
    })
    .then(() => {
      // Filter out the cancelled subscription or refresh the list
      setSubscriptions(subscriptions.filter(sub => sub.id !== selectedSubscriptionId));
    })
    .catch(error => {
      console.error('Error canceling subscription:', error);
      alert('Failed to cancel subscription.'); // Provide user feedback
    });
  };

  if (!currentUser?.active_subscription) {
    return (
      <>
        <div className="px-0 my-5 sm:px-4 md:px-6 lg:px-8">
          {" "}
          {/* Responsive Padding */}
          <div className="bg-white shadow overflow-hidden sm:rounded-sm p-3">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Subscription Details
              </h3>
            </div>
            <p className="text-md mt-3 text-red-500">
              You're currently unsubscribed.
            </p>
            <a href="/subscribe"
              className="inline-block text-center bg-ebp-cta-green text-white py-2 px-4 mt-4 rounded hover:bg-ebp-cta-green transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg text-sm font-medium" >
              Subscribe
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="px-0 my-5 sm:px-4 md:px-6 lg:px-8"> {/* Responsive Padding */}
      {subscriptions.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-sm">
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
              <br />
              {subscription.status === 'Active' && (
                <div className="px-4 py-4 sm:px-6 text-right">
                  <button
                    onClick={() => handleCancelSubscription(subscription.id)}
                    className="px-4 py-2 bg-ebp-cta-green text-white rounded-md hover:bg-ebp-cta-green focus:outline-none focus:ring-2 focus:ring-blue-300">
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
      <ModalConfirm
      isOpen={showModal}
      setIsOpen={setShowModal}
      content={modalContent}
      onConfirm={() => cancelSubscription()}
      confirmText="Yes, Cancel"
      cancelText="No, Go Back"
    />
    </div>
  );



};

export default UserSubscription