const getRecommendedAvg = (data) => {
  let avg;
  if (data.true && data.false) {
    avg = Math.round((data.true / (Number(data.true) + Number(data.false))) * 100);
  } else if (data.true) {
    avg = 100;
  } else {
    avg = 0;
  }
  return avg;
};

export default getRecommendedAvg;
