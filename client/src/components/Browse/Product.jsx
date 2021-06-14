/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import Details from './Details';

const Product = (props) => {
  const { name, setProduct, id } = props;
  const [clicked, setClicked] = useState(false);
  return (
    <Modal
      body={(
        <Details
          id={id}
          clicked={clicked}
          setProduct={setProduct}
        />
      )}
      isImage
      image={(
        <div
          className="productDiv"
          type="button"
          onClick={() => {
            setClicked(true);
          }}
        >
          <h2 className="productName hoverGrey">{`${id} : ${name}`}</h2>
        </div>
      )}
    />
  );
};

export default Product;
