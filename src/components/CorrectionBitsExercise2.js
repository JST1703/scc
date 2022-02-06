import React, { useState } from "react";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";
import stringToArray from "../functions/srtingToArray";
import errormaker from "../functions/errormaker";

/*
Given is a bit string with some normal bits and some control bits.
In the exercise, the user is given sequences containing 
exact one error that must be found.
*/

function CorrectionBitsExercise2() {
  // used for evaluating the given answer
  const correlationList = [
    ["1", "1", "0"],
    ["1", "0", "1"],
    ["0", "1", "1"],
    ["1", "1", "1"],
    ["1", "0", "0"],
    ["0", "1", "0"],
    ["0", "0", "1"],
  ];

  // indicator for which button has been pressed the last
  const [pressed, setPressed] = useState(Array(7).fill(false));

  // data of square
  const [data, setData] = useState(() => {
    let temp1 = randomBinaryString(4);

    let temp2 = [];
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[1], temp1[3]]));
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[2], temp1[3]]));
    temp2.push(binaryCheckSymbol1([temp1[1], temp1[2], temp1[3]]));

    temp1.push(...stringToArray(temp2.join("")));

    errormaker(temp1, 1);

    return temp1;
  });

  // variable for showing if the answer is correct or not
  const [correctAnswer, setCorrectAnswer] = useState("");

  // checks the result of the user
  const checkResult = (arr, index) => {
    let tempPressed = Array(7).fill(false);
    tempPressed[index] = true;
    setPressed(tempPressed);

    let temp1 =
      arr[0] === binaryCheckSymbol1([data[0], data[1], data[3], data[4]]);
    let temp2 =
      arr[1] === binaryCheckSymbol1([data[0], data[2], data[3], data[5]]);
    let temp3 =
      arr[2] === binaryCheckSymbol1([data[1], data[2], data[3], data[6]]);

    setCorrectAnswer(temp1 && temp2 && temp3);
  };

  let renderButtons = [];
  for (let index = 0; index < 4; index++) {
    renderButtons.push(
      <button
        key={index}
        className={
          pressed[index] ? "activeSquare toggleSquare" : "activeSquare "
        }
        disabled={correctAnswer}
        onClick={() => checkResult(correlationList[index], index)}
      >
        {data[index]}
      </button>
    );
  }

  for (let index = 4; index < data.length; index++) {
    renderButtons.push(
      <button
        key={index}
        className={
          pressed[index] ? "inactiveSquare toggleSquare" : "inactiveSquare"
        }
        disabled={correctAnswer}
        onClick={() => checkResult(correlationList[index], index)}
      >
        {data[index]}
      </button>
    );
  }

  // reset this whole exercise
  const refreshString = () => {
    let temp1 = randomBinaryString(4);

    let temp2 = [];
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[1], temp1[3]]));
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[2], temp1[3]]));
    temp2.push(binaryCheckSymbol1([temp1[1], temp1[2], temp1[3]]));

    temp1.push(...stringToArray(temp2.join("")));

    errormaker(temp1, 1);
    setData(temp1);

    setCorrectAnswer("");
    setPressed(Array(7).fill(false));
  };

  return (
    <div className="containerSquares">
      <div className="squareRow">
        <p></p>
        {renderButtons}
        {correctAnswer === false && <h3 style={{ color: "red" }}>Falsch</h3>}
        {correctAnswer && (
          <span>
            <h3 style={{ color: "green" }}>Korrekt</h3>
            <button onClick={() => refreshString()}>Neuer String</button>
          </span>
        )}
      </div>
    </div>
  );
}

export default CorrectionBitsExercise2;
