import React, { useState, useEffect, useContext } from 'react';
import RelatedCard from './relatedCard';
import relatedSamples from './relatedSamples'; // delete later
import stylesSamples from './stylesSamples'; // delete later

// eslint-disable-next-line func-names
const RelatedList = function (props) {
  return (
    <div id="related" >
      <button type="button" className="carousel_button previous" id="previous">&#60;</button>
      <div className="carousel" id="relatedList">
        {relatedSamples.map((relatedProduct, index) => <RelatedCard product={relatedProduct} thumbnail={stylesSamples[index].photos[0].thumbnail_url} key={relatedProduct.id} />)}
      </div>
      <button type="button" className="carousel_button next" id="next">&#62;</button>
    </div>
  );
};

export default RelatedList;
