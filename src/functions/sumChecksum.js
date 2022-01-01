/* given an array of digits
returns the sum of the digits
*/
function sumChecksum(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  return sum;
}

export default sumChecksum;
