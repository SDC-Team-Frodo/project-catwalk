/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import QaContainer from './QAWidget/widget';
import OverviewContainer from './Overview/widget';
import ReviewsContainer from './ReviewsWidget/widget';
import Browse from './Browse/BrowsePage';
import RelatedContainer from './RelatedWidget/widget';
import QALoadContext from '../contexts/QALoadContext';
import RatingContext from '../contexts/RatingContext';
import ReviewContext from '../contexts/ReviewContext';
import ModalOff from '../contexts/ModalOffContext';
import ProductContext from '../contexts/ProductContext';
import ProductIdContext from '../contexts/ProductIdContext';
import ThemeContext from '../contexts/ThemeContext';
import testData from '../testData';
import logo from './logo';
import request from '../requests';
import '../style.sass';

const App = () => {
  const [browse, setBrowse] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(17071);
  const [theme, setTheme] = useState('light');
  const [currentProductData, setCurrentProductData] = useState(testData);
  const [idInput, setIdInput] = useState('');
  const [averageRating, setAverageRating] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [modalOff, setModalOff] = useState(false);

  const spy = (event, widget) => {
    const { target } = event;
    const element = target.nodeName.toLowerCase();
    const time = Date.now().toString();

    request.post('interactions/', {
      element, widget, time,
    })
      .catch(console.error);
  };

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
  useEffect(() => {
    const app = document.getElementById('app');
    app.className = theme;
  }, [theme])
  if (!browse) {
    return (
      <ThemeContext.Provider value={theme}>
        <main>
          <div id="nav">
            <img x="6" y="2" width="108" height="90" src={logo} />
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
                  setIdInput('Not Valid');
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
            <select id="themeSelect" onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>
          <p id="announcement">
            <i>SITE-WIDE ANNOUNCEMENT MESSAGE!</i>
            <span> — SALE/DISCOUNT </span>
            <b>OFFER</b>
            <span> — </span>
            <u>NEW PRODUCT HIGHLIGHT</u>
          </p>
          <ModalOff.Provider value={{ modalOff, setModalOff }}>
            <ProductContext.Provider value={currentProductData}>
              <ReviewContext.Provider value={[allReviews, setAllReviews]}>
                <RatingContext.Provider value={[averageRating, setAverageRating]}>
                  <OverviewContainer spy={spy} />
                </RatingContext.Provider>
              </ReviewContext.Provider>
              <ProductIdContext.Provider value={[currentProductId, setCurrentProductId]}>
                <RelatedContainer spy={spy} />
              </ProductIdContext.Provider>
              <QALoadContext.Provider value={() => {}}>
                <QaContainer spy={spy} />
              </QALoadContext.Provider>
              <ReviewContext.Provider value={[allReviews, setAllReviews]}>
                <RatingContext.Provider value={[averageRating, setAverageRating]}>
                  <ReviewsContainer spy={spy} />
                </RatingContext.Provider>
              </ReviewContext.Provider>
            </ProductContext.Provider>
          </ModalOff.Provider>
        </main>
      </ThemeContext.Provider>
    );
  }
  return <Browse setProduct={setCurrentProductId} />;
};

export default App;
