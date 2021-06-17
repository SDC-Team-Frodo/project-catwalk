import React, { useContext } from 'react';
import getAverageRating from '../../helpers/averageRating';
import ProductIdContext from '../../contexts/ProductIdContext';

const Card = (props) => {
  const [currentProductId, setCurrentProductId] = useContext(ProductIdContext);
  const {
    product, thumbnail, ratings, cardClass, isStars, func,
  } = props;

  const {
    default_price, category, name,
  } = product;

  let thumbnailUrl = 'https://i.imgur.com/EUjIJmB.png';
  let salePrice;
  let originalPrice = default_price;

  if (thumbnail) {
    const cardProduct = thumbnail.filter((styles) => styles['default?']);
    if (Object.keys(cardProduct).length > 0) {
      const { original_price, sale_price, photos } = cardProduct[0];
      thumbnailUrl = photos[0].thumbnail_url || 'https://i.imgur.com/EUjIJmB.png';
      salePrice = sale_price;
      originalPrice = original_price;
    }
  }

  const cardClasses = `${cardClass} card`;
  const iconId = `${cardClass}${product.id}`;

  function redirect() {
    setCurrentProductId(product.id);
  }

  const background = {
    backgroundImage: `url("${thumbnailUrl}")`,
  };

  return (
    <div className={cardClasses}>
      <div className="imageContainer" style={background} onClick={redirect} />
      <div className="cardIcon" onClick={func}>
        {!isStars ? <span className="cardIcon cardCross" id={iconId}>&times;</span>
          : <i id={iconId} onClick={func} className="far fa-star cardIcon cardStar" />}
      </div>
      <div className="textContainer" onClick={redirect}>
        {category}
        <br />
        <b>{name}</b>
        <br />
        {
          salePrice ? (
            <span className>
              <b>$</b>
              {salePrice}
              <strike>{originalPrice}</strike>
            </span>
          ) : (
            <span>
              <b>$</b>
              {originalPrice}
            </span>
          )
        }
        <br />
        <div className="cardRating">
          {ratings && (
            <div className="empty-stars">
              <div className="filled-stars" style={{ width: `${(Math.round(getAverageRating(ratings) * 4) / 4) * 20}%` }}>
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
