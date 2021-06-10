/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';

const RelatedCard = (props) => {
  const { product, thumbnail, ratings } = props;
  const {
    features, default_price, category, name,
  } = product;
  // console.log(props.product)

  return (
    <div className="relatedCard card">
      <div className="imageContainer">
        <img src={thumbnail ? thumbnail.thumbnail_url : null} alt="Failed" />
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
