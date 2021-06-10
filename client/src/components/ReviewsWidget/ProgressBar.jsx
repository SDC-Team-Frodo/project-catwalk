import React from 'react';

const ProgressBar = ({ numStars, numReviews, totalReviews }) => {

  return (
    <li className="rating-bar">
      <div>
        {`${numStars} stars`}
      </div>
      <div className="rating-container">
        <div className="rating-filler" style={{ width: `${Math.round((numReviews / totalReviews) * 100)}%` }} />
      </div>
      <div>
        {numReviews}
      </div>
    </li>
  );
};
export default ProgressBar;
