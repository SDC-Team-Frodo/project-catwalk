import React, { useState, useEffect } from 'react';
import request from '../../requests';
import Product from './Product';
import allProducts from './AllProducts';

const Browse = (props) => {
  const { setProduct } = props;
  const [products, setProducts] = useState(allProducts);

  // useEffect(() => {
  //   if (products.length === 0) {
  //     request.get('products', {
  //       count: 200,
  //     }).then((res) => {
  //       setProducts(res.data);
  //     }).catch((err) => {
  //       console.error(err);
  //     });
  //   }
  // }, [products]);

  return (
    <div id="BrowseList">
      <h1>Browse Products</h1>
      {products.map((product, i) => {
        return <Product id={product.id} setProduct={setProduct} key={i} name={product.name} />;
      })}
    </div>
  );
};

export default Browse;
