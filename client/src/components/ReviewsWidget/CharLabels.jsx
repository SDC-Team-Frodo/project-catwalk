import React from 'react';

const CharLabels = ({ char }) => {
  const labels2 = {
    Size: ['Too small', 'Perfect', 'Too big'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Length: ['Too short', 'Too long'],
    Fit: ['Too tight', 'Perfect', 'Too long'],
    Comfort: ['Poor', 'Great'],
    Quality: ['Poor', 'Great'],
  };
  return (
    <div className="char-labels">
      {labels2[char].map((label) => (<div key={label}>{label}</div>))}
    </div>
  );
};

export default CharLabels;
