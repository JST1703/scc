import React, { useState } from "react";
import CorrectionBitsExercise from "../components/CorrectionBitsExercise";
import TextExercise from "../components/TextExercise";

/*
Task 10

Task A: Given is a bit string with some normal bits and some control bits.
In the exercise, the user is given sequences containing 
exact one error that must be found.

Task B: Some questions about general properties of these kind of control bit codes.
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
        key={i}
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
        key={i}
        onMouseOver={() => handleToggle(correlationList[i])}
        onMouseOut={() => handleToggle(correlationList[i])}
        className={toggle[i] ? "inactiveSquare toggleSquare" : "inactiveSquare"}
      >
        {values[i]}
      </button>
    );
  }

  // number of tasks in A
  const numberOfTasksA = 3;

  // keeping track if task A is solved or not
  const [stateA, setStateA] = useState(0);

  let taskArender = [];
  for (let i = 0; i < numberOfTasksA; ++i) {
    taskArender.push(
      <CorrectionBitsExercise
        key={i}
        callerFunction={() => setStateA(stateA + 1)}
      />
    );
  }

  // keeping track if task B is solved or not
  const [stateB, setStateB] = useState(Array(3).fill(false));

  const handleStateB = (index) => {
    let temp = [...stateB];
    temp[index] = true;
    setStateB(temp);
  };

  return (
    <div className="task">
      <h1>Aufgabe 10: Effiziente Kodierung 2</h1>
      <p>
        Wir haben erneut unsere 9 Bits für die Nachricht und die dazugeörigen
        Kontrollbits. Diese sind in einer Reihe angeordet, so wie ein Computer
        die Bits lesen kann. Jedes Bit ist immernoch Teil einer imaginären Zeile
        und imaginären Spalte, wie vorhin. Sie können hier ausprobieren, welche
        Bits welche Kontrollbits beeinflussen und andersrum.
      </p>
      <div className="containerSquares">
        <div className="squareRow">{renderButtons}</div>
      </div>
      <p>
        Gegeben sind einige solcher Nachrichten, wobei ein Fehler aufgetreten
        ist. Finden Sie diese Fehler.
      </p>
      {taskArender}
      {stateA === numberOfTasksA && (
        <div>
          <TextExercise
            callerFunction={() => handleStateB(0)}
            question={
              "Wie viele Nachrichten können wir mit so vielen Bits und Kontrollbits Kodieren?"
            }
            text={"In zweier Potenz (2^x) :"}
            solutions={["2^9"]}
            textOnCorrect={"Wir haben 9 Bits, welche die Nachricht ausmachen."}
            textOnWrong={"Wir haben 9 Bits, welche die Nachricht ausmachen."}
          />
        </div>
      )}
      {stateB[0] && (
        <div>
          <TextExercise
            callerFunction={() => handleStateB(1)}
            question={
              "Wir können damit Fehler der grösse Eins korrigieren. Was für ein Abstand muss demnach unsere Kodierung haben?"
            }
            text={"Abstand :"}
            solutions={["3"]}
            textOnCorrect={""}
            textOnWrong={"3 ist die richtige Lösung."}
          />
        </div>
      )}
      {stateB[1] && (
        <div>
          <TextExercise
            callerFunction={() => handleStateB(2)}
            question={
              "Wir wollen 2^n Wörter kodieren mit abstand 3. Wir haben bereits gesehen, dass wir dafür die Wörter verdreifachen können. Das wären 2n Kontrollbits. Wie viele Kontrollbits brauchen wir bei n = a ⋅ b bits? Hinweis: denken Sie an die Rechtecke aus der letzten Aufgabe."
            }
            text={"Anzahl Kontrollbits :"}
            solutions={["a+b+1", "a+1+b", "b+1+a", "b+a+1", "1+a+b", "1+b+a"]}
            textOnCorrect={""}
            textOnWrong={
              "a + b + 1 ist die richtige Lösung. Wir haben die Länge und die Breite des Rechteckes + 1. Unser Rechteck hat 9 Bits, das macht a = 3, b = 3 und Anzahl Kontrollbits = 7"
            }
          />
        </div>
      )}
      {stateB[2] && (
        <div>
          <p>
            Bei einer Nachrichtlänge von n können a und b so gewählt werden,
            dass n &gt; a und n &gt; b gilt. Damit gilt auch n &gt; a + b + 1,
            was uns eine effiziente Kodierung mit Abstand 3 gibt.
          </p>
        </div>
      )}
    </div>
  );
}

export default Task10;
