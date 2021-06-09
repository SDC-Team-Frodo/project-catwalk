import React/* , { useState, useEffect, useContext } */ from 'react';
import ReactStars from 'react-rating-stars-component';
import ProgressBar from './ProgressBar';
import testReviewMetadata from './testReviewMetadata';
import getAverageRating from '../../helpers/averageRating';
import getTotalRatings from '../../helpers/totalRatings';

const RatingsBreakdown = () => {
  const averageRating = getAverageRating(testReviewMetadata.ratings);
  return (
    <section id="ratings-breakdown">
      <div className="avg-rating-stars">
        <div className="avg-rating">{averageRating}</div>
        <div>
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
        </div>
      </div>
      <ul className="rating-bars">
        {[5, 4, 3, 2, 1].map((value) => (
          <ProgressBar
            key={value}
            numStars={value}
            numReviews={testReviewMetadata.ratings[value] || 0}
            totalReviews={getTotalRatings(testReviewMetadata.ratings)}
          />
        ))}
      </ul>
    </section>
  );
};

export default RatingsBreakdown;
