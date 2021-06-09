import React, { useState, useEffect, useContext } from 'react';
import RelatedCard from './relatedCard';
import relatedSamples from './relatedSamples'; // delete later
import stylesSamples from './stylesSamples'; // delete later

// eslint-disable-next-line func-names
const RelatedList = function () {
  const numberOfCards = relatedSamples.length;
  let index = 1;
  let translateX = 0;

  function buttonHandle(event) {
    const response = event.target.id;
    let initial = 0;

    if (response === 'relatedPrevious') {
      if (index !== 1) {
        index -= 1;
        translateX += 270;
      }
    } else if (response === 'relatedNext') {
      if (index !== numberOfCards) {
        index += 1;
        translateX -= 270;
      }
    }

    const cards = document.getElementsByClassName('relatedCard');
    for (initial; initial < cards.length; initial += 1) {
      cards[initial].style.transform = `translateX(${translateX}px`;
    }
  }

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
