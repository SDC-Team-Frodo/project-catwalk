import React, { useState, useEffect, useContext } from 'react';
import RelatedCard from './relatedCard';
import request from '../../requests';
import ProductContext from '../../contexts/ProductContext';
import relatedSamples from './relatedSamples'; // delete later
import stylesSamples from './stylesSamples'; // delete later

// eslint-disable-next-line func-names
const RelatedList = function () {
  const product = useContext(ProductContext);

  const [numberOfCards, setNumberOfCards] = useState(relatedSamples.length); //change from api call
  const [relatedProductlist, setRelatedProductlist] = useState([]);
  const [relatedRatings, setRelatedRatings] = useState([]);
  const [relatedThumbnails, setRelatedThumbnails] = useState([]);
  const [index, setIndex] = useState(1);
  const [translateX, setTranslateX] = useState(0);

  // Get initial value for related product's id, ratings, thumbnails
  useEffect(() => {
    request.get(`products/${product.id}/related`, { endpoint: `products/${product.id}/related` })
      .then((relatedProductsIds) => {
        relatedProductsIds.data.forEach((id) => {
          request.get(`products/${id}`, { endpoint: `products/${id}` })
            .then((newRelatedProduct) => {
              setRelatedProductlist((oldProducts) => [...oldProducts, newRelatedProduct.data]);
            })
            .catch((err) => console.log(err));

          request.get(`reviews/meta`, { endpoint: `reviews/meta`, product_id: id })
            .then((rating) => {
              setRelatedRatings((oldRatings) => [...oldRatings, rating.data.ratings]);
            })
            .catch((err) => console.log(err));

          request.get(`products/${id}/styles`, { endpoint: `products/${id}/styles` })
            .then((thumbnail) => {
              setRelatedThumbnails((oldThumbnails) => [...oldThumbnails, thumbnail.data.results[0].photos[0]]);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }, [product.id]);

  // Handles button event related to carousel next and previous buttons
  function buttonHandle(event) {
    const response = event.target.id;

    if (response === 'relatedPrevious') {
      if (index !== 1) {
        setIndex((previousIndex) => previousIndex - 1);
        setTranslateX((previousTranslateX) => previousTranslateX + 270);
      }
    } else if (response === 'relatedNext') {
      if (index !== numberOfCards) {
        setIndex((previousIndex) => previousIndex + 1);
        setTranslateX((previousTranslateX) => previousTranslateX - 270);
      }
    }
  }

  // Initiates the movement for the carousel
  useEffect(() => {
    let initial = 0;
    const cards = document.getElementsByClassName('relatedCard');
    for (initial; initial < cards.length; initial += 1) {
      cards[initial].style.transform = `translateX(${translateX}px`;
    }
  }, [index, translateX]);

  return (
    <div id="related" >
      <button type="button" className="carousel_button previous" id="relatedPrevious" onClick={buttonHandle}>&#60;</button>
      <div className="carousel" id="relatedList">
        {relatedSamples.map((relatedProduct, index) => <RelatedCard product={relatedProduct} thumbnail={stylesSamples[index].photos[0].thumbnail_url} key={relatedProduct.id} />)}
      </div>
      <button type="button" className="carousel_button next" id="relatedNext" onClick={buttonHandle}>&#62;</button>
    </div>
  );
};

export default RelatedList;
