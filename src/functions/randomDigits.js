// returns a random sequence of digits
function randomDigits() {
  // length is between 2 and 5
  let length = Math.floor(Math.random() * 3) + 2;

  const sol = [];

  for (let i = 0; i < length; i++) {
    let temp = Math.floor(Math.random() * 8) + 1;
    sol[i] = temp;
  }

  return sol;
}

export default randomDigits;
