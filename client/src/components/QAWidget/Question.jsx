import React, { useState, useEffect } from 'react';
import Answer from './Answer';


const Question = (props) => {
  const { question } = props;
  const allAnswers = Object.values(question.answers);
  const [displayedAnswers, setDisplayedAnswers] = useState(2);
  const [answers, setAnswers] = useState(allAnswers.slice(0, displayedAnswers));
  const [buttonLabel, setButtonLabel] = useState('More Answers');

  useEffect(() => {
    if (allAnswers[displayedAnswers - 2] !== undefined) {
      setAnswers(allAnswers.slice(0, displayedAnswers));
    } else {
      setButtonLabel('No More Answers');
    }
  }, [displayedAnswers]);
  return (
    <div>
      <h1>{`Q: ${question.question_body} Helpfulness: ${question.question_helpfulness}`}</h1>
      {answers.map((answer, i) => {
        return (
          <Answer answer={answer} key={i} />
        );
      })}
      <button id="loadA" onClick={
        () => {
          setDisplayedAnswers(displayedAnswers + 2)
        }
      }>{buttonLabel}</button>
    </div>
  );
};

export default Question;
