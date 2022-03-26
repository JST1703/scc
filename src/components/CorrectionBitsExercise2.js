import React, { useState } from "react";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";
import stringToArray from "../functions/srtingToArray";
import errormaker from "../functions/errormaker";

/*
Given is a bit string with some normal bits and some control bits.
In the exercise, the user is given sequences containing 
exact one error that must be found. It is a 7-4 Hamming Code.
*/

function CorrectionBitsExercise2() {
  /* 
  used for evaluating the given answer,
  the correlation between the bits,
  they are correlated as in a 7-4 Hamming Code.
  */
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

  // data of bit sequence with one error
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
    let tempPressed = Array(7).fill(false);
    tempPressed[index] = true;
    setPressed(tempPressed);

    // checking the equations of the 7-4 Hamming Code.
    let temp1 =
      arr[0] === binaryCheckSymbol1([data[0], data[1], data[3], data[4]]);
    let temp2 =
      arr[1] === binaryCheckSymbol1([data[0], data[2], data[3], data[5]]);
    let temp3 =
      arr[2] === binaryCheckSymbol1([data[1], data[2], data[3], data[6]]);

    setTaskState(temp1 && temp2 && temp3);
  };

  // for rendering the buttons
  let renderButtons = [];

  // the colour of the regular bits is different than from the control bits.
  for (let index = 0; index < 4; index++) {
    renderButtons.push(
      <button
        key={index}
        className={pressed[index] ? "squareBit4 toggleSquare" : "squareBit4"}
        disabled={taskState}
        onClick={() => checkResult(correlationList[index], index)}
      >
        <h3>{data[index]}</h3>
      </button>
    );
  }

  // the colour of the regular bits is different than from the control bits.
  for (let index = 4; index < data.length; index++) {
    renderButtons.push(
      <button
        key={index}
        className={pressed[index] ? "squareBit5 toggleSquare" : "squareBit5"}
        disabled={taskState}
        onClick={() => checkResult(correlationList[index], index)}
      >
        <h3>{data[index]}</h3>
      </button>
    );
  }

  // resetting this whole exercise
  const reset = () => {
    let temp1 = randomBinaryString(4);

    let temp2 = [];
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[1], temp1[3]]));
    temp2.push(binaryCheckSymbol1([temp1[0], temp1[2], temp1[3]]));
    temp2.push(binaryCheckSymbol1([temp1[1], temp1[2], temp1[3]]));

    temp1.push(...stringToArray(temp2.join("")));

    errormaker(temp1, 1);
    setData(temp1);

    setTaskState("");
    setPressed(Array(7).fill(false));
  };

  return (
    <div className="squareRow">
      {renderButtons}
      <div className="smallSpace"> </div>
      {taskState === false && <h3 style={{ color: "red" }}>Falsch</h3>}
      {taskState && (
        <>
          <h3 style={{ color: "green" }}>Korrekt</h3>
          <div className="smallSpace"> </div>
          <button onClick={() => reset()}>
            <p>Neuer String</p>
          </button>
        </>
      )}
    </div>
  );
}

export default CorrectionBitsExercise2;
