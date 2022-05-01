import React, { useState } from "react";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";
import stringToArray from "../functions/srtingToArray";
import errormaker from "../functions/errormaker";

/*
This component always goes with the component squareExerciseExample.
Given is a 4x3 rectangle where each square has a digit 0 or 1.
Some squares serve as control bits. The number of ones is always even
in each row and column. In the exercise, the user is given squares containing 
exact one error that must be found.
*/

/*
onWorng and onCorrect are methods of the caller Component. These are used to
reveal certain parts of the Task, i.e. the solution, if to many wrong answers
have been given, or the next subtask, if all answers are correct.
*/
function SquareExecise2({ onWorong, onCorrect }) {
  /* 
  used for evaluating the given answer,
  the correlation between the bits,
  they are correlated as in a rectangle, where each row and column
  has an even amount of ones.
  */
  const correlationList = [
    [0, 1, 6, 0, 2, 4, 9],
    [0, 1, 6, 1, 3, 5, 10],
    [2, 3, 7, 0, 2, 4, 9],
    [2, 3, 7, 1, 3, 5, 10],
    [4, 5, 8, 0, 2, 4, 9],
    [4, 5, 8, 1, 3, 5, 10],
    [0, 1, 6, 6, 7, 8, 11],
    [2, 3, 7, 6, 7, 8, 11],
    [4, 5, 8, 6, 7, 8, 11],
    [9, 10, 11, 0, 2, 4, 9],
    [9, 10, 11, 1, 3, 5, 10],
    [9, 10, 11, 6, 7, 8, 11],
  ];

  // indicator for which button has been pressed the last
  const [pressed, setPressed] = useState(Array(12).fill(false));

  // data of bit sequence with one error
  const [data] = useState(() => {
    let temp1 = randomBinaryString(6);

    let temp2 = [];
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[1]]));
    temp2.push(binaryCheckSymbol1([temp1[2], temp1[3]]));
    temp2.push(binaryCheckSymbol1([temp1[4], temp1[5]]));
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[2], temp1[4]]));
    temp2.push(binaryCheckSymbol1([temp1[1], temp1[3], temp1[5]]));
    temp2.push(binaryCheckSymbol1(temp1));

    temp1.push(...stringToArray(temp2.join("")));
    errormaker(temp1, 1);

    return temp1;
  });

  /*
  variable for the task state
  "": not answered yet
  true: correctly answered
  false: answered, but wrong
  */
  const [taskState, setTaskState] = useState("");

  // checks the answer given by the user
  const checkResult = (arr, index) => {
    // changing the last pressed button
    let tempPressed = Array(12).fill(false);
    tempPressed[index] = true;
    setPressed(tempPressed);

    let arr1 = [];
    let arr2 = [];

    // separating column and row
    for (let i = 0; i < 3; ++i) {
      arr1[i] = data[arr[i]];
    }

    for (let i = 0; i < 4; ++i) {
      arr2[i] = data[arr[i + 3]];
    }

    // looking for the row and column with both an odd amount of ones
    let temp =
      binaryCheckSymbol1(arr1) === "1" && binaryCheckSymbol1(arr2) === "1";

    setTaskState(temp);

    if (temp === true) {
      onCorrect();
    } else if (temp === false) {
      onWorong();
    }
  };

  // for rendering the buttons
  let renderButtons = [];
  for (let index = 0; index < data.length; index++) {
    renderButtons.push(
      <button
        className={pressed[index] ? "squareBitA" : "squareBit"}
        disabled={taskState}
        onClick={() => checkResult(correlationList[index], index)}
      >
        <h2>{data[index]}</h2>
      </button>
    );
  }

  return (
    <>
      <div className="squareRow">
        {renderButtons[9]}
        {renderButtons[10]}
        {renderButtons[11]}
      </div>
      <div className="squareRow">
        {renderButtons[0]}
        {renderButtons[1]}
        {renderButtons[6]}
      </div>
      <div className="squareRow">
        {renderButtons[2]}
        {renderButtons[3]}
        {renderButtons[7]}
      </div>
      <div className="squareRow">
        {renderButtons[4]}
        {renderButtons[5]}
        {renderButtons[8]}
      </div>
      <div className="smallSpace"></div>
      {taskState === false && <h3 style={{ color: "red" }}>Falsch</h3>}
      {taskState && <h3 style={{ color: "green" }}>Korrekt</h3>}
      <div className="space"></div>
    </>
  );
}

export default SquareExecise2;
