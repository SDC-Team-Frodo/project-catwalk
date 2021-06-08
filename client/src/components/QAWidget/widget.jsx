import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList';
import QuestionsContext from '../../contexts/QuestionsContext';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';
import SearchBar from './SearchBar';
import mockData from './mockData';

const QaContainer = () => {
  const product = useContext(ProductContext);

  return (
    <div id="QAWidget">
      <h1 id="QATitle" data-testid="QAtitle" className="title">Questions And Answers</h1>
      <QuestionsContext.Provider value={mockData.results}>
        <SearchBar />
      </QuestionsContext.Provider>
    </div>
  );
};

export default QaContainer;
// Testign the pull request
// Another one
