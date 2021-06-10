import React from 'react';

const CharLabels = ({ char }) => {
  const labels = ['Size', 'Width', 'Length'].includes(char) ? ['Too big', 'Perfect', 'Too small'] : ['Poor', 'Great'];
  return (
    <div className="char-labels">
      {labels.map((label) => (<div>{label}</div>))}
    </div>
  );
};

export default CharLabels;
