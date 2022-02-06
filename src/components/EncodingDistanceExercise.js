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
*/
function EncodingDistanceExercise({ callerFunction }) {
  // used if RNG fails;
  const backupEncoding = [
    [1, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 1],
  ];

  // Length of the code words, between 5 and 9
  const [codeLength] = useState(Math.floor(Math.random() * 5) + 5);

  // Number of elements in the code, between 3 and 5
  const [codeSize, setCodeSize] = useState(Math.floor(Math.random() * 3) + 3);

  // the code
  const [encoding, setEncoding] = useState(
    Array.from({ length: codeSize }, () => {
      return randomBinaryString(codeLength);
    })
  );

  // hamming distance of the code
  const [hd, setHD] = useState(hammingDistance(encoding));

  // possible questions for the MC part
  const props = [
    "bis zu 1 Fehler erkennen.",
    "bis zu 1 Fehler korrigieren.",
    "bis zu 2 Fehler erkennen.",
    "bis zu 2 Fehler korrigieren.",
    "bis zu 3 Fehler erkennen.",
    "bis zu 4 Fehler erkennen.",
  ];

  // answer key for MC part
  const [answerKey, setAnswerKey] = useState(() => {
    switch (hd) {
      case 1:
        return [false, false, false, false, false, false];
      case 2:
        return [true, false, false, false, false, false];
      case 3:
        return [true, true, true, false, false, false];
      case 4:
        return [true, true, true, false, true, false];
      case 5:
        return [true, true, true, true, true, true];
      default:
        return [false, false, false, false, false, false];
    }
  });

  // selects 3 random properties of the possible MC questions
  const [randomPicker] = useState(() => {
    let sol = [0, 0, 0, 0, 0, 0, 0];
    errormaker(sol, 3);
    return sol;
  });

  // effective MC questions and effective answer key
  let mcQuestions = [];
  let mcAnswerkey = [];
  for (let i = 0; i < props.length; ++i) {
    if (randomPicker[i] === 1) {
      mcQuestions.push(props[i]);
      mcAnswerkey.push(answerKey[i]);
    }
  }

  /*
  if hd === 0, then we have duplicates in the code. We fall back to backup
  in order to save computation time.
  */
  if (hd === 0) {
    setEncoding(backupEncoding);
    setHD(5);
    setCodeSize(3);
    setAnswerKey([true, true, true, true, true, true]);
  }

  const encodingRender = () => {
    let sol = [];
    for (let i = 0; i < codeSize; ++i) {
      sol.push(<div key={i}>{encoding[i]}</div>);
    }
    return sol;
  };

  /*
  variable for the task state
  "": not answered yet
  true: correctly answered
  false: answered, but wrong
  */
  const [taskState, setTaskState] = useState("");

  return (
    <div className="EDE">
      {encodingRender()}
      <ChecksumExercise
        onCorrect={() => setTaskState(true)}
        onWorong={() => setTaskState(false)}
        sequence={[
          "H",
          "a",
          "m",
          "m",
          "i",
          "n",
          "g",
          " ",
          "A",
          "b",
          "s",
          "t",
          "a",
          "n",
          "d",
          ":",
        ]}
        checksumFunction={(x) => {
          return hd.toString();
        }}
      />
      {taskState === false && (
        <div>
          <p>
            Um fortfahren zu können, müssen Sie die korrekte Antwort eintragen.
          </p>
        </div>
      )}
      {taskState === true && (
        <div>
          <MC
            callerFunction={callerFunction}
            question={"Mit dieser Kodierung kann man..."}
            options={mcQuestions}
            answerKey={mcAnswerkey}
            textOnCorrect={"Korrekt."}
            textOnWrong={
              "Falsch. Betrachten Sie nochmal die gegebenen Formeln."
            }
          />
        </div>
      )}
    </div>
  );
}

export default EncodingDistanceExercise;
