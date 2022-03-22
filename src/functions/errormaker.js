/*
given a sequence and a state x

returns a changed sequence depending on the value of x

default: changes one digit of the sequence with probability of 50%

case x === 1: changes one digit of the sequence

case x === 2: changes two different digits of the sequence

case x === 3: changes two different digits of the sequence
*/

// changes the number n
function changeNumber(n) {
  let temp = n;
  if (temp === 0) {
    temp = 1;
  } else if (temp === 1) {
    temp = 0;
  } else if (temp <= 6) {
    temp = temp + Math.round(Math.random() * 2) + 1;
  } else {
    temp = Math.round(Math.random() * 5) + 1;
  }
  return temp;
}

// makes one random change in the sequence
function randomErrorMaker1(seq) {
  let randomPos = Math.round(Math.random() * (seq.length - 1));
  seq[randomPos] = changeNumber(seq[randomPos]);
  return;
}

// makes two random changes in the sequence
function randomErrorMaker2(seq) {
  let randomPos1 = Math.round(Math.random() * (seq.length - 1));
  let randomPos2 = Math.round(Math.random() * (seq.length - 1));
  while (randomPos2 === randomPos1) {
    randomPos2 = Math.round(Math.random() * (seq.length - 1));
  }
  seq[randomPos1] = changeNumber(seq[randomPos1]);
  seq[randomPos2] = changeNumber(seq[randomPos2]);
  return;
}

// makes three random changes in the sequence
function randomErrorMaker3(seq) {
  let randomPos1 = Math.round(Math.random() * (seq.length - 1));
  let randomPos2 = Math.round(Math.random() * (seq.length - 1));
  let randomPos3 = Math.round(Math.random() * (seq.length - 1));
  while (randomPos2 === randomPos1) {
    randomPos2 = Math.round(Math.random() * (seq.length - 1));
  }
  while (randomPos3 === randomPos1 || randomPos3 === randomPos2) {
    randomPos3 = Math.round(Math.random() * (seq.length - 1));
  }
  seq[randomPos1] = changeNumber(seq[randomPos1]);
  seq[randomPos2] = changeNumber(seq[randomPos2]);
  seq[randomPos3] = changeNumber(seq[randomPos3]);
  return;
}

// called by reference
function errormaker(seq, x) {
  switch (x) {
    case 1:
      randomErrorMaker1(seq);
      break;

    case 2:
      randomErrorMaker2(seq);
      break;

    case 3:
      randomErrorMaker3(seq);
      break;

    default:
      let coin = Math.round(Math.random());
      if (coin === 1) {
        randomErrorMaker1(seq);
      }
      break;
  }

  return;
}

export default errormaker;
