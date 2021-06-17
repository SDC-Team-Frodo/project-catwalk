import React, { useContext } from 'react';
import _ from 'lodash';
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

  const {
    cartQuantity, setCartQuantity,
    selectedSizeIndex, setSelectedSizeIndex,
    activeStyle, styles,
    selectedStyleIndex, setSelectedStyleIndex,
    submitCart,
    fullscreenSlider,
  } = props;

  let max = 15;
  if (activeStyle && selectedSizeIndex > 0) {
    const inventory = activeStyle.skus[selectedSizeIndex].quantity;
    max = Math.min(inventory, max);
  }

  let availableStyles = [];

  if (activeStyle && activeStyle.skus) {
    availableStyles = _.map(activeStyle.skus, (sku, key) => {
      return (
        {
          ...sku,
          sku: key,
        }
      );
    });
    availableStyles = _.filter(availableStyles, ((sku) => sku.quantity > 0));
  }

  const soldOut = availableStyles.length < 1;

  return (
    <div id="gallery-aside" className={fullscreenSlider ? 'hide' : ''}>
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

        {allReviews.length > 0 && (
          <a href="#review-widget" aria-label="Click here to read all reviews on this product.">
            {`Read all (${allReviews.length}) reviews`}
          </a>
        )}
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
            {activeStyle && ` ${activeStyle.name}`}
          </span>
        </div>

        <StyleGrid
          styles={styles}
          selectedStyleIndex={selectedStyleIndex}
          setSelectedStyleIndex={setSelectedStyleIndex}
        />

        <form>
          <div className="separator mobile-row">
            {(activeStyle && activeStyle.skus) && (
              <SelectSize
                activeStyle={activeStyle}
                selectedSizeIndex={selectedSizeIndex}
                setSelectedSizeIndex={setSelectedSizeIndex}
                setCartQuantity={setCartQuantity}
                availableStyles={availableStyles}
              />
            )}
            {!soldOut && (
              <QuantityInput
                cartQuantity={cartQuantity}
                setCartQuantity={setCartQuantity}
                max={max}
              />
            )}
          </div>

          <br />
          <div className="separator mobile-row">
            {!soldOut && (
              <>
                <button type="submit" id="add-to-bag" onClick={submitCart} aria-label="Add to bag">
                  ADD TO BAG
                  <i className="fas fa-plus" />
                </button>
                <button
                  type="submit"
                  id="favorite-button"
                  aria-label="Add to outfits"
                >
                  <i className="far fa-star" />
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default GalleryAside;
