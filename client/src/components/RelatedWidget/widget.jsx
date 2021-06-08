import React, { useState, useEffect, useContext } from 'react';
import OutfitList from './outfitList';
import RelatedList from './relatedList';
import './relatedStyles.sass';

const RelatedContainer = () => {
  // const product = useContext(ProductContext);
  // send API call for product to get features for modal window
  // send API calls for each related product to get category, name, default_price, and features
  // send to send API calls for each related product to get star rating
  // send API calls for each outfit to get category, name, default_price
  // send to send API calls for each outfit to get star rating
  return (
    <>
      <RelatedList />
      <OutfitList />
    </>
  );
};

export default RelatedContainer;
