import React, { useState, useEffect, useContext } from 'react';

const RelatedCard = (props) => {
  const { product, thumbnail } = props;
  const {
    features, default_price, category, name,
  } = product;

  return (
    <div className="relatedCard card">
      <div className="imageContainer">
        <img src={thumbnail} alt="Failed" />
        <div className="star">&#9734;</div>
      </div>
      <div className="textContainer">
        {category}
        <br />
        <b>{name}</b>
        <br />
        {default_price}
        <br />
        <span>&#x2605;&#x2605;&#x2605;&#9734;&#9734;</span>
      </div>
    </div>
  );
};

export default RelatedCard;
