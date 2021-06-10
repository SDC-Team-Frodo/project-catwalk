import React, { useState, useEffect, useContext } from 'react';
import ReviewTile from './ReviewTile';

const ReviewsList = ({ reviews }) => {
  // will get filtered reviews from a context object set in widget.jsx
  const [reviewsShown, setReviewsShown] = useState(2);
  const [sortOrder, setSortOrder] = useState('relevant');
  // useEffect
  useEffect(() => {
    // fetch list of reviews based on sortOrder state
  }, [sortOrder]);
  return (
    <section id="reviews">
      <div className="reviews-count">
        <span>{reviews.length}</span>
        reviews, sorted by
        <select onChange={(e) => setSortOrder(() => e.target.value)}>
          <option value="relevant">relevance</option>
          <option value="newest">newest</option>
          <option value="helpful">helpful</option>
        </select>
      </div>
      <ul className="review-tiles">
        {reviews.slice(0, reviewsShown).map((review) => (
          <ReviewTile key={review.review_id} review={review} />
        ))}
      </ul>
      <div className="review-buttons">
        {reviewsShown + 1 <= reviews.length && <button type="button" onClick={() => setReviewsShown((numReviews) => numReviews + 2)}>MORE REVIEWS</button>}
        <button type="button">
          WRITE A REVIEW
          <big> + </big>
        </button>
      </div>
    </section>
  );
};

export default ReviewsList;
