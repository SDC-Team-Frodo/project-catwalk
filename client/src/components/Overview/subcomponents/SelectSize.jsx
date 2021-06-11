import React from 'react';
import _ from 'lodash';

const SelectSize = (props) => {

  const { activeStyle, selectedSizeIndex, setSelectedSizeIndex } = props;
  const { skus } = activeStyle;

  let size = 'SELECT SIZE'
  if (activeStyle.skus[selectedSizeIndex]) {
    size = activeStyle.skus[selectedSizeIndex].size
  }

  console.log('selectedSizeIndex', selectedSizeIndex)
  console.log('size', size);

  const handleClick = (event) => {
    const sku = event.target.value;
    setSelectedSizeIndex(sku);
  };


  console.log(props)
  return (
    <>
      <select id="size-select" name="SELECT SIZE" value={size} onChange={handleClick}>
        <option disabled hidden>{size}</option>
        {skus && _.map(skus, (sku, key) => <option key={`size-${sku.size}`} value={key}>{sku.size}</option>)}

      </select>
    </>
  );
}

export default SelectSize;