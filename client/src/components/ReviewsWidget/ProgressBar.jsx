import React, { useState, useEffect, useContext } from 'react';
import FilterContext from './FilterContext';

const ProgressBar = ({ numStars, numReviews, totalReviews }) => {
  const [rendered, setRendered] = useState(false);
  const [filteredContext, setFilteredContext] = useContext(FilterContext);
  const [filtered, setFiltered] = useState(false);
  useEffect(() => {
    if (rendered) {
      const index = filteredContext.indexOf(numStars);
      const filteredCopy = [...filteredContext];
      setFilteredContext(
        index >= 0 ? (
          [...filteredCopy.slice(0, index), ...filteredCopy.slice(index + 1)]
        ) : (
          [...filteredContext, numStars].sort()
        ),
      );
    } else {
      setRendered(true);
    }
  }, [filtered]);
  return (
    <li className={`rating-bar ${filteredContext.includes(numStars) && "rating-bar-active"}`} onClick={() => setFiltered(!filtered)}>
      <div className="rating-bar-stars">
        <u>{`${numStars} stars`}</u>
      </div>
      <div className="rating-container">
        <div className="rating-filler" style={{ width: `${Math.round((numReviews / totalReviews) * 100)}%` }} />
      </div>
      <div className="rating-bar-reviews">
        {numReviews}
      </div>
    </li>
  );
};
export default ProgressBar;
