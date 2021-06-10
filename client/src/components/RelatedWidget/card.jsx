/* eslint-disable camelcase */
import React, { useState, useEffect, useContext} from 'react';

const Card = (props) => {
  const { product, thumbnail, ratings, cardClass } = props;
  let { func } = props;
  const {
    features, default_price, category, name,
  } = product;

  const cardClasses = `${cardClass  } card`;
  const iconId = `${cardClass}${product.id}`

  if (!func) {
    func = function () {
      console.log('failed to pass down')
    };
  }

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
        <div className="cardIcon" id={iconId} onClick={func} madeup="whatever">&#9734;</div>
        <div className="textContainer" onClick={redirect}>
          {category}
          <br />
          <b>{name}</b>
          <br />
          ${default_price}
          <br />
          <span>&#x2605;&#x2605;&#x2605;&#9734;&#9734;</span>
        </div>
      </div>
    );
  } else {
    return <p>List Loading</p>
  }
};

export default Card;
