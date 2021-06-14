import React, { useState, useEffect, useContext } from 'react';
import StyleGrid from './subcomponents/StyleGrid';
import ProductContext from '../../contexts/ProductContext';
import RatingContext from '../../contexts/RatingContext';
import Price from './subcomponents/Price';
import SelectSize from './subcomponents/SelectSize';
import QuantityInput from './subcomponents/QuantityInput';

const GalleryAside = (props) => {
  const [averageRating, setAverageRating] = useContext(RatingContext);
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
              <div className="filled-stars" style={{ width: `${(Math.round(averageRating * 4) / 4) * 20}%` }}>
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
                <i className="fas fa-star" aria-hidden="true" />
              </div>
            </div>
            )}
        </div>

        <a href="#review-widget">Read all reviews</a>
        <br />
        <span className="slim">{product.category}</span>

        <h2>
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
            {activeStyle && ' '+ activeStyle.name}
          </span>
        </div>
        {/*
        selectedSizeIndex={selectedSizeIndex}
          setSelectedSizeIndex={setSelectedSizeIndex}
          cartQuantity={cartQuantity}
          setCartQuantity={setCartQuantity}
           */}
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
            <button id="add-to-bag" onClick={submitCart}>
              ADD TO BAG
              <i className="fas fa-plus"></i>
            </button>
            <button id="favorite-button"><i className="far fa-star"></i></button>
          </div>

        </form>


    </section>

    </div>
  );
};

export default GalleryAside;