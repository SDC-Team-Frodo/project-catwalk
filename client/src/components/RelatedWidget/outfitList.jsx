import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';
// import BlankCard from './blankCard';

const OutfitList = () => {
  const product = useContext(ProductContext);

  const [numberOfCards, setNumberOfCards] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [outfitIds, setOutfitList] = useState(JSON.parse(localStorage.getItem('outfit')));
  const [outfitProducts, setOutfitProducts] = useState([]);
  const [outfitRatings, setOutfitRatings] = useState([]);
  const [outfitThumbnails, setOutfitThumbnails] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    console.log('should only render once?')
  }, [outfitIds])

  function addOutfit() {
    let outfitIdsLocal = JSON.parse(localStorage.getItem('outfit'));

    if (!outfitIdsLocal) {
      outfitIdsLocal = [];
    }

    if (outfitIdsLocal.indexOf(product.id) === -1) {
      outfitIdsLocal.push(product.id);
      localStorage.setItem('outfit', JSON.stringify(outfitIdsLocal));
      console.log(outfitIdsLocal)
      setOutfitList(outfitIdsLocal);
    }
  }
  //// DELETE THESE
  function clearOutfitLocal () {
    localStorage.removeItem('outfit')
  }
  function checkLocal () {
    console.log('this is in local', JSON.parse(localStorage.getItem('outfit')))
    console.log('this is in state', outfitIds)
  }

  return (
    <>
    <div className="card plus" onClick={addOutfit} id="blank">
      +
      <br />
      Add Current Product To
      <br />
      Outfits
    </div>
    <button type="button" onClick={clearOutfitLocal}>clear</button>

    <button type="button" onClick={checkLocal}>check inside of local storage outfit</button>
    </>
  );
};

export default OutfitList;
