import React from 'react';

const GalleryNavTile = (props) => {

  const {
    photo, setSelectedPhotoIndex, index, selected,
  } = props;

  const css = {
    backgroundImage: `url(${photo.url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  let classes = 'gallery-nav-tile';
  if (selected) {
    classes += ' selected';
  }

  const handleClick = (event) => {
    event.stopPropagation();
    setSelectedPhotoIndex(index);
  };

  return (
    <div
      className={classes}
      style={css}
      onClick={handleClick} />
  );
};

export default GalleryNavTile;