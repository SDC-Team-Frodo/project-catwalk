import React, { useContext } from 'react';
import StyleGrid from './subcomponents/StyleGrid';
import ProductContext from '../../contexts/ProductContext';
import RatingContext from '../../contexts/RatingContext';
import ReactStars from 'react-rating-stars-component';
import Price from './subcomponents/Price';

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

        <span className="uppercase slim">{product.category}</span>

        <br />

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
          <strong>Styles &gt;</strong> {activeStyle ? activeStyle.name : ''}
          <StyleGrid
            styles={styles}
            selectedStyleIndex={selectedStyleIndex}
            setSelectedStyleIndex={setSelectedStyleIndex}/>
        </div>

        <select name="SELECT SIZE" defaultValue="SELECT SIZE">
          <option disabled hidden>SELECT SIZE</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Big Chungus</option>
        </select>
        <input type="number" min="1"/>

        <br />

        <button>ADD TO BAG +</button>
        <button><i className="far fa-star"></i></button>


    </section>

    </div>
  );
};

export default GalleryAside;