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
    '&os=desktop' +
    '&display_mode=offers'
  ).replace(/\s+/g, '');

  trackEventWithUrlParams("Offerwall Opened")

  return(
    <div className="iframe-container w-full">
      <iframe
        title="Offerwall"
        src={bitlabsUrl}
        width="100%"
        style={{
          height: '1000px',
          overflow: 'hide', // Hide scrollbars
        }}
      >
      </iframe>
    </div>
  );
}

export default OfferWallIframe;