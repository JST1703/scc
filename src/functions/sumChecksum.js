/* 
given an array of digits
returns the sum of the digits
*/
function sumChecksum(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }

  if (sum < 10) {
    return "0" + sum.toString();
  }

  return sum.toString();
}

export default sumChecksum;
