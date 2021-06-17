import React, {useState} from 'react';
import GalleryNavTile from './subcomponents/GalleryNavTile';

const GalleryNav = (props) => {

  const { handleScroll,activeStyle, setSelectedPhotoIndex, selectedPhotoIndex } = props;
  let { photos } = activeStyle;

  const scrollUp = (event) => {
    event.stopPropagation();
    handleScroll(true);
  }

  const scrollDown = (event) => {
    event.stopPropagation();
    handleScroll(false);
  }

  const renderArrows = activeStyle.photos.length > 7;

  return (
    <div id="outer-gallery-nav">

      {renderArrows && <i className="fas fa-chevron-up scroll-up" onClick={scrollUp} aria-label="Scroll image gallery navigation up" />}
      <div id="gallery-nav">

        {photos.map((photo, index) => (
          <GalleryNavTile
            key={`gallery-nav-${index}`}
            aria-label={'View style'}
            photo={photo} index={index}
            setSelectedPhotoIndex={setSelectedPhotoIndex}
            selected={selectedPhotoIndex===index}/>
        ))}
      </div>
      {renderArrows && <i className="fas fa-chevron-down scroll-down" onClick={scrollDown} aria-label="Scroll image gallery navigation down" />}
    </div>
  );
};

export default GalleryNav;