const getAverageRating = (data) => {
  let sum = 0;
  const ratings = Object.keys(data);
  ratings.forEach((rating) => {
    sum += rating * data[rating];
  });
  return Math.round((sum / ratings.length) * 10) / 10;
};

export default getAverageRating;
