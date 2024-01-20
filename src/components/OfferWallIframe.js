import React from 'react';
import { trackEventWithUrlParams } from '../utils/amplitudeUtils';

//TODO: move this to react secrets?
const secretToken = "46782b4a-6921-45bc-a9bd-0e8ee7da1814"

const OfferWallIframe = ({ currentUser }) => {
  console.log(currentUser)
  const uid = currentUser ? currentUser.id : ''; 
  const bitlabsUrl = (
    'https://web.bitlabs.ai/?uid=' + uid +
    '&token=' + secretToken +
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
          <p className="text-white text-center mt-20">Sign up or login to interact.</p>
        </div>
      )}
    </div>
  );
}

export default OfferWallIframe;