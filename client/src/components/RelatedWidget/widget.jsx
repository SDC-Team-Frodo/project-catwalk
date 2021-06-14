import React from 'react';
import OutfitList from './outfitList';
import RelatedList from './relatedList';

const RelatedContainer = () => (
  <>
    <div><p>RELATED PRODUCTS</p></div>
    <RelatedList />
    <div><p>YOUR OUTFIT</p></div>
    <OutfitList />
  </>
);

export default RelatedContainer;
