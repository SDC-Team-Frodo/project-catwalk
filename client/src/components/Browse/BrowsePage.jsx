import React, { useState, useEffect } from 'react';
import request from '../../requests';
import Product from './Product';
import allProducts from './AllProducts';

const Browse = (props) => {
  const { setProduct } = props;
  const [displayedProducts, setDisplayedProducts] = useState([0, 10]);
  const [products, setProducts] = useState(allProducts.slice(...displayedProducts));

  useEffect(() => {
    setProducts(allProducts.slice(...displayedProducts));
  }, [displayedProducts]);

  return (
    <div id="BrowseList">
      <h1>Browse Products</h1>
      {products.map((product, i) => {
        return <Product id={product.id} setProduct={setProduct} key={i} name={product.name} />;
      })}
      {displayedProducts[0] > 0 && (
        <button
          type="button"
          id="previouseBrowse"
          className="hoverGreen"
          onClick={() => {
            setDisplayedProducts([displayedProducts[0] - 10, displayedProducts[1] - 10]);
          }}
        >
          {'<'}
        </button>
      )}
      <button
        type="button"
        id="nextBrowse"
        className="hoverGreen"
        onClick={() => {
          setDisplayedProducts([displayedProducts[0] + 10, displayedProducts[1] + 10]);
        }}
      >
        {'>'}
      </button>
      <h3 id="curProductCount">{`${displayedProducts[0]} to ${displayedProducts[1]}`}</h3>
    </div>
  );
};

export default Browse;
