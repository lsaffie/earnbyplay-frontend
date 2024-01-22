import React from 'react';
import { trackEventWithUrlParams } from '../utils/amplitudeUtils';

const OfferWallIframe = ({ currentUser }) => {
  console.log(currentUser)
  const uid = currentUser ? currentUser.id : ''; 
  const bitlabsUrl = (
    'https://web.bitlabs.ai/?uid=' + uid +
    '&token=' + process.env.REACT_APP_BITLABS_TOKEN+
    '&width=full_width' +
    '&display_mode=offers'
  ).replace(/\s+/g, '');

  trackEventWithUrlParams("Offerwall Opened")

  return(
    <div className="iframe-container relative w-full" style={{ height: '100vh' }}>
      <iframe
        title="Offerwall"
        src={bitlabsUrl}
        width="100%"
        style={{ height: '100%', overflow: 'hidden' }} // Hide scrollbars
      />
      {!currentUser && (
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          {/* Display a message or a login prompt here */}
          <p className="text-white text-center mt-40 text-lg bg-ebp-bg-dark p-9 rounded-lg">
            <a href="/signup" className="underline text-green-500 hover:text-green-600 hover:bg-white transition duration-300">
              Sign up
            </a>{" "}
            or{" "}
            <a href="/login" className="underline text-green-500 hover:text-green-600 hover:bg-white transition duration-300">
              login
            </a>{" "}
            to play
          </p>
        </div>
      )}
    </div>
  );
}

export default OfferWallIframe;