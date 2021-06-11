import React, { useState, useEffect, useContext } from 'react';
import Question from './Question';
import organize from './organize';
import QuestionsContext from '../../contexts/QuestionsContext';

function QuestionList() {
  const data = useContext(QuestionsContext);
  const [allQuestions, setAllQuestions] = useState(organize(JSON.parse(data), 'question_helpfulness'));
  const [displayedQuestions, setDisplayedQuestions] = useState(4);
  const [questions, setQuestions] = useState(allQuestions.slice(0, displayedQuestions));
  const [buttonDisplay, setButtonDisplay] = useState(true);

  useEffect(() => {
    setAllQuestions(organize(JSON.parse(data), 'question_helpfulness'));
  }, [data]);

  useEffect(() => {
    setQuestions(allQuestions.slice(0, displayedQuestions));
  }, [allQuestions, displayedQuestions]);

  useEffect(() => {
    if (allQuestions[displayedQuestions - 2] !== undefined) {
      setQuestions(allQuestions.slice(0, displayedQuestions));
    }
  }, [displayedQuestions]);

  useEffect(() => {
    if (questions.length === allQuestions.length) {
      setButtonDisplay(false);
    }
  }, [questions]);

  return (
    <div className="QuestionList">
      {/* eslint-disable-next-line react/no-array-index-key */}
      {questions.map((question, i) => <Question key={i} question={question} />)}
      {buttonDisplay && (
        <button
          type="button"
          id="loadQ"
          className="hoverGrey"
          onClick={() => {
            setDisplayedQuestions(displayedQuestions + 2);
          }}
        >
          More Questions
        </button>
      )}
    </div>
  );
}

export default QuestionList;
