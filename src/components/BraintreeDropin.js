import React, { useEffect, useState } from 'react';
import axios from 'axios';
import appConfig from '../config';
import ProgressBar from './ProgressBar'

const BraintreeDropin = () => {
  const [clientToken, setClientToken] = useState(null);
  const [dropinInstance, setDropinInstance] = useState(null);

  // Effect to fetch client token
  useEffect(() => {
    axios.get(`${appConfig.SERVER_URL}/api/generate_client_token/`) // Adjust this path to match your Django URL
      .then(response => {
        setClientToken(response.data.client_token);
      })
      .catch(error => {
        console.error('Error fetching client token:', error);
      });
  }, []);

  // Effect to setup Braintree drop-in after client token is fetched
  useEffect(() => {
    if (clientToken) {
      loadBraintree();
    }
  }, [clientToken]); // Re-run effect if clientToken changes

  const loadBraintree = () => {
    const script = document.createElement('script');
    script.src = 'https://js.braintreegateway.com/web/dropin/1.40.2/js/dropin.min.js';
    script.async = true;
    script.onload = () => {
      window.braintree.dropin.create({
        authorization: clientToken,
        container: '#dropin-container',
        vaultManager: true, // Allow users to manager their vaulted payment methods
      }, (error, instance) => {
        if (error) {
          console.error('Error setting up Braintree:', error);
        } else {
          setDropinInstance(instance);
        }
      });
    };
    document.body.appendChild(script);
  };

  const getJwtToken = () => {
    return localStorage.getItem('access_token'); // Or however you've named the token in storage
  };

  const handlePaymentSubmission = () => {
    if (dropinInstance) {
      dropinInstance.requestPaymentMethod((error, payload) => {
        if (error) {
          console.error('Error requesting payment method:', error);
          return;
        }

        // Retrieve JWT token from storage
        const jwtToken = getJwtToken();
        console.log(jwtToken);

        if (!jwtToken) {
          alert('You are not logged in. Please log in and try again.');
          return;
        }

        // Send nonce to server here
        axios.post(`${appConfig.SERVER_URL}/api/subscription/`, { nonce: payload.nonce },  { 
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
          }
         })
          .then(response => {
            if (response.data.success) {
              alert('Payment successful!');
            } else {
              alert('Payment failed: ' + response.data.error);
            }
          })
          .catch(error => {
            console.error('Error processing payment:', error);
            alert('Error processing payment.');
          });
      });
    }
  };

  return (
    <div className="flex flex-col items-center m-3">
      {clientToken ? (
        <div className="flex flex-col items-center">
          <ProgressBar currentStep="3" />
          <div id="dropin-container" className="center justify-start"></div>
          <button className="w-full bg-ebp-cta-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handlePaymentSubmission}>Submit Payment</button>
        </div>
      ) : (
        <div className="text-center py-2">
          Loading...
        </div>
      )}
    </div>
  );
};

export default BraintreeDropin;