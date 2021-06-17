import React, { useState, useEffect, useContext } from 'react';
import Card from './card';
import request from '../../requests';
import ProductContext from '../../contexts/ProductContext';
import ComparisonTable from './comparisonTable';
import helpers from './relatedHelpers';

const RelatedList = () => {
  const product = useContext(ProductContext);

  const [isMobile, setIsMobile] = useState(null);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [relatedProductList, setRelatedProductList] = useState([]);
  const [relatedRatings, setRelatedRatings] = useState([]);
  const [relatedThumbnails, setRelatedThumbnails] = useState([]);
  const [index, setIndex] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [relatedIds, setRelatedIds] = useState([]);
  const [cardTarget, setCardTarget] = useState(null);
  const [combinedFeatures, setCombinedFeatures] = useState(null);

  // Get initial value for related product's id, ratings, thumbnails
  useEffect(() => {
    moveButton();
    request.get(`products/${product.id}/related`, { endpoint: `products/${product.id}/related` })
      .then((relatedProductIds) => {
        const uniqRelatedIds = [];
        relatedProductIds.data.forEach((ids) => {
          if (uniqRelatedIds.indexOf(ids) === -1) {
            uniqRelatedIds.push(ids);
          }
        });
        setRelatedIds(uniqRelatedIds);
        setNumberOfCards(uniqRelatedIds.length);
      })
      .catch((err) => console.log(err));
  }, [product]);

  function delay(i) {
    setTimeout(() => {
    }, 2000 * i);
  }

  useEffect(() => {
    setRelatedProductList([]);
    setRelatedRatings([]);
    setRelatedThumbnails([]);
    setTranslateX(0);
    setIndex(1);
    relatedIds.forEach((id, indexDelay) => {
      request.get(`products/${id}`, { endpoint: `products/${id}` })
        .then((newRelatedProduct) => {
          setRelatedProductList((oldProducts) => [...oldProducts, newRelatedProduct.data]);
        })
        .catch((err) => console.log(err));

      request.get('reviews/meta', { endpoint: 'reviews/meta', product_id: id })
        .then((rating) => {
          setRelatedRatings((oldRatings) => [...oldRatings, rating.data.ratings]);
        })
        .catch((err) => console.log(err));

      request.get(`products/${id}/styles`, { endpoint: `products/${id}/styles` })
        .then((thumbnail) => {
          setRelatedThumbnails((oldThumbnails) => [...oldThumbnails, thumbnail.data.results]);
        })
        .catch((err) => console.log(err));
      delay(indexDelay);
    });
  }, [relatedIds]);

  useEffect(() => {
    if (index === 1) {
      relatedPrevious.style.visibility = 'hidden';
    } else {
      relatedPrevious.style.visibility = 'visible';
    }

    if (index >= numberOfCards) {
      relatedNext.style.visibility = 'hidden';
    } else {
      relatedNext.style.visibility = 'visible';
    }

    let initial = 0;
    const cards = related.getElementsByClassName('relatedCard');
    for (initial; initial < cards.length; initial += 1) {
      cards[initial].style.transform = `translateX(${translateX}px`;
    }
  }, [index, translateX, numberOfCards]);

  useEffect(() => {
    if (cardTarget) {
      const feat = helpers.compareFeatures(product.features, cardTarget.features);
      setCombinedFeatures(feat);
      setIsModal(true);
      compareModal.style.display = 'block';
    }
  }, [cardTarget]);

  function navButtonHandle(event) {
    const response = event.target.id;

    if (response === 'relatedPrevious') {
      if (index !== 1) {
        setIndex((previousIndex) => previousIndex - 1);
        setTranslateX((previousTranslateX) => previousTranslateX + 258);
      }
    } else if (response === 'relatedNext') {
      if (index < numberOfCards) {
        setIndex((previousIndex) => previousIndex + 1);
        setTranslateX((previousTranslateX) => previousTranslateX - 258);
      }
    }
  }

  function closeCompareWindow() {
    setIsModal(false);
    setCardTarget(null);
    compareModal.style.display = 'none';
  }

  function compareFeaturesModal(event) {
    let id = event.target.id.match(/\d+/);
    id = parseInt(id[0], 10);
    const cardDetails = relatedProductList[relatedIds.indexOf(id)];
    setCardTarget(cardDetails);
  }

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
      <div className="compareModal" id="compareModal">
        <div className="compareContent">
          <span className="compareClose" onClick={closeCompareWindow}>&times;</span>
          {isModal ? <ComparisonTable overviewName={product.name} cardName={cardTarget.name} combined={combinedFeatures} /> : null}
        </div>
      </div>

      <div className="outfitRelatedWidget" id="related">
        {!isMobile && <button type="button" className="carousel_button previous" id="relatedPrevious" onClick={navButtonHandle}>&#9664;</button>}
        <div className="carousel" id="relatedList">
          {relatedProductList.map((relatedProduct, i) => (
            <Card
              product={relatedProduct}
              thumbnail={relatedThumbnails[i]}
              ratings={relatedRatings[i]}
              key={`${relatedProduct.id}${i}`}
              cardClass="relatedCard"
              func={compareFeaturesModal}
              isStars={true}
            />
          ))}
        </div>
        {!isMobile && <button type="button" className="carousel_button next" id="relatedNext" onClick={navButtonHandle}>&#9654;</button>}
      </div>
      <div id="mobileNavButtons">
        {isMobile && <button type="button" className="carousel_button previous mobileButton" id="relatedPrevious" onClick={navButtonHandle}>&#9664;</button>}
        {isMobile && <button type="button" className="carousel_button next mobileButton" id="relatedNext" onClick={navButtonHandle}>&#9654;</button>}
      </div>
    </>
  );
};

export default RelatedList;
