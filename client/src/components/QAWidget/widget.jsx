import React, { useState, useEffect, useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';
import SearchBar from './SearchBar';
import mockData from './mockData';
import Modal from '../Modal';
import QuestionForm from './QuestionForm';

const QaContainer = () => {
  const product = useContext(ProductContext);
  const [data, setData] = useState(mockData);

  useEffect(() => {
    request.get('qa/questions', {
      product_id: 17078,
    }).then((newData) => {
      setData(newData.data);
    }).catch((err) => console.error(err));
  }, [product]);

  return (
    <div id="QAWidget">
      <h1 id="QATitle" data-testid="QAtitle" className="title">Questions And Answers</h1>
      <QuestionsContext.Provider value={data.results}>
        <SearchBar />
        <Modal
          modalId="QuestionFormModal"
          header={(
            <div id="modalHeader">
              <h1>Ask Your Question</h1>
              <h3>About The Product</h3>
            </div>
          )}
          body={<QuestionForm />}
          btnName="Ask Question"
          btnId="QButton"
        />
      </QuestionsContext.Provider>
    </div>
  );
};

export default QaContainer;
// Testign the pull request
// Another one
