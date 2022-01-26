import React, { useState } from "react";
import randomBinaryString from "../functions/randomBinaryString";
import hammingDistance from "../functions/hammingDistance";
import ChecksumExercise from "./ChecksumExercise";

/*
Exercise Component

given an encoding, the user must first determine the Hamming Distance of the given code
and then answer some MC questions about its properties

*/

/*
callerFunction is a function used by the caller component after this exercise has been solved
*/

// used if RNG fails; (7,4) - Hamming Code
const backupEncoding = [
  [1, 0, 1, 0, 1, 0, 1],
  [0, 1, 1, 0, 0, 1, 1],
  [0, 0, 0, 1, 1, 1, 1],
];

function EncodingDistanceExercise({ callerFunction }) {
  // Length of the code words, between 5 and 8
  const [codeLength] = useState(Math.floor(Math.random() * 3) + 5);

  // Number of elements in the code, between 4 and 7
  const [codeSize, setCodeSize] = useState(Math.floor(Math.random() * 3) + 4);

  // the code
  const [encoding, setEncoding] = useState(
    Array.from({ length: codeSize }, () => {
      return randomBinaryString(codeLength);
    })
  );

  // hamming distance of the code
  const [hd, setHD] = useState(hammingDistance(encoding));

  /*
  if hd === 0, then we have duplicates in the code. We fall back to backup
  in order to save computation time.
  */
  if (hd === 0) {
    setEncoding(backupEncoding);
    setHD(4);
    setCodeSize(3);
  }

  const encodingRender = () => {
    let sol = [];
    for (let i = 0; i < codeSize - 1; ++i) {
      sol.push(<div key={i}>{encoding[i]}</div>);
    }
    return sol;
  };

  // boolean, if true, subtask A is solved
  const [solvedA, setSolvedA] = useState("");
  return (
    <div className="EDE">
      {encodingRender()}
      <ChecksumExercise
        onCorrect={() => setSolvedA(true)}
        onWorong={() => setSolvedA(false)}
        sequence={encoding[codeSize - 1]}
        checksumFunction={(x) => {
          return hd.toString();
        }}
      />
      {solvedA === false && (
        <div>
          <p>
            Um fortfahren zu können, müssen Sie die korrekte Antwort eintragen.
          </p>
        </div>
      )}
      {solvedA === true && (
        <div>
          <p>TODO</p>
        </div>
      )}
    </div>
  );
}

export default EncodingDistanceExercise;
