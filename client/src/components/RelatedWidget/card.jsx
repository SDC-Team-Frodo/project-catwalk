import React from 'react';
import ReactStars from 'react-rating-stars-component';
import getAverageRating from '../../helpers/averageRating';
import helpers from './relatedHelpers';
import Modal from '../Modal';
import ComparisonTable from './comparisonTable';

const Card = (props) => {
  const {
    product, thumbnail, ratings, cardClass, isStars, func, overview,
  } = props;

  const {
    default_price, category, name,
  } = product;

  const cardClasses = `${cardClass} card`;
  const iconId = `${cardClass}${product.id}`;

  function redirect() {
    console.log('redirect to page');
  }

  if (thumbnail) {
    const background = {
      backgroundImage: `url("${thumbnail.thumbnail_url}")`,
    };
    const combined = helpers.compareFeatures(overview.features, product.features);
    return (
      <div className={cardClasses}>
        <div className="imageContainer" style={background} onClick={redirect}>
          <img src={thumbnail.thumbnail_url} alt="Failed" />
        </div>
        <div className="cardIcon" id={iconId}>
          {!isStars ? <span onClick={func} className="cardIcon" id={iconId}>&#9447;</span>
            : (
              <Modal
                modalId={iconId}
                header={<p>Comparing</p>}
                body={<ComparisonTable combined={combined} overviewName={overview.name} productName={product.name} />}
                footer={<div />}
                btnName=""
                btnId=""
                isImage={true}
                image={<span className="cardIcon" id={iconId}>&#x2605;</span>}
              />
            )}
        </div>
        <div className="textContainer" onClick={redirect}>
          {category}
          <br />
          <b>{name}</b>
          <br />
          $
          {default_price}
          <br />
          <div className="cardRating">
            {ratings && (
            <ReactStars {
              ...{
                size: 18,
                value: getAverageRating(ratings),
                a11y: true,
                isHalf: true,
                edit: false,
                activeColor: 'red',
              }
            }
            />
            )}
          </div>
        </div>
      </div>
    );
  }
  return <p>List Loading</p>;
};

export default Card;
