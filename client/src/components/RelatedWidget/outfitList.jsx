import React, { useState, useEffect, useContext } from 'react';
import BlankCard from './blankCard';

const OutfitList = function() {
  let [ outfitItems, setOutfitItems ] = useState(undefined);

  return (
    <BlankCard />
  )
}

export default OutfitList;
