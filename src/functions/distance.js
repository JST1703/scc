/*
given two sequences of equal length, returns the number of differences, 
i.e. the Hamming-Distance
*/

function distance(data1, data2) {
  let data1Len = data1.length;
  let data2Len = data2.length;

  if (data2Len !== data1Len || data2Len <= 0) {
    return 0;
  }

  let delta = 0;

  for (let i = 0; i < data1Len; ++i) {
    if (data1[i] !== data2[i]) {
      delta += 1;
    }
  }

  return delta;
}

export default distance;
