import React, { useState } from 'react';
import GalleryNav from './GalleryNav'

const Gallery = (props) => {
  const { activeStyle, fullscreenSlider } = props;

  const ficon = fullscreenSlider ? 'compress' : 'expand';
  const css = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  if (activeStyle) {
    console.log('style', activeStyle);
    css.backgroundImage = `url(${activeStyle.photos[0].url})`;
  }
  return (
    <div
      id="gallery"
      style={css}
      className={props.fullscreenSlider ? 'full' : ''}>
        <GalleryNav activeStyle={activeStyle}/>
      <i
        className={`fas fa-${ficon} float-right`}
        onClick={() => props.setFullscreenSlider(!props.fullscreenSlider)}></i>
    </div>
  );
}

export default Gallery;