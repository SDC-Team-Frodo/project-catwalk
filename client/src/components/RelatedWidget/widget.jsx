import React from 'react';
import OutfitList from './outfitList';
import RelatedList from './relatedList';

const RelatedContainer = (props) => (
  <>
    <div onClick={event => props.spy(event, 'Related Products')}><p>RELATED PRODUCTS</p></div>
    <RelatedList />
    <div onClick={event => props.spy(event, 'Your Outfit')}><p>YOUR OUTFIT</p></div>
    <OutfitList />
  </>
);

export default RelatedContainer;
