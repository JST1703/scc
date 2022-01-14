// given a binary array arr
// returns a two digit number xy
// where x is 1 if the number of ones in arr at an even position is odd, else x is 0
// and y is 1 if the number of ones in arr at an odd position is odd, else y is 0

function binaryCheckSymbol2(arr) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      x += arr[i];
    } else {
      y += arr[i];
    }
  }

  return (x % 2).toString() + (y % 2).toString();
}

export default binaryCheckSymbol2;
