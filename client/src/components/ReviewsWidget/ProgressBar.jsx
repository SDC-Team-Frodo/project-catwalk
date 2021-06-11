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
    <li className="rating-bar" onClick={() => setFiltered(!filtered)}>
      <div>
        <u>{`${numStars} stars`}</u>
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
