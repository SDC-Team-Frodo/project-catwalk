import React from 'react';
import QaContainer from './QAWidget/widget';
import OverviewContainer from './Overview/widget';
import ReviewsContainer from './ReviewsWidget/widget';
import RelatedContainer from './RelatedWidget/widget';
import '../../dist/style.sass';

const App = () => (
  <>
    <OverviewContainer />
    <RelatedContainer />
    <QaContainer />
    <ReviewsContainer />
  </>
);

export default App;
