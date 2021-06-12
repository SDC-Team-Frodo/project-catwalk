import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OverviewContainer from './widget';

xdescribe('Overview component', () => {
  beforeAll(() => {
    render(<OverviewContainer />);
  });

  test('each subcomponent in overview should render inside the dom', () => {
    const subComponents = [
      'gallery', 'gallery-aside',
      'description', 'features'
    ]
    subComponents.forEach(name => {
      const element = document.querySelector(`#${name}`);
      expect(element).toBeInTheDocument();
    })
  });

  afterAll(cleanup);
});

