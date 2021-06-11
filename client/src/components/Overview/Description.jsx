import React from 'react';

const Description = (props) => {
  const product = props.product;
  return (
    <div id="description">
      <section className="left-margin large-top-margin">
        <h3>{product.slogan}</h3>
        <p>{product.description}</p>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-pinterest"></i>
          <i className="fab fa-tumblr"></i>
          <i className="fas fa-share-alt"></i>
      </section>
    </div>
  );
}

export default Description;