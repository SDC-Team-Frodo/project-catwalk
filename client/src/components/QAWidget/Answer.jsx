import React from 'react';

const Answer = (props) => {
  const { answer } = props;
  return (
    <h3>{`A: ${answer.body}`}</h3>
  );
};

export default Answer;
