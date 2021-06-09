import React, { useState, useEffect } from 'react';
import Answer from './Answer';

const Question = (props) => {
  const { question } = props;
  const [displayedAnswers, setDisplayedAnswers] = useState(2);
  const [answers, setAnswers] = useState(
    Object.values(question.answers).slice(0, displayedAnswers),
  );
  const [buttonLabel, setButtonLabel] = useState('More Answers');

  useEffect(() => {
    if (Object.values(question.answers)[displayedAnswers - 2] !== undefined) {
      setAnswers(Object.values(question.answers).slice(0, displayedAnswers));
    } else {
      setButtonLabel('No More Answers');
    }
  }, [displayedAnswers]);

  useEffect(() => {
    setAnswers(Object.values(question.answers).slice(0, displayedAnswers));
  }, [question]);

  return (
    <div className="question">
      <h2>
        {`Q: ${question.question_body}`}
        <span className="helpful">
          {`Helpful? Yes(${question.question_helpfulness})`}
        </span>
      </h2>
      <div>
        {answers.map((answer, i) => <Answer index={i} answer={answer} key={i} />)}
      </div>
      <button
        type="button"
        id="loadA"
        className="hoverGrey"
        onClick={() => {
          setDisplayedAnswers(displayedAnswers + 2);
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default Question;
