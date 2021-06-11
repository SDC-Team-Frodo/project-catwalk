import React, { useState, useEffect, useContext } from 'react';
import Card from './card';
import request from '../../requests';
import ProductContext from '../../contexts/ProductContext';
import helpers from './relatedHelpers';

const RelatedList = () => {
  const product = useContext(ProductContext);

  const [numberOfCards, setNumberOfCards] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [relatedProductList, setRelatedProductList] = useState([]);
  const [relatedIds, setRelatedIds] = useState([]);
  const [relatedRatings, setRelatedRatings] = useState([]);
  const [relatedThumbnails, setRelatedThumbnails] = useState([]);
  const [index, setIndex] = useState(1);

  // Get initial value for related product's id, ratings, thumbnails
  useEffect(() => {
    request.get(`products/${product.id}/related`, { endpoint: `products/${product.id}/related` })
      .then((relatedProductsIds) => {
        setNumberOfCards(relatedProductsIds.data.length);
        setRelatedIds(relatedProductsIds.data)
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

  useEffect(() => {
    if (index === 1) {
      document.getElementById('relatedPrevious').style.visibility = 'hidden';
    } else {
      document.getElementById('relatedPrevious').style.visibility = 'visible';
    }
    if (index >= numberOfCards - 3) {
      document.getElementById('relatedNext').style.visibility = 'hidden';
    } else {
      document.getElementById('relatedNext').style.visibility = 'visible';
    }

    let initial = 0;
    const cards = document.getElementsByClassName('relatedCard');
    for (initial; initial < cards.length; initial += 1) {
      cards[initial].style.transform = `translateX(${translateX}px`;
    }
  }, [index, translateX, numberOfCards]);

  function buttonHandle(event) {
    const response = event.target.id;

    if (response === 'relatedPrevious') {
      if (index !== 1) {
        setIndex((previousIndex) => previousIndex - 1);
        setTranslateX((previousTranslateX) => previousTranslateX + 270);
      }
    } else if (response === 'relatedNext') {
      if (index < numberOfCards - 3) {
        setIndex((previousIndex) => previousIndex + 1);
        setTranslateX((previousTranslateX) => previousTranslateX - 270);
      }
    }
  }

  function compareFeaturesModal(event) {
    let id = event.target.id.match(/\d+/);
    id = parseInt(id[0], 10);
    const cardIndex = relatedIds.indexOf(id);
    const currentFeatures = product.features;
    const selectedFeatures = relatedProductList[cardIndex].features;
    helpers.compareFeatures(currentFeatures, selectedFeatures)
  }

  return (
    <div className="outfitRelatedWidget" id="related">
      <button type="button" className="carousel_button previous" id="relatedPrevious" onClick={buttonHandle}>&#60;</button>
      <div className="carousel" id="relatedList">
        {relatedProductList.map((relatedProduct, i) => <Card product={relatedProduct} thumbnail={relatedThumbnails[i]} ratings={relatedRatings[i]} key={`${relatedProduct.id}${i}`} cardClass={'relatedCard'} func={compareFeaturesModal} isStars={true} />)}
      </div>
      <button type="button" className="carousel_button next" id="relatedNext" onClick={buttonHandle}>&#62;</button>
    </div>
  );
};

export default RelatedList;
