import React, { useContext } from 'react';
import _ from 'lodash';
import Feature from './subcomponents/Feature'
import ProductContext from '../../contexts/ProductContext';

const Features = (props) => {

  const product = useContext(ProductContext);
  const { features } = product

  //

  return (
    <div id="features">
      <section id="fcontainer" className="left-border left-margin large-top-margin">
      {features.map((feature, index) => <Feature feature={feature} key={`feature-${index}`} />
      )}
      </section>
    </div>
  );
};

export default Features;