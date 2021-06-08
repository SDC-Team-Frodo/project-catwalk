import React, { useState, useEffect, useContext } from 'react';
import QuestionList from './QuestionList';
import mockData from './mockData';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';

const QaContainer = (props) => {
  const [questions, setQuestions] = useState(mockData.results);
  const product = useContext(ProductContext);
  console.log(product.id);

  useEffect(() => {
    request.get('qa/questions', {
      product_id: 17071,
    }).then((data) => {
      setQuestions(data.results);
    }).catch((err) => console.error(err));
  });
  return (
      <QuestionList data={questions} />
  );
};

export default QaContainer;
//Testign the pull request
//Another one
