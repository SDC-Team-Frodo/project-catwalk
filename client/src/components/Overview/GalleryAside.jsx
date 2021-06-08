import React from 'react';

const GalleryAside = (props) => {

  return (
    <div id="gallery-aside" className={props.fullscreenSlider ? 'hide' : ''}>
      <section className="left-margin top-margin">

        <div className="rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
          <a href="#Reviews">
            Read all reviews
          </a>
        </div>

        <br />

        <span className="uppercase slim">CATEGORY</span>

        <br />

        <h2>
          Expanded Product Name
        </h2>

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