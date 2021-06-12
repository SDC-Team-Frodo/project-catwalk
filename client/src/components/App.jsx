/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useContext, createContext, Provider } from 'react';
import QaContainer from './QAWidget/widget';
import OverviewContainer from './Overview/widget';
import ReviewsContainer from './ReviewsWidget/widget';
import RelatedContainer from './RelatedWidget/widget';
import QALoadContext from '../contexts/QALoadContext';
import RatingContext from '../contexts/RatingContext';
import ReviewContext from '../contexts/ReviewContext';

import ProductContext from '../contexts/ProductContext';
import ThemeContext from '../contexts/ThemeContext';
import testData from '../testData';
import request from '../requests';
import '../style.sass';

const App = () => {
  const [currentProductId, setCurrentProductId] = useState(17071);
  const [currentProductData, setCurrentProductData] = useState(testData);
  const [idInput, setIdInput] = useState('');
  const [averageRating, setAverageRating] = useState(null);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    request.get(`products/${currentProductId}`, {
      product_id: currentProductId,
    }).then((res) => {
      setCurrentProductData(res.data);
    }).catch((err) => {
      console.error(err);
      alert('The product couldn\'t load');
    });
  }, [currentProductId]);
  return (
    <main>
      <div id="nav">
        <input
          type="text"
          placeholder="Product Id"
          value={idInput}
          onChange={(e) => {
            setIdInput(e.target.value);
          }}
        />
        <button
          value="search"
          type="button"
          id="changeId"
          onClick={() => {
            setCurrentProductId(idInput);
          }}
        >
          Change Products
        </button>
      </div>
      <ThemeContext.Provider value="light">
        <ProductContext.Provider value={currentProductData}>
          <ReviewContext.Provider value={[allReviews, setAllReviews]}>
            <RatingContext.Provider value={[averageRating, setAverageRating]}>
              <OverviewContainer />
            </RatingContext.Provider>
          </ReviewContext.Provider>
          <RelatedContainer />
          <QALoadContext.Provider value={() => {}}>
            <QaContainer />
          </QALoadContext.Provider>
          <ReviewContext.Provider value={[allReviews, setAllReviews]}>
            <RatingContext.Provider value={[averageRating, setAverageRating]}>
              <ReviewsContainer />
            </RatingContext.Provider>
          </ReviewContext.Provider>
        </ProductContext.Provider>
      </ThemeContext.Provider>
    </main>
  );
};

export default App;
