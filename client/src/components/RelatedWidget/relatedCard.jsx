/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';

const RelatedCard = (props) => {
  const { product, thumbnail, ratings } = props;
  const {
    features, default_price, category, name,
  } = product;

  if (thumbnail) {
    const background = {
      backgroundImage: `url("${thumbnail.thumbnail_url}")`
    }
    return (
      <div className="card">
        <div className="imageContainer" style={background}>
          <img src={thumbnail.thumbnail_url} alt="Failed" />
          <div className="cardIcon">&#9734;</div>
        </div>
        <div className="textContainer">
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

export default RelatedCard;
