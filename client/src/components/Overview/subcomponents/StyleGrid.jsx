import React from 'react';
import Style from "./Style"

const StyleGrid = (props) => {
  const { styles, selectedStyleIndex, setSelectedStyleIndex } = props;

  return (
    <div id="style-grid">
      {styles.map((style, index) =>
        <Style key={`style-${style.style_id}`} style={style} setSelectedStyleIndex={setSelectedStyleIndex} selected={selectedStyleIndex===index} index={index} />
      )}
    </div>
  );

};

export default StyleGrid;