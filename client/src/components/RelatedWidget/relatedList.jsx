import React, { useState, useEffect, useContext } from 'react';
import Card from './card';
import request from '../../requests';
import ProductContext from '../../contexts/ProductContext';

const RelatedList = () => {
  const product = useContext(ProductContext);

  const [numberOfCards, setNumberOfCards] = useState(0); //change from api call
  const [translateX, setTranslateX] = useState(0);
  const [relatedProductList, setRelatedProductList] = useState([]);
  const [relatedRatings, setRelatedRatings] = useState([]);
  const [relatedThumbnails, setRelatedThumbnails] = useState([]);
  const [index, setIndex] = useState(1);

  // Get initial value for related product's id, ratings, thumbnails
  useEffect(() => {
    request.get(`products/${product.id}/related`, { endpoint: `products/${product.id}/related` })
      .then((relatedProductsIds) => {
        setNumberOfCards(relatedProductsIds.data.length);
        relatedProductsIds.data.forEach((id) => {
          request.get(`products/${id}`, { endpoint: `products/${id}` })
            .then((newRelatedProduct) => {
              setRelatedProductList((oldProducts) => [...oldProducts, newRelatedProduct.data]);
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

  function buttonHandle(event) {
    const response = event.target.id;

    if (response === 'relatedPrevious') {
      if (index !== 1) {
        setIndex((previousIndex) => previousIndex - 1);
        setTranslateX((previousTranslateX) => previousTranslateX + 270);
      }
    } else if (response === 'relatedNext') {
      if (index < numberOfCards - 4) {
        setIndex((previousIndex) => previousIndex + 1);
        setTranslateX((previousTranslateX) => previousTranslateX - 270);
      }
    }
  }

  useEffect(() => {
    let initial = 0;
    const cards = document.getElementsByClassName('relatedCard');
    for (initial; initial < cards.length; initial += 1) {
      cards[initial].style.transform = `translateX(${translateX}px`;
    }
  }, [index, translateX]);

  return (
    <div className="outfitRelatedWidget" id="related">
      <button type="button" className="carousel_button previous" id="relatedPrevious" onClick={buttonHandle}>&#60;</button>
      <div className="carousel" id="relatedList">
        {relatedProductList.map((relatedProduct, i) => <Card product={relatedProduct} thumbnail={relatedThumbnails[i]} ratings={relatedRatings[i]} key={`${relatedProduct.id}${i}`} cardClass={'relatedCard'}/>)}
      </div>
      <button type="button" className="carousel_button next" id="relatedNext" onClick={buttonHandle}>&#62;</button>
    </div>
  );
};

export default RelatedList;
