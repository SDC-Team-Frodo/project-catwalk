import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReviewContainer from './widget';

describe('Review component', () => {
  beforeAll(() => {
    render(<ReviewContainer />);
  });

  it('should have the right message in the dom', () => {
    const message = 'this is Review';

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  afterAll(cleanup);
});
