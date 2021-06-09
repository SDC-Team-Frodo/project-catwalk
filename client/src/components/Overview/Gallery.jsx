import React, { useState } from 'react';

const Gallery = (props) => {
  const { style, fullscreenSlider } = props;

  const ficon = fullscreenSlider ? 'compress' : 'expand';
  const css = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'rileftght'
  };

  if (style) {
    console.log('style', style);
    css.backgroundImage = `url(${style.photos[0].url})`;
  }
  return (
    <div
      id="gallery"
      style={css}
      className={props.fullscreenSlider ? 'full' : ''}>
      <i
        className={`fas fa-${ficon} float-right`}
        onClick={() => props.setFullscreenSlider(!props.fullscreenSlider)}></i>
    </div>
  );
}

export default Gallery;