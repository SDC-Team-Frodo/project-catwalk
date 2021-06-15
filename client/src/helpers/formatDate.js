const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${monthNames[date.getMonth()]} ${date.getDate() + 1}, ${date.getFullYear()}`;
};

export default formatDate;
