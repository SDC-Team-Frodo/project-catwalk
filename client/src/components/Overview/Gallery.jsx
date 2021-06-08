import React, { useState } from 'react';

const Gallery = (props) => {
  const ficon = props.fullscreenSlider ? 'compress' : 'expand';
  return (
    <div id="gallery" className={props.fullscreenSlider ? 'full' : ''}>
      <i className={`fas fa-${ficon} float-right`} onClick={() => props.setFullscreenSlider(!props.fullscreenSlider)}></i>
    </div>
  );
}

export default Gallery;