import React, { useState } from "react";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";
import stringToArray from "../functions/srtingToArray";

/*
This component is made for exercise 9 for the MC part.
It is a 4x4 square where each row and column has an even number
of ones, which is achieved via control bits. One changes the Bit
value by clicking on the button. This also triggers a chain reaction 
indicating all the rows and columns that are now wrong. This helps
to answer some MC questions to have a visual comparison.
*/

function SquareColorExample({}) {
  /* 
  used for evaluating the given answer,
  the correlation between the bits,
  they are correlated as in a rectangle, where each row and column
  has an even amount of ones.
  */
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

  // og Data, used for reset
  const [ogData] = useState(() => {
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

    return temp1;
  });

  // data displayed, which can be altered
  const [data, setData] = useState([...ogData]);

  // boolean if row state is wrong or correct
  const [rState, setRState] = useState(Array(16).fill(false));

  // boolean if column state is wrong or correct
  const [cState, setCState] = useState(Array(16).fill(false));

  // boolean if bit is altered or not
  const [bitState, setBitState] = useState(Array(16).fill(false));

  // flips the bit
  const flipBit = (arr, index) => {
    // change bit state at index
    let temp = [...bitState];
    temp[index] = !temp[index];
    setBitState(temp);

    // change bit
    temp = [...data];
    console.log(temp[index]);
    if (temp[index] === 0) {
      temp[index] = 1;
    } else {
      temp[index] = 0;
    }
    setData(temp);

    // checking row state
    let temp2 = [...rState];
    let arrRow = arr.slice(0, 4);
    if (
      binaryCheckSymbol1([
        temp[arrRow[0]],
        temp[arrRow[1]],
        temp[arrRow[2]],
        temp[arrRow[3]],
      ]) === "0"
    ) {
      temp2[arrRow[0]] = false;
      temp2[arrRow[1]] = false;
      temp2[arrRow[2]] = false;
      temp2[arrRow[3]] = false;
    } else {
      temp2[arrRow[0]] = true;
      temp2[arrRow[1]] = true;
      temp2[arrRow[2]] = true;
      temp2[arrRow[3]] = true;
    }
    setRState(temp2);

    // checking column state
    temp2 = [...cState];
    let arrColumn = arr.slice(4, 8);
    if (
      binaryCheckSymbol1([
        temp[arrColumn[0]],
        temp[arrColumn[1]],
        temp[arrColumn[2]],
        temp[arrColumn[3]],
      ]) === "0"
    ) {
      temp2[arrColumn[0]] = false;
      temp2[arrColumn[1]] = false;
      temp2[arrColumn[2]] = false;
      temp2[arrColumn[3]] = false;
    } else {
      temp2[arrColumn[0]] = true;
      temp2[arrColumn[1]] = true;
      temp2[arrColumn[2]] = true;
      temp2[arrColumn[3]] = true;
    }
    setCState(temp2);
  };

  // resetting the square
  const resetSquare = () => {
    setData([...ogData]);
    setBitState(Array(16).fill(false));
    setRState(Array(16).fill(false));
    setCState(Array(16).fill(false));
  };

  // for rendering the buttons
  let renderButtons = [];
  for (let index = 0; index < data.length; index++) {
    renderButtons.push(
      <button
        className={
          rState[index] || cState[index]
            ? bitState[index]
              ? "squareBitRR"
              : "squareBitBR"
            : bitState[index]
            ? "squareBitRB"
            : "squareBit"
        }
        onClick={() => flipBit(correlationList[index], index)}
      >
        <h2>{data[index]}</h2>
      </button>
    );
  }

  return (
    <>
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
      <div className="smallSpace"></div>
      <div className="space"></div>

      <button
        onClick={() => {
          resetSquare();
        }}
      >
        <p>Reset Square</p>
      </button>
    </>
  );
}

export default SquareColorExample;
