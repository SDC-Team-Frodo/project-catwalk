import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OverviewContainer from './widget';

describe('Overview component', () => {
  beforeAll(() => {
    render(<OverviewContainer />);
  });

  it('should have the right message in the dom', () => {
    const message = 'this is the Overview';

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  afterAll(cleanup);
});
