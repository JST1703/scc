import distance from "./distance";

/*
given two sequences of equal length, their checksums and a number x
returns true if the two sequences have a distance of exactly x and their checksums match
else returns false
*/

function nDigitComparer(data1, data2, checksum1, checksum2, x) {
  let data1Len = data1.length;
  let data2Len = data2.length;

  if (data2Len !== data1Len || data2Len <= 0) {
    return false;
  }

  let diff = distance(data1, data2);

  if (diff === x && checksum1 === checksum2) {
    return true;
  }

  return false;
}

export default nDigitComparer;
