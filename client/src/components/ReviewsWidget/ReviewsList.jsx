import React, { useState, useEffect, useContext } from 'react';
import FilterContext from './FilterContext';
import ReviewContext from '../../contexts/ReviewContext';
import ReviewTile from './ReviewTile';
import ReviewForm from './ReviewForm';
import Modal from '../Modal';
import request from '../../requests';

const ReviewsList = ({ product, characteristics }) => {
  const [allReviews, setAllReviews] = useContext(ReviewContext);
  const [reviews, setReviews] = useState([]);
  const [reviewsShown, setReviewsShown] = useState(2);
  const [sortOrder, setSortOrder] = useState('relevant');
  const [filteredContext, setFilteredContext] = useContext(FilterContext);
  useEffect(() => {
    request.get('reviews', { product_id: product.id, count: 500 })
      .then((data) => {
        setAllReviews(data.data.results);
        setReviews(data.data.results);
      })
      .catch((err) => new Error(err));
  }, [product]);
  useEffect(() => {
    request.get('reviews', { product_id: product.id, count: 500, sort: sortOrder })
      .then((data) => {
        setAllReviews(data.data.results);
        setFilteredContext([...filteredContext]);
      })
      .catch((err) => new Error(err));
  }, [sortOrder]);
  useEffect(() => {
    if (filteredContext.length) {
      setReviews(allReviews.filter((review) => (
        filteredContext.includes(review.rating)
      )));
    } else {
      setReviews(allReviews);
    }
  }, [filteredContext]);
  return (
    <section id="reviews">
      <h4>REVIEWS</h4>
      <div className="reviews-count">
        {`${reviews.length} reviews, sorted by `}
        <select onChange={(e) => setSortOrder(() => e.target.value)}>
          <option value="relevant">relevance</option>
          <option value="newest">newest</option>
          <option value="helpful">helpful</option>
        </select>
      </div>
      {!reviews.length && <p className="empty-reviews">No reviews currently available for this product</p>}
      <ul className="review-tiles">
        {reviews.slice(0, reviewsShown).map((review) => (
          <ReviewTile key={review.review_id} review={review} />
        ))}
      </ul>
      <div className="review-buttons">
        {reviewsShown + 1 <= reviews.length && <button type="button" onClick={() => setReviewsShown((numReviews) => numReviews + 2)}>MORE REVIEWS</button>}
        <Modal
          modalId="review-modal"
          header={(
            <div className="modalHeader">
              <h3>Write Your Review</h3>
              <h4>
                {`About the ${product.name}`}
              </h4>
            </div>
          )}
          body={<ReviewForm product={product} characteristics={characteristics} />}
          btnName="WRITE A REVIEW"
          btnPlus={<i className="fas fa-plus" />}
          btnId="new-review"
        />
      </div>
    </section>
  );
};

export default ReviewsList;
