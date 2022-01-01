/* given an array of digits
returns a checksum symbol a
where a is the missing digit
to the next 10 of the sum of
the given digits
*/
function nextTenChecksum(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  const sol = 10 - (sum % 10);

  if (sol === 10) {
    return 0;
  }
  return sol;
}

export default nextTenChecksum;
