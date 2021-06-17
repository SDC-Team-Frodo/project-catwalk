import React from 'react';
import _ from 'lodash';

const SelectSize = (props) => {

  const {
    availableStyles,
    activeStyle, selectedSizeIndex,
    setSelectedSizeIndex, setCartQuantity,
  } = props;

  let size = 'SELECT SIZE';
  if (activeStyle.skus[selectedSizeIndex]) {
    size = activeStyle.skus[selectedSizeIndex].size;
  }

  const handleClick = (event) => {
    const sku = event.target.value;
    setSelectedSizeIndex(sku);
    setCartQuantity(1);
  };

  if (availableStyles.length === 0) {
    return (
      <select
        id="size-select"
        name="SOLD OUT"
        defaultValue="SOLD OUT"
        disabled
        aria-label="Sold out!"
      >
        <option disabled hidden>SOLD OUT</option>
      </select>
    );
  }

  return (
    <>
      <select
        id="size-select"
        name="SELECT SIZE"
        value={size}
        onChange={handleClick}
        aria-label="Select your size."
      >
        <option disabled hidden>{size}</option>
        {_.map(availableStyles, (sku) => (
          <option
            aria-label={`Size: ${sku.size}`}
            key={`size-${sku.size}`}
            value={sku.sku}
          >
            {sku.size}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectSize;
