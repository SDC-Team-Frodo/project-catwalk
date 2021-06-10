import React from 'react';

const Description = (props) => {
  const product = props.product;
  return (
    <div id="description">
      <section className="left-margin large-top-margin">
        <h3>{product.slogan}</h3>
        <p>{product.description}</p>

      </section>
    </div>
  );
}

export default Description;