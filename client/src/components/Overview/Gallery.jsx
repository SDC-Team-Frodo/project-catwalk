import React, { useState } from 'react';

const Gallery = (props) => {

  return (
    <div id="gallery" className={props.fullscreenSlider ? 'full' : ''}>
      <i className="fas fa-expand float-right" onClick={() => props.setFullscreenSlider(!props.fullscreenSlider)}></i>
    </div>
  );
}

export default Gallery;