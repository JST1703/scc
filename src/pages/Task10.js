import React, { useState } from "react";

/*
Task 10: 
*/

function Task10() {
  const numButtons = 16;

  // used for toggle and setting the values for the control bits
  const correlationList = [
    [0, 9, 12, 15],
    [1, 9, 13, 15],
    [2, 9, 14, 15],
    [3, 10, 12, 15],
    [4, 10, 13, 15],
    [5, 10, 14, 15],
    [6, 11, 12, 15],
    [7, 11, 13, 15],
    [8, 11, 14, 15],
    [0, 1, 2, 9],
    [3, 4, 5, 10],
    [6, 7, 8, 11],
    [0, 3, 6, 12],
    [1, 4, 7, 13],
    [2, 5, 8, 14],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 15],
  ];

  // toggle status of each button
  const [toggle, setToggle] = useState(Array(numButtons).fill(false));

  // value of each button
  const [values, setValues] = useState(Array(numButtons).fill(0));

  const handleValues = (arr) => {
    let temp = [...values];
    for (let i = 0; i < arr.length; ++i) {
      let tempIndex = arr[i];
      temp[tempIndex] = (temp[tempIndex] + 1) % 2;
    }
    setValues(temp);
  };

  const handleToggle = (arr) => {
    let temp = [...toggle];
    for (let i = 0; i < arr.length; ++i) {
      let tempIndex = arr[i];
      temp[tempIndex] = !temp[tempIndex];
    }
    setToggle(temp);
  };

  let renderButtons = [];
  for (let i = 0; i < 9; ++i) {
    renderButtons.push(
      <button
        onClick={() => handleValues(correlationList[i])}
        onMouseOver={() => handleToggle(correlationList[i])}
        onMouseOut={() => handleToggle(correlationList[i])}
        className={toggle[i] ? "activeSquare toggleSquare" : "activeSquare"}
      >
        {values[i]}
      </button>
    );
  }
  for (let i = 9; i < numButtons; ++i) {
    renderButtons.push(
      <button
        onMouseOver={() => handleToggle(correlationList[i])}
        onMouseOut={() => handleToggle(correlationList[i])}
        className={toggle[i] ? "inactiveSquare toggleSquare" : "inactiveSquare"}
      >
        {values[i]}
      </button>
    );
  }

  return (
    <div className="task">
      <h1>Aufgabe 10: Effiziente Kodierung 2</h1>
      <p>
        Wir haben erneut unsere 9 Bits für die Nachricht und die dazugeörigen
        Kontrollbits. Diese sind in einer Reihe angeordet, so wie ein Computer
        die Bits auch liest. Jedes Bit ist immernoch Teil einer Zeile und
        Spalte. Sie können hier auprobieren, welche Bits welche Kontrollbits
        beeinflussen und andersrum.
      </p>
      <div className="containerSquares">{renderButtons}</div>
    </div>
  );
}

export default Task10;
