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
    <div>
      <div className="squareRow">
        <button className="squareBit">{data[12]}</button>
        <button className="squareBit">{data[13]}</button>
        <button className="squareBit">{data[14]}</button>
        <button className="squareBit">{data[15]}</button>
      </div>
      <div className="squareRow">
        <button className="squareBit">{data[0]}</button>
        <button className="squareBit">{data[1]}</button>
        <button className="squareBit">{data[2]}</button>
        <button className="squareBit">{data[9]}</button>
      </div>
      <div className="squareRow">
        <button className="squareBit">{data[3]}</button>
        <button className="squareBit">{data[4]}</button>
        <button className="squareBit">{data[5]}</button>
        <button className="squareBit">{data[10]}</button>
      </div>
      <div className="squareRow">
        <button className="squareBit">{data[6]}</button>
        <button className="squareBit">{data[7]}</button>
        <button className="squareBit">{data[8]}</button>
        <button className="squareBit">{data[11]}</button>
      </div>
    </div>
  );
}

export default SquareExeciseExample;
