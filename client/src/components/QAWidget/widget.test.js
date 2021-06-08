import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QaContainer from './widget';
import SearchBar from './components/SearchBar';
import QuestionList from './components/SearchBar';

describe('QA component', () => {
  beforeAll(() => {
    render(<QaContainer />);
  });

  // Need a test for making sure that the title is rendering


  afterAll(cleanup);
});

describe('SearchBar component', () => {
  beforeAll(() => {
    render(<SearchBar />)
  });

  // upon clicking the search button the questions list should rerender


  afterAll(cleanup);
})

describe('QuestionList component', () => {
  beforeAll(() => {
    render(<QuestionList />)
  });

  // Questions should be rendered in order from most helpful to least helpful


  afterAll(cleanup);
})
