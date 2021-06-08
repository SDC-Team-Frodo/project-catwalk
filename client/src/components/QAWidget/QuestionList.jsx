import React, { useState, useEffect } from 'react';
import Question from './Question';
import organize from './organize';

function QuestionList(props) {
  const { data } = props;
  const [allQuestions] = useState(organize(data, "question_helpfulness"));
  const [displayedQuestions, setDisplayedQuestions] = useState(4);
  const [questions, setQuestions] = useState(allQuestions.slice(0, displayedQuestions));
  const [buttonLabel, setButtonLabel] = useState('More Questions');

  useEffect(() => {
    if (allQuestions[displayedQuestions - 2] !== undefined) {
      setQuestions(allQuestions.slice(0, displayedQuestions));
    } else {
      setButtonLabel('No More Questions');
    }
  }, [displayedQuestions]);

  return (
    <div className="QuestionList">
      {questions.map((question, i) => {
        return <Question key={i} question={question}/>
      })}
      <button
        type="button"
        id="loadQ"
        onClick={() => {
          setDisplayedQuestions(displayedQuestions + 2)
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default QuestionList;