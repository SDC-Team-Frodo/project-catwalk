import React/* , { useState, useEffect, useContext } */ from 'react';
import CharBar from './CharBar';
import CharLabels from './CharLabels';

const ProductBreakdown = ({ characteristics }) => (
  <div>
    <ul className="char-bars">
      {Object.keys(characteristics).map((char) => (
        <div key={characteristics[char].id}>
          <div>{char}</div>
          <CharBar char={char} />
          <div>
            <i className="fas fa-caret-up" style={{ left: `${Math.round((characteristics[char].value / 5) * 100)}%` }} />
          </div>
          <CharLabels char={char} />
        </div>
      ))}
    </ul>
  </div>
);

export default ProductBreakdown;
