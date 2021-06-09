import React, { useState, useContext, useEffect } from 'react';
import request from '../../requests';
import Gallery from './Gallery';
import GalleryAside from './GalleryAside';
import Description from './Description';
import Features from './Features';
import ThemeContext from '../../contexts/ThemeContext';
import RatingContext from '../../contexts/RatingContext';
import ProductContext from '../../contexts/ProductContext';

const DEBUG = false;

const OverviewContainer = (props) => {
  // contexts
  const theme = useContext(ThemeContext);
  const rating = useContext(RatingContext);
  const product = useContext(ProductContext);

  if (DEBUG) {
    console.log(theme);
    console.log(rating);
    console.log(product);
  }

  // states
  const [fullscreenSlider, setFullscreenSlider] = useState(false);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(1);
  const [styles, setStyles] = useState([]);

  // returns the list of styles at selectedStyleIndex
  const selectedStyle = () => {
    return styles[selectedStyleIndex];
  }

  useEffect(() => {
    request.get(`products/${product.id}/styles`, {
      productId: product.id
    })
      .then((result) => {
        const styleResults = result.data.results;
        const styleIndex = styleResults.findIndex(s => s['default?']) || 0;

        setSelectedStyleIndex(styleIndex);
        setStyles(styleResults); // styles nested in {data} of results
      })
      .catch(console.error);
  }, [product]);

  return (
    <div id="overview">
      <div className="separator">
        <Gallery
          fullscreenSlider={fullscreenSlider}
          setFullscreenSlider={setFullscreenSlider}
          style={selectedStyle()}/>
        <GalleryAside
          fullscreenSlider={fullscreenSlider}
          product={product}
          styles={styles}
          selectedStyleIndex={selectedStyleIndex}
          setSelectedStyleIndex={setSelectedStyleIndex}/>
      </div>
      <div className="separator">
        <Description product={product}/>
        <Features />
      </div>
    </div>
  )
};

export default OverviewContainer;
