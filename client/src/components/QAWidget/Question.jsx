import React, { useState, useEffect } from 'react';
import Answer from './Answer';

const Question = (props) => {
  const { question } = props;
  const [displayedAnswers, setDisplayedAnswers] = useState(2);
  const [answers, setAnswers] = useState(
    Object.values(question.answers).slice(0, displayedAnswers),
  );
  const [buttonDisplay, setButtonDisplay] = useState(true);

  useEffect(() => {
    if (Object.values(question.answers)[displayedAnswers - 2] !== undefined) {
      setAnswers(Object.values(question.answers).slice(0, displayedAnswers));
    } else {
      setButtonDisplay(false);
    }
  }, [displayedAnswers]);

  useEffect(() => {
    setAnswers(Object.values(question.answers).slice(0, displayedAnswers));
  }, [question]);

  useEffect(() => {
    if (answers.length === question.answers.length) {
      setButtonDisplay(false);
    }
  }, [answers]);

  return (
    <div className="question">
      <h2>
        {`Q: ${question.question_body}`}
        <div id="helpfulQ">
          Helpful?
          <button type="button" className="yesButton">
            {`Yes(${question.question_helpfulness})`}
          </button>
          |
          <button type="button" className="reportButton">
            Add Answer
          </button>
        </div>
      </h2>
      <div>
        {answers.map((answer, i) => <Answer index={i} answer={answer} key={i} />)}
      </div>
      {buttonDisplay && (
        <button
          type="button"
          id="loadA"
          className="hoverGrey"
          onClick={() => {
            setDisplayedAnswers(displayedAnswers + 2);
          }}
        >
          More Answers
        </button>
      )}
    </div>
  );
};

export default Question;
