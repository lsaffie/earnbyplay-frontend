import React from 'react';
// import { BitLabsOfferWall } from 'bitlabs';

const OfferWallPage = () => {
  const handleExit = () => {
    console.log("Exiting Offerwall");
  };

  const handleReward  = (reward) => {
    console.log(`reward this time: ${reward}`);
  };

  return (
    <div>
      {/* <BitLabsOfferWall
        uid='USER_ID'
        token='46782b4a-6921-45bc-a9bd-0e8ee7da1814'
        adId='adId'
        onExitPressed={handleExit}
        tags={{ 'my_tag': 'new_user', 'is_premium': true }}
        onReward={handleReward}
      /> */}
      {/* Your existing code */}
    </div>
  );
}

export default OfferWallPage;