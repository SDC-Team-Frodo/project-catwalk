import React from 'react';

const QuantityPicker = (props) => {

  const { max, cartQuantity, setCartQuantity } = props;

  return (
    <input
      id="quantity-select"
      type="number"
      min="1" aria-valuemin="1"
      max={max} aria-valuemax={max}
      value={cartQuantity}
      aria-label="Enter quantity"
      onChange={(event) => setCartQuantity(event.target.value)}
    />
  );
}

export default QuantityPicker;