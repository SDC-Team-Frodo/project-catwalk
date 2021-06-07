import React, { useState, useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import RatingContext from '../../contexts/RatingContext';
import ProductContext from '../../contexts/ProductContext';

// pull request test 2
console.log(ThemeContext);


const OverviewContainer = (props) => {
  const theme = useContext(ThemeContext);
  const rating = useContext(RatingContext);
  const product = useContext(ProductContext);

  let [obj, setObj] = useState({a: 1, b: 2});

  return (
    <div id="Overview">
      <h1 onClick={() => setObj(
        {theme, rating, product}
      )}>{JSON.stringify(obj)}</h1>
    </div>
  )
};

export default OverviewContainer;
