import React, { useEffect, useContext } from 'react';
import RatingContext from '../../contexts/RatingContext';
import FilterContext from './FilterContext';
import ProgressBar from './ProgressBar';
import getAverageRating from '../../helpers/averageRating';
import getTotalRatings from '../../helpers/totalRatings';

const RatingsBreakdown = ({ ratings }) => {
  const [averageRating, setAverageRating] = useContext(RatingContext);
  const [filteredContext, setFilteredContext] = useContext(FilterContext);
  useEffect(() => {
    setAverageRating(getAverageRating(ratings));
  }, [ratings]);
  return (
    <section id="ratings-breakdown">
      <h4>RATINGS</h4>
      {filteredContext.length !== 0
      && (
        <div className="filter-summary">
          Filtering results by:
          <div className="current-filters">
            {filteredContext.map((rating) => `${rating} stars`).join(', ')}
          </div>
          <button type="button" onClick={() => setFilteredContext([])}>
            Remove All Filters
          </button>
        </div>
      )}
      {averageRating !== null
      && (
      <div className="avg-rating-stars">
        <div className="avg-rating">{parseFloat(averageRating).toFixed(1)}</div>
        <div className="empty-stars">
          <div className="filled-stars" style={{ width: `${(Math.round(averageRating * 4) / 4) * 20}%` }}>
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
          </div>
        </div>
      </div>
      )}
      <ul className="rating-bars">
        {[5, 4, 3, 2, 1].map((value) => (
          <ProgressBar
            key={value}
            numStars={value}
            numReviews={ratings[value] || 0}
            totalReviews={getTotalRatings(ratings)}
          />
        ))}
      </ul>
    </section>
  );
};

export default RatingsBreakdown;
