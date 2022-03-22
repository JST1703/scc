import React, { useState } from "react";
import randomBinaryString from "../functions/randomBinaryString";
import hammingDistance from "../functions/hammingDistance";
import TextExercise from "../components/TextExercise";
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
  variable for the task state
  0: not answered yet
  1: one of the subtasks answered
  2: both of the subtask answered
  */
  const [taskState, setTaskState] = useState(0);

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
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      ],
    ],
  ];

  // possible questions for the MC part of which only 3 ar picked at random
  const props = [
    <span>bis zu 1 Fehler erkennen</span>,
    <span>bis zu 1 Fehler korrigieren</span>,
    <span>bis zu 2 Fehler erkennen</span>,
    <span>bis zu 2 Fehler korrigieren</span>,
    <span>bis zu 3 Fehler erkennen</span>,
    <span>bis zu 4 Fehler erkennen</span>,
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

  let hd = hammingDistance(chosenEncoding).toString();

  // possible answer key for MC part
  const possibleAnswerKey = () => {
    switch (hd) {
      case "1":
        return [false, false, false, false, false, false];
      case "2":
        return [true, false, false, false, false, false];
      case "3":
        return [true, true, true, false, false, false];
      case "4":
        return [true, true, true, false, true, false];
      case "5":
        return [true, true, true, true, true, true];
      default:
        return [false, false, false, false, false, false];
    }
  };

  // chosen properties and answer key for MC part (3/6)
  const [randArray] = useState(() => {
    let temp = Array(6).fill(0);
    errormaker(temp, 3);
    return temp;
  });

  let encodingRender = [];
  for (let i = 0; i < chosenEncoding.length; ++i) {
    encodingRender.push(<p>{chosenEncoding[i]}</p>);
  }

  let chosenProps = [];
  let chosenAK = [];
  for (let i = 0; i < 6; ++i) {
    if (randArray[i] === 1) {
      chosenProps.push(props[i]);
      chosenAK.push(possibleAnswerKey()[i]);
    }
  }

  const handleTaskState = () => {
    let temp = taskState + 1;
    if (temp === 2) {
      callerFunction();
    }
    setTaskState(temp);
  };

  return (
    <>
      <p>Kodierung:</p>
      <TextExercise
        callerFunction={() => handleTaskState()}
        question={<>{encodingRender}</>}
        text={<span>Hamming Abstand =</span>}
        solutions={[hd]}
        textOnCorrect={<p></p>}
        textOnWrong={<p>Der Abstand ist: {hd}.</p>}
      />
      <div className="smallSpace"></div>
      <p>Mit dieser Kodierung kann man...</p>
      <MC
        callerFunction={() => handleTaskState()}
        options={chosenProps}
        answerKey={chosenAK}
        textOnCorrect={<p></p>}
        textOnWrong={<p></p>}
      />
    </>
  );
}

export default EncodingDistanceExercise;
