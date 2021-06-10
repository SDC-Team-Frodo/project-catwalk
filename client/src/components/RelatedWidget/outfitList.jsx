import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../contexts/ProductContext';
import request from '../../requests';
// import BlankCard from './blankCard';

const OutfitList = () => {
  const product = useContext(ProductContext);

  const [numberOfCards, setNumberOfCards] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [outfitList, setOutfitList] = useState([]);
  const [outfitRatings, setOutfitRatings] = useState([]);
  const [outfitThumbnails, setOutfitThumbnails] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    outfitList.forEach((id) => {
      request.get(`products/${id}`, { endpoint: `products/${id}` })
        .then((newOutfitProduct) => {
          setOutfitList((oldProducts) => [...oldProducts, newOutfitProduct.data]);
        })
        .catch((err) => console.log(err));

      request.get(`reviews/meta`, { endpoint: `reviews/meta`, product_id: id })
        .then((rating) => {
          setOutfitRatings((oldRatings) => [...oldRatings, rating.data.ratings]);
        })
        .catch((err) => console.log(err));

      request.get(`products/${id}/styles`, { endpoint: `products/${id}/styles` })
        .then((thumbnail) => {
          setOutfitThumbnails((oldThumbnails) => [...oldThumbnails, thumbnail.data.results[0].photos[0]]);
        })
        .catch((err) => console.log(err));
    });
  }, [outfitList]);

  function addOutfit() {
    let outfitListLocal = JSON.parse(localStorage.getItem('outfit'));

    if (!outfitListLocal) {
      outfitListLocal = [];
    }

    if (outfitListLocal.indexOf(product.id) === -1) {
      outfitListLocal.push(product.id);
      localStorage.setItem('outfit', JSON.stringify(outfitListLocal));
      console.log(outfitListLocal)
      setOutfitList(outfitListLocal);
    }
  }
  //// DELETE THESE
  function clearOutfitLocal () {
    localStorage.removeItem('outfit')
  }
  function checkLocal () {
    console.log('this is in local', JSON.parse(localStorage.getItem('outfit')))
    console.log('this is in state', outfitList)
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
