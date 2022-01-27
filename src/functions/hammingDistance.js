import distance from "./distance";

/* 
given an array of arrays of equal length
returns the hamming distance of the array
*/

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
