import React, { useState, useEffect } from 'react';
import Question from './Question';

function QuestionList(props) {
  const { data } = props;
  const [displayedQuestions, setDisplayedQuestions] = useState(4);
  const [questions, setQuestions] = useState(data.slice(0, displayedQuestions));
  const [buttonLabel, setButtonLabel] = useState('More Questions');

  useEffect(() => {
    if (data[displayedQuestions - 2] !== undefined) {
      setQuestions(data.slice(0, displayedQuestions));
    } else {
      setButtonLabel('No More Questions');
    }
  }, [displayedQuestions]);

  return (
    <div className="QuestionList">
      {questions.map((question, i) => {
        return <Question key={i} question={question}/>
      })}
      <button id="loadQ" onClick={() => { setDisplayedQuestions(displayedQuestions + 2) }}>{buttonLabel}</button>
    </div>
  );
}

export default QuestionList;