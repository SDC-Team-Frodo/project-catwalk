import React, { useState, useEffect, useContext } from 'react';
import RelatedCard from './relatedCard';
import relatedSamples from './relatedSamples'; // delete later

const RelatedList = function() {
  return (
    <div id="related">
      {relatedSamples.map((relatedProduct, index) => <RelatedCard product={relatedProduct} thumbnail={stylesSamples[index].photos[0].thumbnail_url} key={relatedProduct.id} />)}
    </div>
  )
}

export default RelatedList;
