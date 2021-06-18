import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RelatedContainer from './widget';

describe('Related component', () => {
  beforeAll(() => {
    render(<RelatedContainer />);
  });

  it('should have the right message in the dom', () => {
    const message = 'RELATED PRODUCTS';

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  afterAll(cleanup);
});
