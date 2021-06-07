import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import mockData from './mockData';

const QaContainer = (props) => {
  const [questions, setQuestions] = useState(mockData.results);
  return (
    <QuestionList data={questions} />
  );
};

export default QaContainer;
// Testign the pull request
// Another one
