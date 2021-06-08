// this function takes in an arr of objects and will sork the array based on
// the comparable value in each of the objects from highest to lowest

const organize = (arr, comparable) => {
  const result = [];
  const initialLength = arr.length;
  while (result.length < initialLength) {
    let highest = arr[0];
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][comparable] > highest[comparable]) {
        highest = arr[i];
        index = i;
      }
    }
    result.push(highest);
    arr.splice(index, 1);
  }
  return result;
};

export default organize;