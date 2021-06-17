import React, { useState, useEffect, useContext } from 'react';
import Card from './card';
import request from '../../requests';
import ProductContext from '../../contexts/ProductContext';

const OutfitList = () => {
  const product = useContext(ProductContext);

  const [isMobile, setIsMobile] = useState(null);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [outfitIds, setOutfitIds] = useState([]);
  const [outfitProducts, setOutfitProducts] = useState([]);
  const [outfitRatings, setOutfitRatings] = useState([]);
  const [outfitThumbnails, setOutfitThumbnails] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    moveButton();
    let outfitIdsLocal = JSON.parse(localStorage.getItem('outfit'));
    if (!outfitIdsLocal) {
      outfitIdsLocal = [];
    }
    setOutfitIds(outfitIdsLocal);
    setNumberOfCards(outfitIdsLocal.length);
  }, [product]);

  function delay(i) {
    setTimeout(() => {
    }, 2000 * i);
  }

  useEffect(() => {
    if (outfitIds) {
      setOutfitProducts([]);
      setOutfitRatings([]);
      setOutfitThumbnails([]);
      setTranslateX(0);
      setIndex(1);
      setNumberOfCards(outfitIds.length);
      const outfitIdsLocal = JSON.parse(localStorage.getItem('outfit'));
      outfitIdsLocal.forEach((id, indexDelay) => {
        request.get(`products/${id}`, { endpoint: `products/${id}` })
          .then((newOutfitProduct) => {
            setOutfitProducts((oldProducts) => [...oldProducts, newOutfitProduct.data]);
          })
          .catch((err) => console.log(err));

        request.get('reviews/meta', { endpoint: 'reviews/meta', product_id: id })
          .then((rating) => {
            setOutfitRatings((oldRatings) => [...oldRatings, rating.data.ratings]);
          })
          .catch((err) => console.log(err));

        request.get(`products/${id}/styles`, { endpoint: `products/${id}/styles` })
          .then((thumbnail) => {
            setOutfitThumbnails((oldThumbnails) => [...oldThumbnails, thumbnail.data.results]);
          })
          .catch((err) => console.log(err));
        delay(indexDelay);
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
  function navButtonHandle(event) {
    const response = event.target.id;
    if (response === 'outfitPrevious') {
      if (index !== 1) {
        setIndex((previousIndex) => previousIndex - 1);
        setTranslateX((previousTranslateX) => previousTranslateX + 258);
      }
    } else if (response === 'outfitNext') {
      if (index < numberOfCards) {
        setIndex((previousIndex) => previousIndex + 1);
        setTranslateX((previousTranslateX) => previousTranslateX - 258);
      }
    }
  }

  // Initiates the movement for the carousel
  useEffect(() => {
    if (index === 1) {
      outfitPrevious.style.visibility = 'hidden';
    } else {
      outfitPrevious.style.visibility = 'visible';
    }
    if (index >= numberOfCards) {
      outfitNext.style.visibility = 'hidden';
    } else {
      outfitNext.style.visibility = 'visible';
    }

    let initial = 0;
    const cards = outfitList.getElementsByClassName('outfitCard');
    for (initial; initial < cards.length; initial += 1) {
      cards[initial].style.transform = `translateX(${translateX}px`;
    }
  }, [index, translateX, numberOfCards]);

  function moveButton() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 394 && !isMobile) {
      setIsMobile(true);
    } else if (windowWidth > 394 && isMobile) {
      setIsMobile(false);
    }
  }
  window.addEventListener('resize', moveButton);

  return (
    <>
      <div className="outfitRelatedWidget">
        {!isMobile && <button type="button" className="carousel_button previous" id="outfitPrevious" onClick={navButtonHandle}>&#9664;</button>}
        <div className="carousel" id="outfitList">
          <div className="outfitCard card blankCard" onClick={addOutfit} id="blank">
            <div className="plus">
              <i className="fas fa-plus fa-4x" />
            </div>
            <b>
              <p>Add Current Product To</p>
              <p>Outfits</p>
            </b>
          </div>
          {outfitProducts.length > 0 && outfitProducts.map((outfitProduct, i) => (
            <Card
              product={outfitProduct}
              thumbnail={outfitThumbnails[i]}
              ratings={outfitRatings[i]}
              key={`${product.id}${i}`}
              cardClass="outfitCard"
              func={removeOutfit}
              isStars={false}
            />
          ))}
        </div>
        {!isMobile && <button type="button" className="carousel_button next" id="outfitNext" onClick={navButtonHandle}>&#9654;</button>}
      </div>
      <div id="mobileNavButtons">
        {isMobile && <button type="button" className="carousel_button previous mobileButton" id="outfitPrevious" onClick={navButtonHandle}>&#9664;</button>}
        {isMobile && <button type="button" className="carousel_button next mobileButton" id="outfitNext" onClick={navButtonHandle}>&#9654;</button>}
      </div>
    </>
  );
};

export default OutfitList;
