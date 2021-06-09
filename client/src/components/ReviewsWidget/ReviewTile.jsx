import React, { useState, useEffect, useContext } from 'react';
import ReactStars from 'react-rating-stars-component';
import formatDate from '../../helpers/formatDate';

const ReviewTile = ({ review }) => {
  // useState
  // useEffect
  return (
    <li className="review">
      <div className="review-date">
        <span>
          <ReactStars {
            ...{
              size: 16,
              value: review.rating,
              edit: true,
            }
          }
          />
        </span>
        <span>{formatDate(review.date)}</span>
      </div>
      <p className="review-summary">{review.summary}</p>
      <p className="review-body">{review.body}</p>
      {review.recommend && <div className="recommend">✓ I recommend this product</div>}
      <div className="reviewer">
        --
        {review.reviewer_name}
      </div>
      {review.response
        && (
          <div className="response">
            Response:
            <p>
              {review.response}
            </p>
          </div>
        )}
      <div className="helpful">
        Helpful?
        <button type="button"> Yes </button>
        /
        <button type="button"> No </button>
        (
        {review.helpfulness}
        ) |
        <button type="button"> Report </button>
      </div>
    </li>
  );
};

export default ReviewTile;
