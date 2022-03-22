// returns a random binary sequence of length n
// if n <= 0, then the length is random between 3 and 7
function randomBinaryString(n) {
  let length = n;
  if (length <= 0) {
    // length is between 3 and 7
    length = Math.round(Math.random() * 4) + 3;
  }

  const sol = [];

  for (let i = 0; i < length; i++) {
    let temp = Math.round(Math.random());
    sol[i] = temp;
  }

  return sol;
}

export default randomBinaryString;
