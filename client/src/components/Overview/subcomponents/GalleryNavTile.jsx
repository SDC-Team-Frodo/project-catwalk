import React from 'react';

const GalleryNavTile = (props) => {

  const { photo, setSelectedPhotoIndex, index, selected } = props;

  const css = {
    backgroundImage: `url(${photo.url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  let classes = 'gallery-nav-tile';
  if (selected) {
    classes += ' selected';
  }

  return (
    <div
      className={classes}
      style={css}
      onClick={() => setSelectedPhotoIndex(index)}>

    </div>
  );
};

export default GalleryNavTile;