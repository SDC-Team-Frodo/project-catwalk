import React, { useState, useEffect, useContext } from 'react';
import Card from './card';
import request from '../../requests';
import ProductContext from '../../contexts/ProductContext';
import ComparisonTable from './comparisonTable';
import helpers from './relatedHelpers';

const RelatedList = () => {
  const product = useContext(ProductContext);

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
    request.get(`products/${product.id}/related`, { endpoint: `products/${product.id}/related` })
      .then((relatedProductIds) => {
        setRelatedIds(relatedProductIds.data);
        setNumberOfCards(relatedProductIds.data.length);
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
          setRelatedThumbnails((oldThumbnails) => [...oldThumbnails, thumbnail.data.results[0].photos[0]]);
        })
        .catch((err) => console.log(err));
      delay(indexDelay);
    });
  }, [relatedIds]);

  useEffect(() => {
    if (index === 1) {
      document.getElementById('relatedPrevious').style.visibility = 'hidden';
    } else {
      document.getElementById('relatedPrevious').style.visibility = 'visible';
    }
    if (index >= numberOfCards) {
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

  useEffect(() => {
    if (cardTarget) {
      const feat = helpers.compareFeatures(product.features, cardTarget.features);
      setCombinedFeatures(feat);
      setIsModal(true);
      document.getElementById('compareModal').style.display = 'block';
    }
  }, [cardTarget]);

  function navButtonHandle(event) {
    const response = event.target.id;

    if (response === 'relatedPrevious') {
      if (index !== 1) {
        setIndex((previousIndex) => previousIndex - 1);
        setTranslateX((previousTranslateX) => previousTranslateX + 270);
      }
    } else if (response === 'relatedNext') {
      if (index < numberOfCards) {
        setIndex((previousIndex) => previousIndex + 1);
        setTranslateX((previousTranslateX) => previousTranslateX - 270);
      }
    }
  }

  function closeCompareWindow() {
    setIsModal(false);
    setCardTarget(null);
    document.getElementById('compareModal').style.display = 'none';
  }

  function compareFeaturesModal(event) {
    let id = event.target.id.match(/\d+/);
    id = parseInt(id[0], 10);
    const cardDetails = relatedProductList[relatedIds.indexOf(id)];
    setCardTarget(cardDetails);
  }

  return (
    <>
      <div className="compareModal" id="compareModal">
        <div className="compareContent">
          <span className="compareClose" onClick={closeCompareWindow}>&times;</span>
          {isModal ? <ComparisonTable overviewName={product.name} cardName={cardTarget.name} combined={combinedFeatures} /> : null}
        </div>
      </div>

      <div className="outfitRelatedWidget" id="related">
        <button type="button" className="carousel_button previous" id="relatedPrevious" onClick={navButtonHandle}>&#9664;</button>
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
        <button type="button" className="carousel_button next" id="relatedNext" onClick={navButtonHandle}>&#9654;</button>
      </div>
    </>
  );
};

export default RelatedList;
