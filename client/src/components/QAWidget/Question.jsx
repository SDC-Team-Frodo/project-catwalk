/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Answer from './Answer';
import Modal from '../Modal';
import AnswerForm from './AnswerForm';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';

const Question = (props) => {
  const { question } = props;
  const product = useContext(ProductContext);
  const [displayedAnswers, setDisplayedAnswers] = useState(2);
  const [answers, setAnswers] = useState(
    Object.values(question.answers).slice(0, displayedAnswers),
  );
  const [buttonLabel, setButtonLabel] = useState('More Answers');
  const [yesClicked, setYesClicked] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(question.question_helpfulness);

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

  useEffect(() => {
    setHelpfulCount(helpfulCount + 1);
  }, [yesClicked]);

  return (
    <div className="question">
      <h2 className="QuestionText">
        {`Q: ${question.question_body}`}
        <div id="helpfulQ">
          Helpful?
          <button
            type="button"
            className="yesButton"
            onClick={() => {
              request.put(`qa/questions/${question.question_id}/helpful`, {
                question_id: question.question_id,
              }).then((res) => { setYesClicked(true); })
                .catch((err) => {
                  console.error(err);
                  alert('Couldn\'t complete request');
                });
            }}
          >
            {`Yes(${helpfulCount})`}
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
      <div className="AnswerList">
        {answers.map((answer, i) => <Answer index={i} answer={answer} key={i} />)}
      </div>
      {Object.values(question.answers).length > 2 && (
        <button
          type="button"
          id="loadA"
          className="hoverGrey"
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
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
