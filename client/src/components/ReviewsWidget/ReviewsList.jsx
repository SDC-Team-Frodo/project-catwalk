import React, { useState, useEffect, useContext } from 'react';
import ReviewTile from './ReviewTile';
import reviewData from './testReviewData';

const ReviewsList = () => {
  // will get filtered reviews from a context object set in widget.jsx
  const [reviewsShown, setReviewsShown] = useState(2);
  const [sortOrder, setSortOrder] = useState('relevant');
  // useEffect
  return (
    <section id="reviews">
      <div className="reviews-count">
        {reviewData.results.length} reviews, sorted by <select onChange={(e) => setSortOrder((e) => e.target.value)}>
          <option value="relevant">relevance</option>
          <option value="newest">newest</option>
          <option value="helpful">helpful</option>
        </select>
      </div>
      <ul>
        {reviewData.results.slice(0, reviewsShown).map((review) => (
          <ReviewTile key={review.review_id} review={review} />
        ))}
      </ul>
      <div className="review-buttons">
        {reviewsShown + 1 <= reviewData.results.length && <button type="button" onClick={() => setReviewsShown((numReviews) => numReviews + 2)}>MORE REVIEWS</button>}
        <button type="button">
          WRITE A REVIEW
          <big> + </big>
        </button>
      </div>
    </section>
  );
};

export default ReviewsList;
