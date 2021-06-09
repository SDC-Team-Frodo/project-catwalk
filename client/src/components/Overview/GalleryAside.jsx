import React from 'react';

const GalleryAside = (props) => {

  const { product } = props;
  // Added support for hiding.
  // I assume conditionally rendering will break the useState hook if it misses rendering any of the children using said hook.
  return (
    <div id="gallery-aside" className={props.fullscreenSlider ? 'hide' : ''}>
      <section className="left-margin top-margin">

        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
          <a href="#ReviewWidget">
            Read all reviews
          </a>
        </div>

        <br />

        <span className="uppercase slim">{product.category}</span>

        <br />

        <h2>
          {product.name}
        </h2>
        <span className="slim">${product.default_price}</span>
        <br />
        <br />
        <div id="styles">
          <strong>Styles &gt;</strong> SELECTED STYLE
          <div id="style-grid">

          </div>
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