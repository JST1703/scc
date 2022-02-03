import React, { useState } from "react";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";
import stringToArray from "../functions/srtingToArray";
import errormaker from "../functions/errormaker";

/*
This component always goes with the component squareExerciseExample.
Given is a 4x4 square where each square has a digit 0 or 1.
Some squares serve as control bits. In the exercise, the user
is given squares containing exact one error that must be found.
*/

/*
callerFunction is the function being used by the calling Component.
*/
function SquareExecise({ callerFunction }) {
  // used for evaluating the given answer
  const correlationList = [
    [0, 1, 2, 9, 0, 3, 6, 12],
    [0, 1, 2, 9, 1, 4, 7, 13],
    [0, 1, 2, 9, 2, 5, 8, 14],
    [3, 4, 5, 10, 0, 3, 6, 12],
    [3, 4, 5, 10, 1, 4, 7, 13],
    [3, 4, 5, 10, 2, 5, 8, 14],
    [6, 7, 8, 11, 0, 3, 6, 12],
    [6, 7, 8, 11, 1, 4, 7, 13],
    [6, 7, 8, 11, 2, 5, 8, 14],
    [0, 1, 2, 9, 9, 10, 11, 15],
    [3, 4, 5, 10, 9, 10, 11, 15],
    [6, 7, 8, 11, 9, 10, 11, 15],
    [12, 13, 14, 15, 0, 3, 6, 12],
    [12, 13, 14, 15, 1, 4, 7, 13],
    [12, 13, 14, 15, 2, 5, 8, 14],
    [12, 13, 14, 15, 9, 10, 11, 15],
  ];

  // data of square
  const [data] = useState(() => {
    let temp1 = randomBinaryString(9);

    let temp2 = [];
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[1], temp1[2]]));
    temp2.push(binaryCheckSymbol1([temp1[3], temp1[4], temp1[5]]));
    temp2.push(binaryCheckSymbol1([temp1[6], temp1[7], temp1[8]]));
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[3], temp1[6]]));
    temp2.push(binaryCheckSymbol1([temp1[1], temp1[4], temp1[7]]));
    temp2.push(binaryCheckSymbol1([temp1[2], temp1[5], temp1[8]]));
    temp2.push(binaryCheckSymbol1(temp1));

    temp1.push(...stringToArray(temp2.join("")));
    errormaker(temp1, 1);

    return temp1;
  });

  // variable for showing if the answer is correct or not
  const [correctAnswer, setCorrectAnswer] = useState("");

  // checks the result of the user
  const checkResult = (arr) => {
    let arr1 = [];
    let arr2 = [];

    for (let i = 0; i < 4; ++i) {
      arr1[i] = data[arr[i]];
      arr2[i] = data[arr[i + 4]];
    }

    setCorrectAnswer(
      binaryCheckSymbol1(arr1) === "1" && binaryCheckSymbol1(arr2) === "1"
    );

    console.log(correctAnswer);
  };

  let renderButtons = [];
  for (let index = 0; index < data.length; index++) {
    renderButtons.push(
      <button
        className="squareBit"
        onClick={() => checkResult(correlationList[index])}
      >
        {data[index]}
      </button>
    );
  }

  return (
    <div>
      <div className="squareRow">
        {renderButtons[12]}
        {renderButtons[13]}
        {renderButtons[14]}
        {renderButtons[15]}
      </div>
      <div className="squareRow">
        {renderButtons[0]}
        {renderButtons[1]}
        {renderButtons[2]}
        {renderButtons[9]}
      </div>
      <div className="squareRow">
        {renderButtons[3]}
        {renderButtons[4]}
        {renderButtons[5]}
        {renderButtons[10]}
      </div>
      <div className="squareRow">
        {renderButtons[6]}
        {renderButtons[7]}
        {renderButtons[8]}
        {renderButtons[11]}
      </div>
    </div>
  );
}

export default SquareExecise;
