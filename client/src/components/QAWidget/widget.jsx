/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';
import QALoadContext from '../../contexts/QALoadContext';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';
import SearchBar from './SearchBar';
import Modal from '../Modal';
import QuestionForm from './QuestionForm';

const QaContainer = (props) => {
  const product = useContext(ProductContext);
  const [data, setData] = useState({ results: [] });

  const load = () => {
    request.get('qa/questions', {
      product_id: product.id,
      count: 100,
    }).then((newData) => {
      setData(newData.data);
    }).catch((err) => console.error(err));
  };

  useEffect(() => {
    load();
  }, [product]);

  return (
    <div id="QAWidget" onClick={(event) => props.spy(event, 'Q&A')}>
      <header id="QATitle" data-testid="QAtitle" className="title">
        QUESTIONS
        &
        ANSWERS
      </header>
      <QALoadContext.Provider value={load}>
        <QuestionsContext.Provider value={data.results}>
          <SearchBar />
          <Modal
            modalId="QuestionFormModal"
            header={(
              <div className="modalHeader">
                <h1>Ask Your Question</h1>
                <h3>{product.name}</h3>
              </div>
            )}
            body={<QuestionForm />}
            btnName="Ask Question"
            btnId="QButton"
          />
        </QuestionsContext.Provider>
      </QALoadContext.Provider>
    </div>
  );
};

export default QaContainer;
