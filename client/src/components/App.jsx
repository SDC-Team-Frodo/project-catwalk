import React, { useState } from 'react';
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
  const [averageRating, setAverageRating] = useState(null);
  return (
    <main>
      <ThemeContext.Provider value="light">
        <ProductContext.Provider value={testData}>
          <RatingContext.Provider value={[averageRating, setAverageRating]}>
            <OverviewContainer />
          </RatingContext.Provider>
          <RelatedContainer />
          <QaContainer />
          <RatingContext.Provider value={[averageRating, setAverageRating]}>
            <ReviewsContainer />
          </RatingContext.Provider>
        </ProductContext.Provider>
      </ThemeContext.Provider>
    </main>
  );
};

export default App;
