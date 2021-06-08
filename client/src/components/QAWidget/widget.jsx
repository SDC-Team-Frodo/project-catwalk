import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList';
import mockData from './mockData';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';

const QaContainer = (props) => {
  const [questions, setQuestions] = useState(mockData.results);
  const product = useContext(ProductContext);
  console.log(product.id);

  useEffect(() => {
    console.log(axios.get('/api/', {
      endpoint: 'qa/questions',
      params: {
        product_id: 17071,
      },
    }));// .then((data) => {
    //   setQuestions(data.results);
    // }).catch((err) => console.error(err));
  });
  return <QuestionList data={questions} />;
};

export default QaContainer;
// Testign the pull request
// Another one
