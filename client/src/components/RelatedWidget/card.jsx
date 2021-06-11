import React, { useState, useEffect, useContext} from 'react';
import ReactStars from 'react-rating-stars-component';
import getAverageRating from '../../helpers/averageRating';

const Card = (props) => {
  const { product, thumbnail, ratings, cardClass, isStars } = props;
  let { func } = props;
  const {
    default_price, category, name,
  } = product;

  const cardClasses = `${cardClass  } card`;
  const iconId = `${cardClass}${product.id}`;

  function redirect () {
    console.log('redirect to page')
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
        <div className="cardIcon" id={iconId} onClick={func} >
          {isStars ? <ReactStars count={1} value={1} edit={false} /> : <span>&#9447;</span>}</div>
        <div className="textContainer" onClick={redirect}>
          {category}
          <br />
          <b>{name}</b>
          <br />
          ${default_price}
          <br />
          <div className="cardRating">
            {ratings && <ReactStars count={5} value={getAverageRating(ratings)} edit={false} halfIcon={true} />}
          </div>
        </div>
      </div>
    );
  } else {
    return <p>List Loading</p>
  }
};

export default Card;
