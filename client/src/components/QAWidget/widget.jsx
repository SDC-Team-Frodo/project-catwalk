import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList';
import QuestionsContext from '../../contexts/QuestionsContext';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';
import SearchBar from './SearchBar';
import mockData from './mockData';

const QaContainer = (props) => {
  const product = useContext(ProductContext);

  return (
    <div id="QAWidget">
      <QuestionsContext.Provider value={mockData.results}>
        <SearchBar />
      </QuestionsContext.Provider>
    </div>
  );
};

export default QaContainer;
// Testign the pull request
// Another one
