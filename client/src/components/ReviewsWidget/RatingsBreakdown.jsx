import React, { useEffect, useContext } from 'react';
import ReactStars from 'react-rating-stars-component';
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
      <div className="avg-rating-stars">
        <div className="avg-rating">{averageRating}</div>
        <div>
          {averageRating !== null
          && (
            <ReactStars {
              ...{
                size: 16,
                value: Math.round(averageRating * 2) / 2,
                a11y: true,
                isHalf: true,
                edit: false,
                activeColor: 'red',
              }
            }
            />
          )}
        </div>
      </div>
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
