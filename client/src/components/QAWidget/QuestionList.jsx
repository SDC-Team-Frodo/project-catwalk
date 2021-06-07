import React, { useState, useEffect } from 'react';
import Question from './Question';

function QuestionList(props) {
  const { data } = props;
  const [displayedQuestions, setDisplayedQuestions] = useState(4);
  const [questions, setQuestions] = useState(data);

  return (
    <div className="QuestionList">
      {questions.map((question, i) => {
        return <Question key={i} question={question}/>
      })}
    </div>
  );
}

export default QuestionList;