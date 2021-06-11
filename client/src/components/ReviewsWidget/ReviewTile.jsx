import React, { useState, useEffect, useContext } from 'react';
import ReactStars from 'react-rating-stars-component';
import formatDate from '../../helpers/formatDate';

const ReviewTile = ({ review }) => {
  const [hidden, setHidden] = useState(review.body.length > 250);
  // const [selectedHelpful, setSelectedHelpful] = useState(false);
  return (
    <li className="review">
      <div className="review-date">
        <span>
          <ReactStars {
            ...{
              size: 16,
              value: review.rating,
              a11y: true,
              edit: false,
              activeColor: 'red',
            }
          }
          />
        </span>
        <span>{formatDate(review.date)}</span>
      </div>
      <p className="review-summary">{review.summary}</p>
      <div className="review-body">
        <p>{hidden ? `${review.body.slice(0, 249)}...` : review.body}</p>
        {hidden && <button type="button" onClick={() => setHidden((isHidden) => !isHidden)}>Show More</button>}
        {!!review.photos.length
        && (
          <ul className="review-photos">
            {review.photos.map((photo) => (
              <li className="review-photo" key={photo.id}>
                <img src={photo.url} alt="review img" />
              </li>
            ))}
          </ul>
        )}
      </div>
      {review.recommend && (
        <div className="recommend">
          <i className="fas fa-check" />
          I recommend this product
        </div>
      )}
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
        <span>
          (
          {review.helpfulness}
          )
        </span>
        |
        <button type="button"> Report </button>
      </div>
    </li>
  );
};

export default ReviewTile;
