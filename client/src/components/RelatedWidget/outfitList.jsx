import React, { useState, useEffect, useContext } from 'react';
import Card from './card';
import request from '../../requests';
import ProductContext from '../../contexts/ProductContext';
import './carousel.sass';

const OutfitList = () => {
  const product = useContext(ProductContext);

  const [numberOfCards, setNumberOfCards] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [outfitIds, setOutfitIds] = useState(JSON.parse(localStorage.getItem('outfit')));
  const [outfitProducts, setOutfitProducts] = useState([]);
  const [outfitRatings, setOutfitRatings] = useState([]);
  const [outfitThumbnails, setOutfitThumbnails] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    console.log('this is outfit ids', outfitIds)
    if (outfitIds) {
      setOutfitProducts([]);
      setOutfitRatings([]);
      setOutfitThumbnails([]);
      console.log('getting product information now')
      setNumberOfCards(outfitIds.length);
      outfitIds.forEach((id) => {
        request.get(`products/${id}`, { endpoint: `products/${id}` })
          .then((newOutfitProduct) => {
            setOutfitProducts((oldProducts) => [...oldProducts, newOutfitProduct.data]);
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
    } else if (!outfitIds) {
      setOutfitIds([]);
    }
  }, [outfitIds]);

  function removeOutfit(event) {
    let id = event.target.id.match(/\d+/);
    id = parseInt(id[0], 10);
    const outfitIdsLocal = JSON.parse(localStorage.getItem('outfit'));
    outfitIdsLocal.splice(outfitIdsLocal.indexOf(id), 1);
    setOutfitIds(outfitIdsLocal);
    localStorage.setItem('outfit', JSON.stringify(outfitIdsLocal));
  }

  function addOutfit() {
    let outfitIdsLocal = JSON.parse(localStorage.getItem('outfit'));

    if (!outfitIdsLocal) {
      outfitIdsLocal = [];
    }

    if (outfitIdsLocal.indexOf(product.id) === -1) {
      outfitIdsLocal.push(product.id);
      localStorage.setItem('outfit', JSON.stringify(outfitIdsLocal));
      setOutfitIds(outfitIdsLocal);
    }
  }

  //// DELETE THESE
  function clearOutfitLocal() {
    setOutfitIds([]);
    localStorage.removeItem('outfit', []);
  }

  function addData() {
    setOutfitIds([17071, 17074, 17075, 17067, 17069, 17072])
    localStorage.setItem('outfit', JSON.stringify([17071, 17074, 17075, 17067, 17069, 17072]))
  }

  return (
    <div className="outfitWidget">
      <div className="card plus" onClick={addOutfit} id="blank">
        +
        <br />
        Add Current Product To
        <br />
        Outfits
      </div>

      {outfitProducts.length > 0 && outfitProducts.map((outfitProduct, i) => <Card product={outfitProduct} thumbnail={outfitThumbnails[i]} ratings={outfitRatings[i]} key={product.id} cardClass="outfitCard" func={removeOutfit}/>)}
      <button type="button" onClick={clearOutfitLocal}>clear local and state</button>
      <button type="button" onClick={addData}>Add Data</button>
    </div>
  );
};

export default OutfitList;