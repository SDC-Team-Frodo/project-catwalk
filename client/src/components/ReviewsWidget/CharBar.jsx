import React from 'react';

const CharBar = ({ char }) => {
  const barFormat = ['Size', 'Width', 'Length'].includes(char) ? [26, 46, 26] : [33, 32, 33];
  return (
    <li className="char-bar">
      <div className="char-container" style={{ width: `${barFormat[0]}%` }} />
      <div className="char-container" style={{ width: `${barFormat[1]}%` }} />
      <div className="char-container" style={{ width: `${barFormat[2]}%` }} />
    </li>
  );
};

export default CharBar;
