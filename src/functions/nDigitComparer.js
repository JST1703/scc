/*
given two sequences of equal length, their checksums and a number x
returns true if the two sequences have a distance of exactly x and their checksums match
else returns false
*/

function nDigitComparer(data1, data2, checksum1, checksum2, x) {
  let diff = 0;
  let data1Len = data1.length;
  let data2Len = data2.length;

  if (data2Len !== data1Len || data2Len <= 0) {
    return false;
  }

  for (let i = 0; i < data1Len; ++i) {
    if (data2[i] !== data1[i]) {
      diff += 1;
    }
  }

  if (diff === x && checksum1 === checksum2) {
    return true;
  }

  return false;
}

export default nDigitComparer;
