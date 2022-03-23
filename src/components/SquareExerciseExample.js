import React, { useState } from "react";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";

/*
This component always goes with the component squareExercise.
Given is a 4x4 square where each square has a digit 0 or 1.
Some squares serve as control bits. In the exercise, the user
is given squares containing exact one error that must be found.
*/

function SquareExeciseExample() {
  // data of bit sequence
  const [data] = useState(() => {
    let temp = randomBinaryString(9);
    temp.push(binaryCheckSymbol1([temp[0], temp[1], temp[2]]));
    temp.push(binaryCheckSymbol1([temp[3], temp[4], temp[5]]));
    temp.push(binaryCheckSymbol1([temp[6], temp[7], temp[8]]));
    temp.push(binaryCheckSymbol1([temp[0], temp[3], temp[6]]));
    temp.push(binaryCheckSymbol1([temp[1], temp[4], temp[7]]));
    temp.push(binaryCheckSymbol1([temp[2], temp[5], temp[8]]));
    temp.push(binaryCheckSymbol1(temp.slice(0, 9)));
    return temp;
  });

  return (
    <>
      <div className="squareRow">
        <button className="squareBit">
          <h2>{data[12]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[13]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[14]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[15]}</h2>
        </button>
      </div>
      <div className="squareRow">
        <button className="squareBit">
          <h2>{data[0]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[1]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[2]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[3]}</h2>
        </button>
      </div>
      <div className="squareRow">
        <button className="squareBit">
          <h2>{data[4]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[5]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[6]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[7]}</h2>
        </button>
      </div>
      <div className="squareRow">
        <button className="squareBit">
          <h2>{data[8]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[9]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[10]}</h2>
        </button>
        <button className="squareBit">
          <h2>{data[11]}</h2>
        </button>
      </div>
    </>
  );
}

export default SquareExeciseExample;
