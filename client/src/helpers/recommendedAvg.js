const getRecommendedAvg = (data) => (
  Math.round((data.true / (Number(data.true) + Number(data.false))) * 100)
);

export default getRecommendedAvg;
