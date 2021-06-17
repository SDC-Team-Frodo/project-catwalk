import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../contexts/ProductContext';
import FilterContext from './FilterContext';
import RatingsBreakdown from './RatingsBreakdown';
import ProductBreakdown from './ProductBreakdown';
import ReviewsList from './ReviewsList';
import request from '../../requests';
import getRecommendedAvg from '../../helpers/recommendedAvg';

const ReviewContainer = (props) => {
  const product = useContext(ProductContext);
  const [reviewsMeta, setReviewsMeta] = useState({});
  const [filteredContext, setFilteredContext] = useState([]);
  useEffect(() => {
    request.get('reviews/meta', { product_id: product.id })
      .then((metadata) => {
        setReviewsMeta(metadata.data);
        setFilteredContext([]);
      })
      .catch((err) => new Error(err));
  }, [product]);
  return (
    <article
      id="review-widget"
      onClick={event => props.spy(event, 'Reviews')}
    >
      <header>RATINGS &amp; REVIEWS</header>
      <div id="reviews-ratings-container">
        <div id="ratings-container">
          {reviewsMeta.ratings
          && (
          <FilterContext.Provider value={[filteredContext, setFilteredContext]}>
            <RatingsBreakdown ratings={reviewsMeta.ratings} />
          </FilterContext.Provider>
          )}
          {!!reviewsMeta.recommended
          && (
          <div className="recommend-summary">
            {`${getRecommendedAvg(reviewsMeta.recommended)}% of reviews recommend this product`}
          </div>
          )}
          {reviewsMeta.characteristics
          && <ProductBreakdown characteristics={reviewsMeta.characteristics} />}
        </div>
        <div id="reviews-container">
          <FilterContext.Provider value={[filteredContext, setFilteredContext]}>
            <ReviewsList product={product} characteristics={reviewsMeta.characteristics} />
          </FilterContext.Provider>
        </div>
      </div>
    </article>
  );
};

export default ReviewContainer;
