const helpers = {
  compareFeatures(arrFeat1, arrFeat2) {
    const combinedFeatures = {};
    const feature1 = {};
    const feature2 = {};

    arrFeat1.forEach((index) => {
      feature1[index.feature] = index.value;
    });
    arrFeat2.forEach((index) => {
      feature2[index.feature] = index.value;
    });

    Object.keys(feature1).forEach((key) => {
      if (feature1[key] && feature2[key]) {
        combinedFeatures[key] = [feature1[key], feature2[key]];
        delete feature2[key];
      } else {
        combinedFeatures[key] = [feature1[key], ''];
      }
    });
    Object.keys(feature2).forEach((key) => {
      combinedFeatures[key] = ['', feature2[key]];
    });
    return combinedFeatures;
  },
};

export default helpers;
