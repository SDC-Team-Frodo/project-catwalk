// this will look through a given array of strings for any word matches with
// a given String, and will return an array of the strings that have more or
// equal to the number of matched words as the strength number given to the function.

const searchFunc = (searchStr, containerArr, strength) => {
  const searchArr = searchStr.split(' ');
  const result = [];
  const hasNmatches = (compArr, n) => {
    let matchedWords = 0;
    for (let j = 0; j < searchArr.length; j += 1) {
      for (let g = 0; g < compArr.length; g += 1) {
        if (searchArr[j].toLowerCase() === compArr[g].toLowerCase()) {
          matchedWords += 1;
        }
      }
    }
    return matchedWords >= n;
  };
  for (let i = 0; i < containerArr.length; i += 1) {
    if (hasNmatches(containerArr[i].question_body.split(' '), strength)) {
      result.push(containerArr[i]);
    }
  }
  return result;
};

export default searchFunc;
