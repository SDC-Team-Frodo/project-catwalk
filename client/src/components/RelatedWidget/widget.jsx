import React, { useState, useEffect, useContext } from 'react';
import OutfitList from './outfitList';
import RelatedList from './relatedList';

const RelatedContainer = () => {
  // const product = useContext(ProductContext);
  // get features from product context for modal window
  // send API calls for each related product to get category, name, default_price, and features
  // send to send API calls for each related product to get star rating
  // send API calls for each outfit to get category, name, default_price
  // send to send API calls for each outfit to get star rating
  return (
    <>
      <div><p>RELATED PRODUCTS</p></div>
      <RelatedList />
      <div><p>YOUR OUTFIT</p></div>
      <OutfitList />
    </>
  );
};

export default RelatedContainer;
