import React from 'react';
import _ from 'lodash';

const SelectSize = (props) => {

  const { activeStyle } = props;
  const { skus } = activeStyle;
  console.log(activeStyle)
  return (
    <select id="size-select" name="SELECT SIZE" defaultValue="SELECT SIZE">
      <option disabled hidden>SELECT SIZE</option>
      {skus && _.map(skus, (sku, key) => <option key={`size-${sku.size}`}>{sku.size}</option>)}

    </select>
  );
}

export default SelectSize;