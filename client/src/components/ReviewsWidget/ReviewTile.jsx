import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import request from '../../requests';
import formatDate from '../../helpers/formatDate';

const ReviewTile = ({ review, searchText }) => {
  const [hidden, setHidden] = useState(review.body.length > 250);
  const [selectedHelpful, setSelectedHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulness);
  const [reported, setReported] = useState(false);
  useEffect(() => {
    if (selectedHelpful) {
      request.put(`reviews/${review.review_id}/helpful`, { review_id: review.review_id })
        .then(() => { setHelpfulCount(helpfulCount + 1); })
        .catch((err) => new Error(err));
    }
  }, [selectedHelpful]);
  useEffect(() => {
    if (reported) {
      request.put(`reviews/${review.review_id}/report`, { review_id: review.review_id })
        .then()
        .catch((err) => new Error(err));
    }
  }, [reported]);
  return !reported ? (
    <li className="review">
      <div className="review-date">
        <div className="empty-stars">
          <div className="filled-stars" style={{ width: `${review.rating * 20}%` }}>
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
            <i className="fas fa-star" aria-hidden="true" />
          </div>
        </div>
        <span>{formatDate(review.date)}</span>
      </div>
      <p className="review-summary">{review.summary}</p>
      <div className="review-body">
        <p>
          {hidden ? `${review.body.slice(0, 249)}... ` : review.body}
          {review.body.length > 250 && <button type="button" onClick={() => setHidden((isHidden) => !isHidden)}>{hidden ? 'Show More' : 'Show Less'}</button>}
        </p>
        {!!review.photos.length
        && (
          <ul className="review-photos">
            {review.photos.map((photo) => (
              <li className="review-photo" key={photo.id}>
                <Modal
                  key={photo.id}
                  modalId={`reviewPhoto${photo.id}`}
                  body={(
                    <img src={photo.url} alt="review img" />
                  )}
                  isImage="true"
                  image={<img src={photo.url} alt="review img thumbnail" />}
                />
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
        <button type="button" disabled={selectedHelpful} onClick={() => setSelectedHelpful(true)}>Yes</button>
        <span>
          (
          {helpfulCount}
          )
        </span>
        |
        <button type="button" disabled={reported} onClick={() => setReported(true)}> Report </button>
      </div>
    </li>
  ) : null;
};

export default ReviewTile;
