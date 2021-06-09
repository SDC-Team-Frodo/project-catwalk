const getRecommendedAvg = (data) => Math.round((data.true / (data.true + data.false)) * 100);

export default getRecommendedAvg;
