import React from 'react';

const Price = (props) => {

  const { price, salePrice } = props;

  let classes = 'slim ';
  const salePriceString = salePrice ? ` $${salePrice}` : '';

  if (salePrice) {
    classes += 'strikethrough'
  }

  return (
    <>
      <span className={classes} aria-label={`Original product price: ${price}`}>${price}</span>
      <span style={{color: 'green'}} aria-label={`Discounted product price: ${salePriceString}`}>
        {salePriceString}
      </span>
    </>

  );
}

export default Price;