import React from 'react';
import QaContainer from './QAWidget/widget.jsx';
import OverviewContainer from './Overview/widget.jsx';
import ReviewsContainer from './ReviewsWidget/widget.jsx';
import RelatedContainer from './RelatedWidget/widget.jsx';

var App = () => (
  <>
    <OverviewContainer />
    <RelatedContainer />
    <QaContainer />
    <ReviewsContainer />
  </>
);

export default App;