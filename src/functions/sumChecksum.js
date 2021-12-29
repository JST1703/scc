/* given an array of digits
returns the sum of the digits
*/
function nextTenChecksum(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  return sum.toString();
}

export default nextTenChecksum;
