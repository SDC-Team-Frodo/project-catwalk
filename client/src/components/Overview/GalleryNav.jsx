import React, {useState} from 'react';
import GalleryNavTile from './subcomponents/GalleryNavTile';

const GalleryNav = (props) => {

  const { activeStyle } = props;
  let { photos } = activeStyle;

  const [scroll, setScroll] = useState(0);

  const handleScroll = (up) => {
    const nav = document.getElementById('gallery-nav');
    const MIN_HEIGHT = 0,
    MAX_HEIGHT = nav.offsetHeight;

    let nextScroll = scroll;
    const scrollAmount = MAX_HEIGHT;
    if (up) {
      nextScroll = Math.min(scroll - scrollAmount, MAX_HEIGHT);
    } else {
      nextScroll = Math.max(scroll + scrollAmount, MIN_HEIGHT);
    }

    console.log(scroll, nextScroll, scrollAmount)

    nav.scroll({
      top: nextScroll,
      behavior: 'smooth'
    });
    setScroll(nextScroll);
  };

  const scrollUp = () => {
    handleScroll(true);
  }

  const scrollDown = () => {
    handleScroll(false);
  }

  return (
    <div id="outer-gallery-nav">

      <i className="fas fa-chevron-up scroll-up" onClick={scrollUp}></i>
      <div id="gallery-nav">

        {photos.map((photo, index) => <GalleryNavTile key={`gallery-nav-${index}`} photo={photo} index={index}/>)}
      </div>
      <i className="fas fa-chevron-down scroll-down" onClick={scrollDown}></i>
    </div>
  );
};

export default GalleryNav;