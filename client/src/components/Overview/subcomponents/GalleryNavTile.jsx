import React from 'react';

const GalleryNavTile = (props) => {

  const { photo } = props;

  const css = {
    backgroundImage: `url(${photo.url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };


  return (
    <div className="gallery-nav-tile" style={css}>

    </div>
  );
};

export default GalleryNavTile;