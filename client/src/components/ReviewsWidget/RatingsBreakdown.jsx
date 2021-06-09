import React/* , { useState, useEffect, useContext } */ from 'react';
import ReactStars from 'react-rating-stars-component';
import testReviewMetadata from './testReviewMetadata';
import getAverageRating from '../../helpers/averageRating';

const RatingsBreakdown = () => {
  const averageRating = getAverageRating(testReviewMetadata.ratings);
  return (
    <section id="ratings-breakdown">
      <div className="avg-rating-stars">
        <div>{averageRating}</div>
        <div>
          <ReactStars {
            ...{
              size: 16,
              value: averageRating,
              edit: false,
            }
          }
          />
        </div>
      </div>
      <div>Some bars go here</div>
    </section>
  );
};

export default RatingsBreakdown;
