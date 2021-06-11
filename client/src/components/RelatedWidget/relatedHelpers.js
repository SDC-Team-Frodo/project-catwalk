const helpers = {
  compareFeatures(...features) {
    const [feature1, feature2] = features;
    const combinedFeatures = {};
    Object.keys(feature1).forEach((key) => {
      if (feature1[key] && feature2[key]) {
        combinedFeatures[key] = [feature1[key], feature2[key]];
        delete feature2[key];
      } else {
        combinedFeatures[key] = [feature1[key], '']
      }
    });
    Object.keys(feature2).forEach((key) => {
      combinedFeatures[key] = ['', feature2[key]];
    });
    return combinedFeatures;
  },
};

export default helpers;
