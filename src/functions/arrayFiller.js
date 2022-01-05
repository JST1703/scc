/*
given number n and function f
returns an array of n elements
where each element is created
by the function f
*/

function arrayFiller(n, f) {
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr[i] = f();
  }

  return arr;
}

export default arrayFiller;
