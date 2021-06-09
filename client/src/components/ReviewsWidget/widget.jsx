import React from 'react';
import RatingsBreakdown from './RatingsBreakdown';
import ProductBreakdown from './ProductBreakdown';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
// import request from '../../requests';
import getRecommendedAvg from '../../helpers/recommendedAvg';
import reviewMetadata from './testReviewMetadata';

// request.get('reviews/meta', { product_id: 17071 })
//   .then((metadata) => console.log(metadata.data))
//   .catch((err) => console.error(err));

const ReviewContainer = () => (
  <article id="review-widget">
    <header>RATINGS &amp; REVIEWS</header>
    <div id="reviews-ratings-container">
      <div id="ratings-container">
        <RatingsBreakdown />
        <div>
          {getRecommendedAvg(reviewMetadata.recommended)}
          % of reviews recommend this product
        </div>
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
