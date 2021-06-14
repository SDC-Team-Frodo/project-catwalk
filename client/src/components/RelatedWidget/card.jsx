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

  const cardClasses = `${cardClass} card`;
  const iconId = `${cardClass}${product.id}`;

  function redirect() {
    setCurrentProductId(product.id);
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
        <div className="cardIcon" id={iconId} onClick={func}>
          {!isStars ? <span className="cardIcon cardCross" id={iconId}>&times;</span>
            : <span className="cardIcon cardStar"><i id={iconId} onClick={func} className="far fa-star" /></span>}
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
  }
  return <p>List Loading</p>;
};

export default Card;
