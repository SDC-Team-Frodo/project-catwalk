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
  const product = useContext(ProductContext);

  if (DEBUG) {
    console.log(theme);
    console.log(product);
  }

  // states
  const [fullscreenSlider, setFullscreenSlider] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const [styles, setStyles] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  // returns the list of styles at selectedStyleIndex
  const selectedStyle = () => {
    return styles[selectedStyleIndex];
  }

  const submitCart = (event) => {
    event.preventDefault()
    if (selectedStyle === -1 || selectedSizeIndex === -1) {
      alert('Please select a size and quantity');
    } else {
      request.post('cart', {
        sku_id: selectedSizeIndex
      })
        .then(() => console.log('successfully posted to your bag'))
        .catch(console.error);
    }
  };

  useEffect(() => {
    request.get(`products/${product.id}/styles`, {
      productId: product.id
    })
      .then((result) => {
        const styleResults = result.data.results;
        const styleIndex = styleResults.findIndex(s => s['default?']) || 0;

        setSelectedSizeIndex(-1);
        setSelectedStyleIndex(styleIndex);
        setSelectedPhotoIndex(0);
        setCartQuantity(1);
        setStyles(styleResults); // styles nested in {data} of results
      })
      .catch(console.error);
  }, [product]);

  return (
    <div id="overview" onClick={(event) => props.spy(event, "Overview")}>
      <div className="separator">
        <Gallery
          fullscreenSlider={fullscreenSlider}
          setFullscreenSlider={setFullscreenSlider}
          activeStyle={selectedStyle()}
          selectedPhotoIndex={selectedPhotoIndex}
          setSelectedPhotoIndex={setSelectedPhotoIndex}
          zoom={zoom}
          setZoom={setZoom}/>
        <GalleryAside
          fullscreenSlider={fullscreenSlider}
          styles={styles}
          selectedStyleIndex={selectedStyleIndex}
          setSelectedStyleIndex={setSelectedStyleIndex}
          activeStyle={selectedStyle()}
          selectedSizeIndex={selectedSizeIndex}
          setSelectedSizeIndex={setSelectedSizeIndex}
          cartQuantity={cartQuantity}
          setCartQuantity={setCartQuantity}
          submitCart={submitCart}/>
      </div>
      <div className="separator">
        <Description product={product}/>
        <Features />
      </div>
    </div>
  )
};

export default OverviewContainer;
