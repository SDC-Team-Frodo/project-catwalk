import React from 'react';

const CharLabels = ({ char }) => {
  const labels = ['Size', 'Width', 'Length'].includes(char) ? ['Too small', 'Perfect', 'Too big'] : ['Poor', 'Great'];
  return (
    <div className="char-labels">
      {labels.map((label) => (<div key={label}>{label}</div>))}
    </div>
  );
};

export default CharLabels;
