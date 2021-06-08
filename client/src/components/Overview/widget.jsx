import React, { useState, useContext } from 'react';
import Gallery from './Gallery';
import GalleryAside from './GalleryAside';
import Description from './Description';
import Features from './Features'
import ThemeContext from '../../contexts/ThemeContext';
import RatingContext from '../../contexts/RatingContext';
import ProductContext from '../../contexts/ProductContext';
// import '../../overview.sass';


const OverviewContainer = (props) => {

  // contexts
  const theme = useContext(ThemeContext);
  const rating = useContext(RatingContext);
  const product = useContext(ProductContext);

  // states
  const [fullscreenSlider, setFullscreenSlider] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('1');

  return (
    <div id="overview">
      <div className="separator">
        <Gallery />
        <GalleryAside />
      </div>
      <div className="separator">
        <Description />
        <Features />
      </div>
    </div>
  )
};

export default OverviewContainer;
