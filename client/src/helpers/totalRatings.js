const getTotalRatings = (data) => {
  let sum = 0;
  const ratings = Object.keys(data);
  ratings.forEach((rating) => {
    sum += data[rating];
  });
  return sum;
};

export default getTotalRatings;
