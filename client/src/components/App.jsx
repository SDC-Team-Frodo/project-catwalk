import React, { useContext, createContext, Provider } from 'react';
import QaContainer from './QAWidget/widget';
import OverviewContainer from './Overview/widget';
import ReviewsContainer from './ReviewsWidget/widget';
import RelatedContainer from './RelatedWidget/widget';
import RatingContext from '../contexts/RatingContext';
import ProductContext from '../contexts/ProductContext';
import ThemeContext from '../contexts/ThemeContext';
import testData from '../testData';
import '../style.sass';


const App = () => {

  return (
    <main>
      <ThemeContext.Provider value="light">
        <ProductContext.Provider value={testData}>
          <RatingContext.Provider value="3.5">
            <OverviewContainer />
          </RatingContext.Provider>
          <RelatedContainer />
          <QaContainer />
          <RatingContext.Provider value="3.5">
            <ReviewsContainer />
          </RatingContext.Provider>
        </ProductContext.Provider>
      </ThemeContext.Provider>
    </main>
  );
};

export default App;
