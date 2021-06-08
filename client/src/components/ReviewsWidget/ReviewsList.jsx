import React, { useState, useEffect, useContext } from 'react';
import ReviewTile from './ReviewTile';
import reviewData from './testReviewData';
import request from '../../requests';

const ReviewsList = () => {
  // will get filtered reviews from a context object set in widget.jsx
  const [reviewsShown, setReviewsShown] = useState(2);
  const [sortOrder, setSortOrder] = useState('relevant');
  // useEffect
  return (
    <section id="reviews">
      <div>
        {reviewData.results.length} reviews, sorted by <select onChange={(e) => setSortOrder((e) => e.target.value)}>
          <option value="relevant">Relevance</option>
          <option value="newest">Newest</option>
          <option value="helpful">Helpful</option>
        </select>
      </div>
      <ul>
        {reviewData.results.slice(0, reviewsShown).map((review) => (
          <ReviewTile key={review.review_id} review={review} />
        ))}
      </ul>
      <div>
        {reviewsShown + 1 <= reviewData.results.length && <button type="button" onClick={() => setReviewsShown((numReviews) => numReviews + 2)}>More Reviews</button>}
        <button type="button">Write A Review</button>
      </div>
    </section>
  );
};

export default ReviewsList;
