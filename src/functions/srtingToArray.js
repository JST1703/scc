/*
takes a string of numbers and returns the array of the individual digits
*/

function stringToArray(s) {
  let arr = [];

  for (let i = 0; i < s.length; ++i) {
    arr[i] = parseInt(s[i]);
  }

  return arr;
}

export default stringToArray;
