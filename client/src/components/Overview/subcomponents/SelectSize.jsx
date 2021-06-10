import React from 'react';

const SelectSize = (props) => {

  return (
    <select id="size-select" name="SELECT SIZE" defaultValue="SELECT SIZE">
      <option disabled hidden>SELECT SIZE</option>
      <option>Small</option>
      <option>Medium</option>
      <option>Big Chungus</option>
    </select>
  );
}

export default SelectSize;