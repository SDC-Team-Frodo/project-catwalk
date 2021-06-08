import React from 'react';
import RatingsBreakdown from './RatingsBreakdown';
import ProductBreakdown from './ProductBreakdown';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';

const ReviewContainer = () => (
  <article id="ReviewWidget">
    <header>RATINGS &amp; REVIEWS</header>
    <div id="reviews-ratings-container">
      <div id="ratings-container">
        <RatingsBreakdown />
        <ProductBreakdown />
      </div>
      <div id="reviews-container">
        <ReviewsList />
        <ReviewForm />
      </div>
    </div>
  </article>
);

export default ReviewContainer;
