// given a binary array arr
// returns 1 if the number of ones in arr is odd, else returns 0
function binaryCheckSymbol1(arr) {
  let sol = 0;

  for (let i = 0; i < arr.length; i++) {
    sol += arr[i];
  }

  return (sol % 2).toString();
}

export default binaryCheckSymbol1;
