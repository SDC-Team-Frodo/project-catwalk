import React, {useContext} from  'react';
import ReactStars from 'react-rating-stars-component';
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
          {!isStars ? <span className="cardIcon" id={iconId}>&#9447;</span>
            : <span className="cardIcon" id={iconId}>&#x2605;</span>}
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
