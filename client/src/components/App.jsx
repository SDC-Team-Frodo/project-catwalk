/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useContext, createContext, Provider } from 'react';
import QaContainer from './QAWidget/widget';
import OverviewContainer from './Overview/widget';
import ReviewsContainer from './ReviewsWidget/widget';
import Browse from './Browse/BrowsePage';
import RelatedContainer from './RelatedWidget/widget';
import QALoadContext from '../contexts/QALoadContext';
import RatingContext from '../contexts/RatingContext';
import ReviewContext from '../contexts/ReviewContext';

import ProductContext from '../contexts/ProductContext';
import ProductIdContext from '../contexts/ProductIdContext';
import ThemeContext from '../contexts/ThemeContext';
import testData from '../testData';
import request from '../requests';
import '../style.sass';

const App = () => {
  const [browse, setBrowse] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(17071);
  const [currentProductData, setCurrentProductData] = useState(testData);
  const [idInput, setIdInput] = useState('');
  const [averageRating, setAverageRating] = useState(null);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    setBrowse(false);
    request.get(`products/${currentProductId}`, {
      product_id: currentProductId,
    }).then((res) => {
      setCurrentProductData(res.data);
    }).catch((err) => {
      console.error(err);
      alert('The product couldn\'t load');
    });
  }, [currentProductId]);
  if (!browse) {
    return (
      <main>
        <div id="nav">
          <input
            type="text"
            placeholder="17067 -- 18077"
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
              if (Number(idInput) >= 17067 && Number(idInput) <= 18077) {
                setCurrentProductId(idInput);
              } else {
                setIdInput("Not Valid");
              }
            }}
          >
            Change Product
          </button>
          <button
            value="Browse"
            type="button"
            id="browse"
            onClick={() => {
              setBrowse(true);
            }}
          >
            Browse Products
          </button>
        </div>
        <ThemeContext.Provider value="light">
          <ProductContext.Provider value={currentProductData}>
            <ReviewContext.Provider value={[allReviews, setAllReviews]}>
              <RatingContext.Provider value={[averageRating, setAverageRating]}>
                <OverviewContainer />
              </RatingContext.Provider>
            </ReviewContext.Provider>
          <ProductIdContext.Provider value={[currentProductId, setCurrentProductId]}>
            <RelatedContainer />
          </ProductIdContext.Provider>
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
  }
  return <Browse setProduct={setCurrentProductId} />;
};

export default App;
