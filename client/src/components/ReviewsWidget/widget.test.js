import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReviewContainer from './widget';

describe('Review component', () => {
  beforeAll(() => {
    render(<ReviewContainer />);
  });

  it('should have the right subsection title', () => {
    expect(screen.getByText('RATINGS & REVIEWS')).toBeInTheDocument();
  });

  afterAll(cleanup);
});
