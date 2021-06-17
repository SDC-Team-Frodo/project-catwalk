import React, { useState, useEffect, useContext } from 'react';
import FilterContext from './FilterContext';
import ReviewContext from '../../contexts/ReviewContext';
import ReviewTile from './ReviewTile';
import ReviewForm from './ReviewForm';
import Modal from '../Modal';
import request from '../../requests';

const ReviewsList = ({ product, characteristics }) => {
  const [allReviews, setAllReviews] = useContext(ReviewContext);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsShown, setReviewsShown] = useState(2);
  const [sortOrder, setSortOrder] = useState('relevant');
  const [searchText, setSearchText] = useState('');
  const [filteredContext, setFilteredContext] = useContext(FilterContext);
  useEffect(() => {
    request.get('reviews', { product_id: product.id, count: 200 })
      .then((data) => {
        setAllReviews(data.data.results);
        setReviews(data.data.results);
        setReviewCount(data.data.results.length);
      })
      .catch((err) => new Error(err));
  }, [product]);
  useEffect(() => {
    request.get('reviews', { product_id: product.id, count: 200, sort: sortOrder })
      .then((data) => {
        setAllReviews(data.data.results);
        setFilteredContext([...filteredContext]);
      })
      .catch((err) => new Error(err));
  }, [sortOrder]);
  useEffect(() => {
    if (searchText.length > 2) {
      if (filteredContext.length) {
      setReviews(allReviews.filter((review) => (
        filteredContext.includes(review.rating)
        && (review.body.includes(searchText)
        || review.summary.includes(searchText)
        || review.reviewer_name.includes(searchText))
      )));
      } else {
        setReviews(allReviews.filter((review) => (
          review.body.toLowerCase().includes(searchText.toLowerCase())
          || review.summary.toLowerCase().includes(searchText.toLowerCase())
          || review.reviewer_name.toLowerCase().includes(searchText.toLowerCase())
        )));
      }
    } else if (filteredContext.length) {
      setReviews(allReviews.filter((review) => (
        filteredContext.includes(review.rating)
      )));
    } else {
      setReviews(allReviews);
    }
  }, [filteredContext, searchText]);
  useEffect(() => {
    if (allReviews.length && allReviews.length !== reviewCount) {
      request.get('reviews', { product_id: product.id, count: 200, sort: sortOrder })
        .then((data) => {
          setAllReviews(data.data.results);
          if (filteredContext.length) {
            setReviews(allReviews.filter((review) => (
              filteredContext.includes(review.rating)
            )));
          } else {
            setReviews(allReviews);
          }
          setReviewCount(data.data.results.length);
        })
        .catch((err) => new Error(err));
    }
  }, [allReviews]);
  return (
    <section id="reviews">
      <h4>REVIEWS</h4>
      <input
        type="text"
        className="reviews-search"
        name="reviews-search"
        placeholder="Search for a review"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <i className="fa fa-search" aria-hidden="true" />
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
          <ReviewTile
            key={review.review_id}
            review={review}
            searchText={searchText}
          />
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
