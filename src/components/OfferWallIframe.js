import React from 'react';

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

  return(
    <div className="iframe-container w-full">
      <iframe
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