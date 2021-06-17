import React, { useState, useEffect } from 'react';
import GalleryNav from './GalleryNav';

const Gallery = (props) => {

  const [scroll, setScroll] = useState(0);

  const { activeStyle, fullscreenSlider, setFullscreenSlider, selectedPhotoIndex, setSelectedPhotoIndex, zoom, setZoom } = props;

  const ficon = fullscreenSlider ? 'compress' : 'expand';
  const css = {
    backgroundSize: (zoom && fullscreenSlider) ? 'initial' : 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
  };

  const handleScroll = (up) => {
    const nav = document.getElementById('gallery-nav');
    const MIN_HEIGHT = 0;
    const MAX_HEIGHT = nav.offsetHeight;

    let nextScroll = scroll;
    const scrollAmount = MAX_HEIGHT;
    if (up) {
      nextScroll = Math.min(scroll - scrollAmount, MAX_HEIGHT);
    } else {
      nextScroll = Math.max(scroll + scrollAmount, MIN_HEIGHT);
    }

    nav.scroll({
      top: nextScroll,
      behavior: 'smooth',
    });
    setScroll(nextScroll);
  };

  const handleGalleryClick = () => {
    if (!fullscreenSlider) {
      setFullscreenSlider(true);
    } else {
      setZoom(!zoom);
    }
  };

  const handleIconClick = (event) => {
    event.stopPropagation();
    setFullscreenSlider(!fullscreenSlider);
  };

  const handleArrowClick = (event, amount) => {
    event.stopPropagation();
    const next = selectedPhotoIndex + amount;
    if (next > 5) {
      handleScroll(false);
    } else {
      handleScroll(true);
    }
    setSelectedPhotoIndex(next);
  };

  if (activeStyle) {
    css.backgroundImage = `url(${activeStyle.photos[selectedPhotoIndex].url})`;
  }

  const maxPhotoIndex = activeStyle && activeStyle.photos ? activeStyle.photos.length - 1 : 0;

  const renderLeftArrow = !zoom && selectedPhotoIndex !== 0;
  const renderRightArrow = !zoom && selectedPhotoIndex !== maxPhotoIndex;

  return (
    <div id="gallery-container" className={(fullscreenSlider ? 'full' : '') + (zoom ? ' zoom' : '')}>
      <div
        id="gallery"
        className={(fullscreenSlider ? 'full' : '') + (zoom ? ' zoom' : '')}
        style={css}
        aria-label="Image of current product"
        onClick={handleGalleryClick}
        onPointerMove={handleMouseMove}>
        {renderLeftArrow && <i className="fas fa-arrow-left scroll-left" onClick={(event) => handleArrowClick(event, -1)}/>}
        {renderRightArrow && <i className="fas fa-arrow-right scroll-right" onClick={(event) => handleArrowClick(event, 1)}/>}
      {activeStyle && <GalleryNav
        activeStyle={activeStyle}
        setSelectedPhotoIndex={setSelectedPhotoIndex}
        selectedPhotoIndex={selectedPhotoIndex}
        handleScroll={handleScroll}/>}
      <i
        className={`fas fa-${ficon} float-right`}
        onClick={handleIconClick} />
      </div>
    </div>
  );
}

export default Gallery;