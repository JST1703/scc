/* given an array of digits
returns a checksum symbol a
where a is the missing digit
to the next 10 of the sum of
the given digits
*/
function nextTenChecksum(arr) {
  let sol = 0;
  for (const item of arr) {
    sol += item;
  }
  sol = 10 - (sol % 10);

  if (sol === 10) {
    sol = 0;
  }
  return sol.toString();
}

export default nextTenChecksum;
