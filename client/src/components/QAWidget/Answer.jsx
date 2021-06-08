import React from 'react';

const Answer = (props) => {
  const { answer, index } = props;
  return (
    <div>
      <h2>
        {index === 0 &&(
          'A: '
        )}
        {answer.body}
      </h2>
      <h4>
        {`by ${answer.answerer_name},${'1/2/3'}   |
         Helpful? Yes(${answer.helpfulness})   |
         Report
        `}
      </h4>
    </div>
  );
};

export default Answer;
