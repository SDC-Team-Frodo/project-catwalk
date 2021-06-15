import React, { useState, useEffect, useContext } from 'react';
import StyleGrid from './subcomponents/StyleGrid';
import ProductContext from '../../contexts/ProductContext';
import ReviewContext from '../../contexts/ReviewContext';
import RatingContext from '../../contexts/RatingContext';
import Price from './subcomponents/Price';
import SelectSize from './subcomponents/SelectSize';
import QuantityInput from './subcomponents/QuantityInput';

const GalleryAside = (props) => {
  const [averageRating] = useContext(RatingContext);
  const [allReviews] = useContext(ReviewContext);

  const product = useContext(ProductContext);

  const {  cartQuantity, setCartQuantity, selectedSizeIndex, setSelectedSizeIndex, activeStyle, styles, selectedStyleIndex, setSelectedStyleIndex, submitCart } = props;

  // Added support for hiding.
  // I assume conditionally rendering will break the useState hook if it misses rendering any of the children using said hook.
  return (
    <div id="gallery-aside" className={props.fullscreenSlider ? 'hide' : ''}>
      <section className="left-margin top-margin">

        <div id="gallery-aside-stars">
          {averageRating !== null
            && (
            <div className="empty-stars">
              <div className="filled-stars" style={{ width: `${(Math.round(averageRating * 4) / 4) * 20}%` }} aria-label={`Avarage product rating: ${averageRating} stars`}>
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
              </div>
            </div>
            )}
        </div>

        <a href="#review-widget" aria-label={`Click here to read all reviews on this product.`}>
          {`Read all reviews (${allReviews.length} reviews)`}
        </a>
        <br />
        <span className="slim" aria-label={`Product category: ${product.category}`}>{product.category}</span>

        <h2 aria-label={product.name}>
          {product.name}
        </h2>
        <Price
          price={activeStyle ? activeStyle.original_price : 0}
          salePrice={activeStyle ? activeStyle.sale_price : null}
          />
        <br />
        <br />
        <div id="styles">
          <strong>Styles &gt;</strong>
          <span className="slim">
            {activeStyle && ' ' + activeStyle.name}
          </span>
        </div>

        <StyleGrid
          styles={styles}
          selectedStyleIndex={selectedStyleIndex}
          setSelectedStyleIndex={setSelectedStyleIndex}/>

        <form>
          <div className="separator mobile-row">
            {(activeStyle && activeStyle.skus) && <SelectSize activeStyle={activeStyle}
            selectedSizeIndex={selectedSizeIndex}
            setSelectedSizeIndex={setSelectedSizeIndex}/>}
            <QuantityInput
              cartQuantity={cartQuantity}
              setCartQuantity={setCartQuantity} />
          </div>

          <br />
          <div className="separator mobile-row">
            <button id="add-to-bag" onClick={submitCart} aria-label="Add to bag">
              ADD TO BAG
              <i className="fas fa-plus"></i>
            </button>
            <button id="favorite-button" aria-label="Add to outfits"><i className="far fa-star"></i></button>
          </div>
        </form>
    </section>

    </div>
  );
};

export default GalleryAside;