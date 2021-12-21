// arr is an array of ints
function checksum(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  const sol = 10 - (sum % 10);
  return sol.toString();
}

export default checksum;
