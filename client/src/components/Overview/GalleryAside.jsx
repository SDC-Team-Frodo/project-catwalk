import React, { useContext } from 'react';
import StyleGrid from './subcomponents/StyleGrid';
import ProductContext from '../../contexts/ProductContext';
import RatingContext from '../../contexts/RatingContext';
import ReactStars from 'react-rating-stars-component';
import Price from './subcomponents/Price';
import SelectSize from './subcomponents/SelectSize';

const GalleryAside = (props) => {

  const rating = useContext(RatingContext);
  const product = useContext(ProductContext);

  const { activeStyle, styles, selectedStyleIndex, setSelectedStyleIndex } = props;

  // Added support for hiding.
  // I assume conditionally rendering will break the useState hook if it misses rendering any of the children using said hook.
  return (
    <div id="gallery-aside" className={props.fullscreenSlider ? 'hide' : ''}>
      <section className="left-margin top-margin">

        <div id="gallery-aside-stars">
          <ReactStars {
            ...{
              size: 18,
              value: Number(rating),
              edit: false,
            }
          } />
        </div>

        <a href="#review-widget">Read all reviews</a>
        <br />
        <span className="slim">{product.category}</span>

        <h2>
          {product.name}
        </h2>
        <Price
          price={product ? product.default_price : 0}
          salePrice={activeStyle ? activeStyle.sale_price : null}
          />
        <br />
        <br />
        <div id="styles">
          <strong>Styles &gt;</strong> {activeStyle && activeStyle.name}
        </div>
        <StyleGrid
          styles={styles}
          selectedStyleIndex={selectedStyleIndex}
          setSelectedStyleIndex={setSelectedStyleIndex}/>

        <form>
          <div class="separator">
            <SelectSize />
            <input id="quantity-select" type="number" min="1"/>
          </div>

          <br />
          <div class="separator">
            <button>ADD TO BAG +</button>
            <button><i className="far fa-star"></i></button>
          </div>

        </form>


    </section>

    </div>
  );
};

export default GalleryAside;