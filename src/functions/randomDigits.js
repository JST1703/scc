// returns a random sequence of digits
function randomDigits(arr) {
  // length is between 3 and 6
  let length = Math.floor(Math.random() * 3) + 3;

  const sol = [];

  for (let i = 0; i < length; i++) {
    let temp = Math.floor(Math.random() * 8) + 1;
    sol[i] = temp;
  }

  return sol;
}

export default randomDigits;
