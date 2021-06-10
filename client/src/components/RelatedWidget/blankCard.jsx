import React, { useContext } from 'react';
import ProductContext from '../../contexts/ProductContext';

const BlankCard = () => {
  const product = useContext(ProductContext)

  function addOutfit() {
    // document.getElementById('blank').style.display = 'none';
    console.log(product.id)

    localStorage.setItem('outfit', product.id);
    console.log('this is in local storage', localStorage.getItem('outfit'))

  }

  return (
    <div className="card plus" onClick={addOutfit} id="blank">
      +
      <br />
      Add Current Product To
      <br />
      Outfits
    </div>
  );
};

export default BlankCard;
