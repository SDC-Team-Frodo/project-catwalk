/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect, useContext} from 'react';
import ReactStars from 'react-rating-stars-component';
import getAverageRating from '../../helpers/averageRating';

const Card = (props) => {
  const {
    product, thumbnail, ratings, cardClass, isStars, func,
  } = props;

  const {
    default_price, category, name,
  } = product;

  const cardClasses = `${cardClass  } card`;
  const iconId = `${cardClass}${product.id}`;

  function redirect () {
    console.log('redirect to page');
  }

  if (thumbnail) {
    const background = {
      backgroundImage: `url("${thumbnail.thumbnail_url}")`,
    };
    return (
      <div className={cardClasses}>
        <div className="imageContainer" style={background} onClick={redirect}>
          <img src={thumbnail.thumbnail_url} alt="Failed" />
        </div>
        <div className="cardIcon" onClick={func} >
          {isStars ? <ReactStars {
              ...{
                size: 24,
                count: 1,
                value: 1,
                a11y: true,
                isHalf: true,
                edit: false,
              }
            }
            /> : <span id={iconId}>&#9447;</span>}
        </div>
        <div className="textContainer" onClick={redirect}>
          {category}
          <br />
          <b>{name}</b>
          <br />
          ${default_price}
          <br />
          <div className="cardRating">
            {ratings && <ReactStars {
              ...{
                size: 16,
                value: getAverageRating(ratings),
                a11y: true,
                isHalf: true,
                edit: false,
                activeColor: 'red',
              }
            }
            />}
          </div>
        </div>
      </div>
    );
  } else {
    return <p>List Loading</p>
  }
};

export default Card;
