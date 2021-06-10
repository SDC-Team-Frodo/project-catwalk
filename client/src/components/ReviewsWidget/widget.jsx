import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../contexts/ProductContext';
import RatingsBreakdown from './RatingsBreakdown';
import ProductBreakdown from './ProductBreakdown';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
import request from '../../requests';
import getRecommendedAvg from '../../helpers/recommendedAvg';

const ReviewContainer = () => {
  const product = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);
  const [reviewsMeta, setReviewsMeta] = useState({});
  useEffect(() => {
    request.get('reviews', { product_id: product.id, count: 500 })
      .then((data) => setReviews(data.data.results))
      .catch((err) => new Error(err));
  }, [product]);
  useEffect(() => {
    request.get('reviews/meta', { product_id: product.id })
      .then((metadata) => setReviewsMeta(metadata.data))
      .catch((err) => new Error(err));
  }, [product]);
  return (
    <article id="review-widget">
      <header>RATINGS &amp; REVIEWS</header>
      <div id="reviews-ratings-container">
        <div id="ratings-container">
          {reviewsMeta.ratings && <RatingsBreakdown ratings={reviewsMeta.ratings} />}
          {reviewsMeta.recommended
          && (
          <div className="recommend-summary">
            {`${getRecommendedAvg(reviewsMeta.recommended)}% of reviews recommend this product`}
          </div>
          )}
          {reviewsMeta.characteristics
          && <ProductBreakdown characteristics={reviewsMeta.characteristics} />}
        </div>
        <div id="reviews-container">
          <ReviewsList reviews={reviews} />
          <ReviewForm />
        </div>
      </div>
    </article>
  );
};

export default ReviewContainer;
