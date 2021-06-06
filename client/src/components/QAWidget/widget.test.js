import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QaContainer from './widget';

describe('QA component', () => {
  beforeAll(() => {
    render(<QaContainer />);
  });

  it('should have the right message in the dom', () => {
    const message = 'this is the QA';

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  afterAll(cleanup);
});
