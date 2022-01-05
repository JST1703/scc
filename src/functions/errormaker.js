/*
given a sequence generator seqGen, a checksum function checkSumFunction and a state x

returns an array, where the first elements are the elements of the sequence from the 
sequence generator, and the last element being the checksum of this sequence from
the checkSumFunction.

if x is 0, then with a 50% chance one of the elements of the sequence will be altered
such that it does no longer match the checksum.

if x is not 0, then with a 100% chance one of the elements of the sequence will be altered
such that it does no longer match the checksum.
*/

function errormaker(seqGen, checkSumFunction, x) {
  const arr = seqGen();
  const checksum = checkSumFunction(arr);

  const randomErrorMaker = () => {
    let randomPos = Math.floor(Math.random() * (arr.length - 1));
    let temp = arr[randomPos];
    if (temp === 0) {
      temp = 1;
    } else if (temp === 1) {
      temp = 0;
    } else if (temp <= 6) {
      temp = temp + Math.floor(Math.random() * 2) + 1;
    } else {
      temp = Math.floor(Math.random() * 5) + 1;
    }
    arr[randomPos] = temp;
  };

  switch (x) {
    case 0:
      if (checksum % 2 === 1) {
        randomErrorMaker();
      }
      break;

    default:
      randomErrorMaker();
      break;
  }

  arr[arr.length] = checksum;

  return arr;
}

export default errormaker;
