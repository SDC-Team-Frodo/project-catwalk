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
      <span className={classes}>${price}</span>
      <span style={{color: 'green'}}>
        {salePriceString}
      </span>
    </>

  );
}

export default Price;