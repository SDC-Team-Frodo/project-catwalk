import React from 'react';

const Style = (props) => {
  const { index, style, selected, setSelectedStyleIndex } = props;

  const css = {
    backgroundImage: `url(${style.photos[0].thumbnail_url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  if (selected) {
    css.border =  '.1em solid yellow';
  }

  return (
    <div aria-label={'Style: ' + style.name} className="style-tile" style={css} onClick={() => setSelectedStyleIndex(index)}>

    </div>
  );
}

export default Style;