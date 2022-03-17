import React, { useState } from "react";
import randomBinaryString from "../functions/randomBinaryString";
import hammingDistance from "../functions/hammingDistance";
import ChecksumExercise from "./ChecksumExercise";
import MC from "./MC";
import errormaker from "../functions/errormaker";

/*
Exercise Component

given an encoding, the user must first determine the Hamming Distance of the given code
and then answer some MC questions about its properties
*/

/*
callerFunction is a function used by the caller component after this exercise has been solved

taskNumber is the number defining the property of the encoding
*/
function EncodingDistanceExercise({ callerFunction, taskNumber }) {
  /* 
  encodings[x][y]: 
  x is in {0, 1, 2, 3}, indicating if the encoding has the distance x+2
  unless special case x = 3, which is either a code with distance of 5 or 1
  y is in {0, 1}, being either one of two options of the length of the encoding
  */
  const encodings = [
    // encodings with distance 2
    [
      [
        [0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 1],
      ],
      [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 1, 1, 0, 1, 0],
      ],
    ],

    // encodings with distance 3
    [
      [
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 1],
        [1, 1, 1, 1, 0],
      ],
      [
        [0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1],
      ],
    ],

    // encodings with distance 4
    [
      [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1],
        [1, 1, 0, 0, 1, 1],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0],
        [1, 1, 0, 0, 1, 1, 1],
      ],
    ],

    // encodings with distance 5 or 1
    [
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      ],
      [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    ],
  ];

  // possible questions for the MC part of which only 3 ar picked at random
  const props = [
    "bis zu 1 Fehler erkennen.",
    "bis zu 1 Fehler korrigieren.",
    "bis zu 2 Fehler erkennen.",
    "bis zu 2 Fehler korrigieren.",
    "bis zu 3 Fehler erkennen.",
    "bis zu 4 Fehler erkennen.",
  ];

  // the actual encoding chosen by the task
  // it is one of the pre-calculated encodings shifted by a random string
  const [chosenEncoding] = useState(() => {
    let coinFlip = Math.round(Math.random());
    let sol = encodings[taskNumber][coinFlip];
    let temp = randomBinaryString(sol[0].length);

    for (let i = 0; i < sol.length; ++i) {
      for (let j = 0; j < sol[0].length; ++j) {
        if (temp[j] === 1) {
          sol[i][j] = (sol[i][j] + 1) % 2;
        }
      }
    }

    return sol;
  });

  const checkResult = () => {
    callerFunction();
    console.log(chosenEncoding);
    console.log(hammingDistance(chosenEncoding));
  };

  return (
    <>
      <button onClick={checkResult}>
        <p>überprüfen</p>
      </button>
    </>
  );
}

export default EncodingDistanceExercise;
