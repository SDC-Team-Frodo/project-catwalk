import React from 'react';

const Feature = (props) => {

  const {feature} = props;

  return (
    <>
      <i className="fas fa-check"></i><strong>{feature.feature}</strong> {feature.value}<br />
    </>
  );
}

export default Feature;