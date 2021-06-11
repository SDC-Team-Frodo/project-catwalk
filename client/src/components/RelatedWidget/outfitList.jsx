import React, { useState, useEffect, useContext } from 'react';
import Card from './card';
import request from '../../requests';
import ProductContext from '../../contexts/ProductContext';

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
    if (outfitIds) {
      setOutfitProducts([]);
      setOutfitRatings([]);
      setOutfitThumbnails([]);
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

  // Handles button event related to carousel next and previous buttons
  function buttonHandle(event) {
    const response = event.target.id;
    if (response === 'outfitPrevious') {
      if (index !== 1) {
        setIndex((previousIndex) => previousIndex - 1);
        setTranslateX((previousTranslateX) => previousTranslateX + 270);
      }
    } else if (response === 'outfitNext') {
      if (index < numberOfCards - 3) {
        setIndex((previousIndex) => previousIndex + 1);
        setTranslateX((previousTranslateX) => previousTranslateX - 270);
      }
    }
  }

  // Initiates the movement for the carousel
  useEffect(() => {
    let initial = 0;
    const cards = document.getElementsByClassName('outfitCard');
    for (initial; initial < cards.length; initial += 1) {
      cards[initial].style.transform = `translateX(${translateX}px`;
    }
  }, [index, translateX]);

  return (
    <div className="outfitRelatedWidget">
      <button type="button" className="carousel_button previous" id="outfitPrevious" onClick={buttonHandle}>&#60;</button>
      <div className="carousel" id="relatedList">
        <div className="card plus" onClick={addOutfit} id="blank">
          +
          <br />
          Add Current Product To
          <br />
          Outfits
        </div>
        {outfitProducts.length > 0 && outfitProducts.map((outfitProduct, i) => <Card product={outfitProduct} thumbnail={outfitThumbnails[i]} ratings={outfitRatings[i]} key={product.id} cardClass="outfitCard" func={removeOutfit}/>)}
      </div>
      <button type="button" className="carousel_button next" id="outfitNext" onClick={buttonHandle}>&#62;</button>
    </div>
  );
};

export default OutfitList;