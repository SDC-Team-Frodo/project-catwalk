import React, { useState, useEffect, useContext } from 'react';
import Answer from './Answer';
import Modal from '../Modal';
import AnswerForm from './AnswerForm';
import ProductContext from '../../contexts/ProductContext';

const Question = (props) => {
  const { question } = props;
  const product = useContext(ProductContext);
  const [displayedAnswers, setDisplayedAnswers] = useState(2);
  const [answers, setAnswers] = useState(
    Object.values(question.answers).slice(0, displayedAnswers),
  );
  const [buttonLabel, setButtonLabel] = useState('More Answers');

  useEffect(() => {
    if (displayedAnswers === 'all') {
      setAnswers(Object.values(question.answers));
      setButtonLabel('Collapse Answers');
    } else {
      setAnswers(Object.values(question.answers).slice(0, 2));
      setButtonLabel('More Answers');
    }
  }, [displayedAnswers]);

  useEffect(() => {
    setAnswers(Object.values(question.answers).slice(0, 2));
  }, [question]);

  useEffect(() => {
    if (answers.length === question.answers.length) {
      setButtonLabel(false);
    }
  }, [answers]);

  return (
    <div className="question">
      <h2 className="QuestionText">
        {`Q: ${question.question_body}`}
        <div id="helpfulQ">
          Helpful?
          <button type="button" className="yesButton">
            {`Yes(${question.question_helpfulness})`}
          </button>
          |
          <Modal
            header={(
              <div id="AnswerHeader" className="modalHeader">
                <h1>Submit your Answer</h1>
                <h2>{product.name}</h2>
                <h2>
                  {'Question:   '}
                  {question.question_body}
                </h2>
              </div>
            )}
            body={<AnswerForm modalOff={() => {}} question_id={question.question_id} />}
            btnName="Add Answer"
            btnId="addAnswer"

          />
        </div>
      </h2>
      <div>
        {answers.map((answer, i) => <Answer index={i} answer={answer} key={i} />)}
      </div>
      {Object.values(question.answers).length > 2 && (
        <button
          type="button"
          id="loadA"
          className="hoverGrey"
          onClick={() => {
            buttonLabel === 'More Answers' ? setDisplayedAnswers('all') : setDisplayedAnswers('collapsed');
          }}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default Question;
