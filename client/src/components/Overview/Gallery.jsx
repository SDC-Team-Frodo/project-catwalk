import React, { useState } from 'react';
import GalleryNav from './GalleryNav'

const Gallery = (props) => {
  const { activeStyle, fullscreenSlider, selectedPhotoIndex, setSelectedPhotoIndex } = props;

  const ficon = fullscreenSlider ? 'compress' : 'expand';
  const css = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  if (activeStyle) {
    css.backgroundImage = `url(${activeStyle.photos[selectedPhotoIndex].url})`;
  }
  return (
    <div
      id="gallery"
      style={css}
      className={props.fullscreenSlider ? 'full' : ''}>
        {activeStyle && <GalleryNav
          activeStyle={activeStyle}
          setSelectedPhotoIndex={setSelectedPhotoIndex}
          selectedPhotoIndex={selectedPhotoIndex}/>}
      <i
        className={`fas fa-${ficon} float-right`}
        onClick={() => props.setFullscreenSlider(!props.fullscreenSlider)}></i>
    </div>
  );
}

export default Gallery;