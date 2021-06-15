import React from 'react';

const Description = (props) => {
  const { product } = props;
  return (
    <div id="description">
      <section className="left-margin large-top-margin">
        <h3 aria-label={`Header: ${product.slogan}`}>{product.slogan}</h3>
        <p aria-label={'Product description' + product.description}>{product.description}</p>
          <i className="fab fa-twitter" aria-label="Connect with us on twitter"></i>
          <i className="fab fa-facebook" aria-label="Connect with us on facebook"></i>
          <i className="fab fa-pinterest" aria-label="Connect with us on pinterest"></i>
          <i className="fab fa-tumblr" aria-label="Connect with us on tumblr"></i>
          <i className="fas fa-share-alt" aria-label="Copy a link to our site to your clipboard"></i>
      </section>
    </div>
  );
}

export default Description;