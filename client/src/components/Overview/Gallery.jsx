import React, { useState, useEffect } from 'react';
import GalleryNav from './GalleryNav'

const Gallery = (props) => {
  const { activeStyle, fullscreenSlider, setFullscreenSlider, selectedPhotoIndex, setSelectedPhotoIndex, zoom, setZoom } = props;

  const ficon = fullscreenSlider ? 'compress' : 'expand';
  const css = {
    backgroundSize: (zoom && fullscreenSlider) ? 'initial' : 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  useEffect(() => {
    const gallery = document.getElementById('gallery');
    if (!zoom) {
      gallery.style.backgroundPosition = 'center';
      gallery.style.backgroundSize = 'cover';
    }

    if (!fullscreenSlider) {
      setZoom(false);
    } else if (zoom) {
      gallery.style.backgroundSize = 'initial';
    }
  }, [zoom, fullscreenSlider]);

  const handleMouseMove = (event) => {
    if (fullscreenSlider && zoom) {
      const gallery = document.getElementById('gallery')
      const rect = gallery.getBoundingClientRect();
      const x = (event.clientX - rect.left) / 1.25;
      const y = (event.clientY - rect.top) / 1.25;
      gallery.style.backgroundPosition = `-${x}px -${y}px`;
    }
  }

  const handleGalleryClick = () => {
    if (!fullscreenSlider) {
      setFullscreenSlider(true);
    } else {
      setZoom(!zoom);
    }
  }

  const handleIconClick = (event) => {
    event.stopPropagation();
    setFullscreenSlider(!fullscreenSlider)
  }

  if (activeStyle) {
    css.backgroundImage = `url(${activeStyle.photos[selectedPhotoIndex].url})`;
  }

  return (
    <div id="gallery-container" className={(fullscreenSlider ? 'full' : '')+ (zoom ? ' zoom' : '')}>
      <div
        id="gallery"
        className={(fullscreenSlider ? 'full' : '')+ (zoom ? ' zoom' : '')}
        style={css}
        aria-label="Image of current product"
        onClick={handleGalleryClick}
        onPointerMove={handleMouseMove}>
           {activeStyle && <GalleryNav
        activeStyle={activeStyle}
        setSelectedPhotoIndex={setSelectedPhotoIndex}
        selectedPhotoIndex={selectedPhotoIndex}/>}
      <i
        className={`fas fa-${ficon} float-right`}
        onClick={handleIconClick} />
      </div>


    </div>
  );
}

export default Gallery;