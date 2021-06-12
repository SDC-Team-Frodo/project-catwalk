import React/* , { useState, useEffect, useContext } */ from 'react';
import CharBar from './CharBar';
import CharLabels from './CharLabels';

const ProductBreakdown = ({ characteristics }) => (
  <section id="char-breakdown">
    <h4>CHARACTERISTICS</h4>
    <ul className="char-bars">
      {console.log(characteristics)}
      {Object.keys(characteristics).map((char) => (
        <div key={characteristics[char].id}>
          <CharBar char={char} />
          <div>
            <i className="fas fa-caret-up" style={{ left: `${Math.round((characteristics[char].value / 5) * 100)}%` }} />
          </div>
          <CharLabels char={char} />
        </div>
      ))}
    </ul>
  </section>
);

export default ProductBreakdown;
