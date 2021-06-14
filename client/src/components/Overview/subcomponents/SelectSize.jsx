import React from 'react';
import _ from 'lodash';

const SelectSize = (props) => {

  const { activeStyle, selectedSizeIndex, setSelectedSizeIndex } = props;
  const { skus } = activeStyle;

  let size = 'SELECT SIZE'
  if (activeStyle.skus[selectedSizeIndex]) {
    size = activeStyle.skus[selectedSizeIndex].size
  }

  let availableStyles = [];

  if (activeStyle && activeStyle.skus) {
    availableStyles = _.map(activeStyle.skus, (sku, key) => {
      return (
        {
          ...sku,
          sku: key
        }
      )
    });
    availableStyles = _.filter(availableStyles, (sku => sku.quantity > 0));
  }

  const handleClick = (event) => {
    const sku = event.target.value;
    setSelectedSizeIndex(sku);
  };

  if (availableStyles.length === 0) {
    return <select id="size-select" name="SOLD OUT" defaultValue="SOLD OUT" disabled>
      <option disabled hidden>SOLD OUT</option>
    </select>
  }


  return (
    <>
      <select id="size-select" name="SELECT SIZE" value={size} onChange={handleClick}>
        <option disabled hidden>{size}</option>
        {_.map(availableStyles, (sku) => {
            return (
              <option
                key={`size-${sku.size}`}
                value={sku.sku}>
                  {sku.size}
              </option>
            )
          })
        }
      </select>
    </>
  );
}

export default SelectSize;