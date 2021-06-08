import React from 'react';
import RatingsBreakdown from './RatingsBreakdown';
import ProductBreakdown from './ProductBreakdown';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';

const ReviewContainer = () => (
  <article id="ReviewWidget">
    <header>RATINGS &amp; REVIEWS</header>
    <RatingsBreakdown />
    <ProductBreakdown />
    <ReviewsList />
    <ReviewForm />
  </article>
);

export default ReviewContainer;
