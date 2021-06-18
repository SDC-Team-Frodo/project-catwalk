import React from 'react';
import OutfitList from './outfitList';
import RelatedList from './relatedList';

const RelatedContainer = (props) => (
  <>
    <header onClick={event => props.spy(event, 'Related Products')}><p>RELATED PRODUCTS</p></header>
    {/* <RelatedList /> */}
    <header onClick={event => props.spy(event, 'Your Outfit')}><p>YOUR OUTFIT</p></header>
    <OutfitList />
  </>
);

export default RelatedContainer;
