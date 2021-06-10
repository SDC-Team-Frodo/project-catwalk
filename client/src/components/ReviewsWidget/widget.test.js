import React from 'react';
import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReviewContainer from './widget';
import ProductBreakdown from './ProductBreakdown';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
import reviewData from './testReviewData';
import reviewMetadata from './testReviewMetadata';

describe('Review component', () => {
  beforeAll(() => {
    render(<ReviewContainer />);
  });

  test('should have the correct subsection title', () => {
    expect(screen.getByText('RATINGS & REVIEWS')).toBeInTheDocument();
  });

  afterAll(cleanup);
});

describe('Ratings Breakdown', () => {
  beforeAll(() => {
    render(<RatingsBreakdown ratings={reviewMetadata.ratings}/>);
  });

  test('should have all 5 ratings bars', () => {
    expect(screen.getByText('5 stars')).toBeInTheDocument();
    expect(screen.getByText('4 stars')).toBeInTheDocument();
    expect(screen.getByText('3 stars')).toBeInTheDocument();
    expect(screen.getByText('2 stars')).toBeInTheDocument();
    expect(screen.getByText('1 stars')).toBeInTheDocument();
  });

  afterAll(cleanup);
});

describe('Product Breakdown', () => {
  beforeAll(() => {
    render(<ProductBreakdown />);
  });

  test('should have the correct product breakdown text', () => {
    expect(screen.getByText('Some other bars go here')).toBeInTheDocument();
  });

  afterAll(cleanup);
});


describe('Reviews List', () => {
  beforeAll(() => {
    render(<ReviewsList reviews={reviewData.results}/>);
  });

  test('Write a review button is always in the document', () => {
    let writeReviewButton = screen.queryByText('WRITE A REVIEW');
    expect(writeReviewButton).toBeInTheDocument();
    fireEvent.click(writeReviewButton);
    writeReviewButton = screen.queryByText('WRITE A REVIEW');
    expect(writeReviewButton).toBeInTheDocument();
  });

  xtest('More reviews button changes reviews shown after click', () => {
    const moreReviewsButton = screen.queryByText('More Reviews');
    let reviews = screen.getByText('Helpful?');
    expect(reviews).toEqual(2);
    fireEvent.click(moreReviewsButton);
    reviews = screen.getByRole('ul').children;
    expect(reviews.length).toEqual(4);
    fireEvent.click(moreReviewsButton);
    reviews = screen.getByRole('ul').children;
    expect(reviews.length).toEqual(5);
  });

  xtest('More reviews button disappears when there are no more reviews to display', () => {
    let moreReviewsButton = screen.queryByText('More Reviews');
    expect(moreReviewsButton).toBeInTheDocument();
    fireEvent.click(moreReviewsButton);
    fireEvent.click(moreReviewsButton);
    moreReviewsButton = screen.queryByText('More Reviews');
    expect(moreReviewsButton).not.toBeInTheDocument();
  });

  afterAll(cleanup);
});

describe('Review Form', () => {
  beforeAll(() => {
    render(<ReviewForm />);
  });

  test('should have the correct review form text', () => {
    expect(screen.getByText('A form modal will go here')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
