import React from 'react';
import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RatingContext from '../../contexts/RatingContext';
import FilterContext from './FilterContext';
import ReviewContainer from './widget';
import ProductBreakdown from './ProductBreakdown';
import CharBar from './CharBar';
import CharLabels from './CharLabels';
import RatingsBreakdown from './RatingsBreakdown';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
import reviewData from './testReviewData';
import reviewMetadata from './testReviewMetadata';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <RatingContext.Provider {...providerProps}>{ui}</RatingContext.Provider>,
    renderOptions
  )
}

describe('Review component', () => {
  beforeAll(() => {
    render(<ReviewContainer />);
  });

  test('should have the correct subsection title', () => {
    expect(screen.getByText('RATINGS & REVIEWS')).toBeInTheDocument();
  });

  afterAll(cleanup);
});

xdescribe('Ratings Breakdown', () => {
  beforeAll(() => {
    let averageRating = 3.5;
    const setAverageRating = () => { averageRating = 3.5; };
    // const providerProps = {
    //   value: 3.5,
    // }
    // customRender(<RatingsBreakdown ratings={reviewMetadata.ratings} />, { providerProps })
    render(
      <RatingContext.Provider value={[averageRating, setAverageRating]}>
        <RatingsBreakdown ratings={reviewMetadata.ratings} />
      </RatingContext.Provider>
    )
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
    render(<ProductBreakdown characteristics={reviewMetadata.characteristics} />);
  });

  test('should have the correct subsection header', () => {
    expect(screen.getByText('CHARACTERISTICS')).toBeInTheDocument();
  });

  afterAll(cleanup);
});

describe('Characteristics Bars', () => {
  // beforeAll(() => {
  //   render(<CharBar char={'Size'} />);
  //   render(<CharBar char={'Width'} />);
  //   render(<CharBar char={'Comfort'} />);
  // });

  test('should have all characteristics for given product', () => {
    render(<CharBar char={'Size'} />);
    expect(document.getElementsByClassName('char-container').length).toBe(3);
  });

  test('should have all characteristic bars for given product', () => {
    render(<CharBar char={'Size'} />);
    expect(screen.getByText('Size')).toBeInTheDocument();
    render(<CharBar char={'Width'} />);
    expect(screen.getByText('Width')).toBeInTheDocument();
    render(<CharBar char={'Comfort'} />);
    expect(screen.getByText('Comfort')).toBeInTheDocument();
  });

  afterAll(cleanup);
});

describe('Characteristics Labels', () => {
  beforeAll(() => {
    render(<CharLabels char={'Size'} />);
    render(<CharLabels char={'Comfort'} />);
  });

  test('should have all characteristic labels for a characteristic', () => {
    expect(screen.getByText('Too small')).toBeInTheDocument();
    expect(screen.getByText('Perfect')).toBeInTheDocument();
    expect(screen.getByText('Too big')).toBeInTheDocument();
    expect(screen.getByText('Poor')).toBeInTheDocument();
    expect(screen.getByText('Great')).toBeInTheDocument();
  });

  afterAll(cleanup);
});


xdescribe('Reviews List', () => {
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
