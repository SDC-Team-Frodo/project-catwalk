import React from 'react';
import Answer from './Answer';

const Question = (props) => {
  const { question } = props;
  return (
    <div>
      <h1>{`Q: ${question["question_body"]}`}</h1>
      {Object.keys(question.answers).map((key, i) => {
        let current = question.answers[key];
        return (
          <Answer answer={current} key={i} />
        );
      })}
    </div>
  );
};

export default Question;
