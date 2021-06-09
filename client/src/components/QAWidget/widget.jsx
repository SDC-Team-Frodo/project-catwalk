import React, { useState, useEffect, useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';
import SearchBar from './SearchBar';
import mockData from './mockData';

const QaContainer = () => {
  const product = useContext(ProductContext);
  const [data, setData] = useState({ results: {} });

  useEffect(() => {
    request.get('qa/questions', {
      product_id: product.id,
    }).then((newData) => {
      setData(newData.data);
    }).catch((err) => console.error(err));
  }, [product]);

  return (
    <div id="QAWidget">
      <h1 id="QATitle" data-testid="QAtitle" className="title">Questions And Answers</h1>
      <QuestionsContext.Provider value={data.results}>
        <SearchBar />
      </QuestionsContext.Provider>
    </div>
  );
};

export default QaContainer;
// Testign the pull request
// Another one
