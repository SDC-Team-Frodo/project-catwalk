import React, { useState, useEffect, useContext } from 'react';
import ReactStars from 'react-rating-stars-component';
import formatDate from '../../helpers/formatDate';

const ReviewTile = ({ review }) => {

  return (
    <li className="review">
      <span>
        <ReactStars {
          ...{
            size: 20,
            value: review.rating,
            edit: false,
          }
        }
        />
      </span>
      <span>{formatDate(review.date)}</span>
      <div className="review-summary">{review.summary}</div>
      <div className="review-body">{review.body}</div>
      <div className="recommend">{review.recommend && '✅ I recommend this product'}</div>
      <div className="reviewer">{review.reviewer_name}</div>
      <div className="response">
        {review.response
          && (
          <div>
            Response:
            <div>
              {review.response}
            </div>
          </div>
          )}
      </div>
      <div className="helpful">
        Helpful?
        <a> Yes </a>/<a> No </a>
        {review.helpfulness}
        | Report
      </div>
    </li>
  );
};

export default ReviewTile;
