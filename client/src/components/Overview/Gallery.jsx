import React, { useState } from 'react';
import GalleryNav from './GalleryNav'

const Gallery = (props) => {
  const { activeStyle, fullscreenSlider, setFullscreenSlider, selectedPhotoIndex, setSelectedPhotoIndex, zoom, setZoom } = props;

  const ficon = fullscreenSlider ? 'compress' : 'expand';
  const css = {
    backgroundSize: zoom ? 'initial' : 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };


  const handleMouseMove = (event) => {
    if (fullscreenSlider && zoom)  {
      var rect = event.target.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      event.target.style.backgroundPosition = `-${x}px -${y}px`;
    }
  }

  const recenter = () => {
    const target = document.getElementById('gallery');
    target.style.backgroundPosition = 'center';
    target.style.backgroundSize = 'cover';
  }

  const unzoom = () => {
    recenter();
    setZoom(false);
  }

  const handleGalleryClick = (event) => {
    if (zoom) {
      unzoom();
    } else if (!fullscreenSlider) {
      setFullscreenSlider(true);
    } else if (fullscreenSlider) {
      setZoom(true);
    }
  }

  const handleIconClick = () => {
    if (!fullscreenSlider) {
      setFullscreenSlider(true);
    } else {
      setFullscreenSlider(false);
      recenter();
    }
  }

  if (activeStyle) {
    css.backgroundImage = `url(${activeStyle.photos[selectedPhotoIndex].url})`;
  }

  return (
    <div id="gallery-container" className={(fullscreenSlider ? 'full' : '')+ (zoom ? ' zoom' : '')}>

      {activeStyle && <GalleryNav
        activeStyle={activeStyle}
        setSelectedPhotoIndex={setSelectedPhotoIndex}
        selectedPhotoIndex={selectedPhotoIndex}/>}
      <i
        className={`fas fa-${ficon} float-right`}
        onClick={handleIconClick} />
      <div
        id="gallery"
        style={css}
        onClick={handleGalleryClick}
        onPointerMove={handleMouseMove}>
      </div>
    </div>
  );
}

export default Gallery;