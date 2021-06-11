import React from 'react';

const QuantityPicker = (props) => {

  const {cartQuantity, setCartQuantity} = props;
  // console.log(props);

  return (
    <input id="quantity-select" type="number" min="1" value={cartQuantity} onChange={(event) => setCartQuantity(event.target.value)}/>
  );
}

export default QuantityPicker;