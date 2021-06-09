import React from 'react';
import Style from "./Style"

const StyleGrid = (props) => {
  const { styles } = props;

  return (
    <div id="style-grid">
      {styles.map((style, index) =>
        <Style key={`style-${style.style_id}`} style={style} />
      )}
    </div>
  );

};

export default StyleGrid;