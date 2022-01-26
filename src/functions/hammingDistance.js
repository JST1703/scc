/* 
given an array of arrays of equal length
returns the hamming distance of the array
*/

// calculates the hamming distance between 2 elements
function distance(x, y) {
  let d = 0;

  for (let i = 0; i < x.length; ++i) {
    if (x[i] !== y[i]) {
      d += 1;
    }
  }

  return d;
}

// calculates the hamming distance of data
function hammingDistance(data) {
  let hd = Infinity;

  for (let i = 1; i < data.length; ++i) {
    for (let j = 0; j < i; ++j) {
      let temp = distance(data[i], data[j]);
      if (temp < hd) {
        hd = temp;
      }
    }
  }

  return hd;
}

export default hammingDistance;
