import React, { useState, useEffect, useContext } from 'react';
import Card from './card';
import request from '../../requests';
import ProductContext from '../../contexts/ProductContext';
import defaultStyles from './defaultStyles';
import defaultRatings from './defaultRatings';

const OutfitList = () => {
  const product = useContext(ProductContext);
  const [thumbnail, setThumbnail] = useState(defaultStyles);
  const [rating, setRating] = useState(defaultRatings);
  const [isMobile, setIsMobile] = useState(null);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [all, setAll] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    request.get(`products/${product.id}/styles`, { endpoint: `products/${product.id}/styles` })
      .then((result) => {
        setThumbnail(result.data.results);
      })
      .catch((err) => console.log(err));

    request.get('reviews/meta', { endpoint: 'reviews/meta', product_id: product.id })
      .then((result) => {
        setRating(result.data.ratings);
      })
      .catch((err) => console.log(err));

    moveButton();

    let allOutfit = JSON.parse(localStorage.getItem('outfit'));
    if (!allOutfit) {
      allOutfit = [[], [], []]
      localStorage.setItem('outfit', JSON.stringify(allOutfit));
    }
    setAll(allOutfit);
    setNumberOfCards(allOutfit[0].length);
  }, [product]);

  function removeOutfit(event) {
    let id = event.target.id.match(/\d+/);
    id = parseInt(id[0], 10);
    const outfitAll = JSON.parse(localStorage.getItem('outfit'));
    const [localProducts, localThumbnails, localRatings] = outfitAll;
    const cardIndex = localProducts.indexOf(id);

    localProducts.splice(cardIndex, 1);
    localThumbnails.splice(cardIndex, 1);
    localRatings.splice(cardIndex, 1);

    setAll([localProducts, localThumbnails, localRatings]);
    setNumberOfCards(localProducts.length);

    localStorage.setItem('outfit', JSON.stringify([localProducts, localThumbnails, localRatings]));
  }

  function addOutfit() {
    const outfitAll = JSON.parse(localStorage.getItem('outfit'));
    let isIndexOf = false;
    let localProducts = [];
    let localThumbnails = [];
    let localRatings = [];
    if (outfitAll[0].length > 0) {
      localProducts = outfitAll[0].slice();
      localThumbnails = outfitAll[1].slice();
      localRatings = outfitAll[2].slice();
    }

    localProducts.forEach((localProduct) => {
      if (!isIndexOf && localProduct.id === product.id) {
        isIndexOf = true;
      }
    });

    if (!isIndexOf) {
      localProducts.push(product);
      localThumbnails.push(thumbnail);
      localRatings.push(rating);
      localStorage.setItem('outfit', JSON.stringify([localProducts, localThumbnails, localRatings]));

      setNumberOfCards(localProducts.length);
      setAll([localProducts, localThumbnails, localRatings]);
    }
  }

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
          {all.length > 0 && all[0].map((categories, i) => (
            <Card
              product={all[0][i]}
              thumbnail={all[1][i]}
              ratings={all[2][i]}
              key={`${all[0][i].id}${i}`}
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
