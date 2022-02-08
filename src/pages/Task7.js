import React, { useState } from "react";
import hammingDistance from "../functions/hammingDistance";

/*
Task 7: Given all possible binary words of length 5,
the user must select all words to form a code fulfilling
a random property at the beginning of the exercise.
In addition one word is selected already at the beginning.
*/

function Task7() {
  // code words
  const words = [
    "00000",
    "00001",
    "00010",
    "00100",
    "01000",
    "10000",
    "00011",
    "00101",
    "01001",
    "10001",
    "00110",
    "01010",
    "10010",
    "01100",
    "10100",
    "11000",
    "00111",
    "01011",
    "10011",
    "01101",
    "10101",
    "11001",
    "01110",
    "10110",
    "11010",
    "11100",
    "01111",
    "10111",
    "11011",
    "11101",
    "11110",
    "11111",
  ];

  // used for toggle
  const correlationList = [
    [0, 1, 2, 3, 4, 5],
    [0, 1, 6, 7, 8, 9],
    [0, 2, 6, 10, 11, 12],
    [0, 3, 7, 10, 13, 14],
    [0, 4, 8, 11, 13, 15],
    [0, 5, 9, 12, 14, 15],
    [1, 2, 6, 16, 17, 18],
    [1, 3, 7, 16, 19, 20],
    [1, 4, 8, 17, 19, 21],
    [1, 5, 9, 18, 20, 21],
    [2, 3, 10, 16, 22, 23],
    [2, 4, 11, 17, 22, 24],
    [2, 5, 12, 18, 23, 24],
    [3, 4, 13, 19, 22, 25],
    [3, 5, 14, 20, 23, 25],
    [4, 5, 15, 21, 24, 25],
    [6, 7, 10, 16, 26, 27],
    [6, 8, 11, 17, 26, 28],
    [6, 9, 12, 18, 27, 28],
    [7, 8, 13, 19, 26, 29],
    [7, 9, 14, 20, 27, 29],
    [8, 9, 15, 21, 28, 29],
    [10, 11, 13, 22, 26, 30],
    [10, 12, 14, 23, 27, 30],
    [11, 12, 15, 24, 28, 30],
    [13, 14, 15, 25, 29, 30],
    [16, 17, 19, 22, 26, 31],
    [16, 18, 20, 23, 27, 31],
    [17, 18, 21, 24, 28, 31],
    [17, 18, 21, 25, 29, 31],
    [22, 23, 24, 25, 30, 31],
    [26, 27, 28, 29, 30, 31],
  ];

  /* all possible task, one of which is chosen at random
  given in a triplet: task, solution of hamming distance, solution of number of code words
  */
  const possibleTasks = [
    [
      "Mit der Kodierung kann man nur einzelne Fehler erkennen, aber keine korrigieren.",
      2,
      16,
    ],
    [
      "Mit der Kodierung kann man nur einzelne Fehler Korrigieren und nur Fehler bis zur Grösse 2 erkennen.",
      3,
      4,
    ],
    [
      "Mit der Kodierung kann man bis zu zwei Fehler Korrigieren und Fehler bis zur Grösse 4 erkennen.",
      5,
      2,
    ],
  ];

  // chosen at random for possible task
  const [taskNumber] = useState(() => {
    let k = Math.floor(Math.random() * 3);
    if (k === 3) {
      k = 2;
    }
    return k;
  });

  // number of words in code, known from the beginning
  const codeSize = 32;

  // toggle status of each node
  const [toggle, setToggle] = useState(Array(codeSize).fill(false));

  const handleToggle = (arr) => {
    let temp = [...toggle];
    for (let i = 0; i < arr.length; ++i) {
      let tempIndex = arr[i];
      temp[tempIndex] = !temp[tempIndex];
    }
    setToggle(temp);
  };

  /* 
  status of each button, whether it is selected, neutral or unselected
  neutral and unselected are equal in the logic of the code, but gives
  the user visual aid for solving the exercise.
  
  0: neutral
  1 and 4: selected
  2: un selected
  */
  const [buttonStatus, setButoonStatus] = useState(() => {
    let arr = Array(codeSize).fill(0);
    let randy = Math.floor(Math.random() * codeSize);
    if (randy === codeSize) {
      randy = 31;
    }
    arr[randy] = 4;
    return arr;
  });

  /*
  variable for the task state
  "": not answered yet
  true: correctly answered
  false: answered, but wrong
  */
  const [taskState, setTaskState] = useState("");

  // text displayed if answer is either correct or wrong
  const [text, setText] = useState("");

  // logic for changing the button status
  const changeButtonStatus = (index) => {
    if (buttonStatus[index] !== 4) {
      let temp = [...buttonStatus];
      temp[index] = (temp[index] + 1) % 3;
      setButoonStatus(temp);
    }
  };

  // logic for submitting answer
  const handleAnswer = () => {
    let temp = words.filter((element, index) => {
      return buttonStatus[index] % 3 === 1;
    });
    let sol = true;
    setText("Korrekt.");
    if (temp.length !== possibleTasks[taskNumber][2]) {
      sol = false;
      setText(
        "Falsch, die Kodierung beinhaltet noch nicht alle möglichen Wörter."
      );
    }
    if (hammingDistance(temp) !== possibleTasks[taskNumber][1]) {
      sol = false;
      setText(
        "Falsch, die Kodierung erfüllt nicht die vorgegebenen Eigenschaften."
      );
    }
    setTaskState(sol);
  };

  // node render
  let nodeRender = [];
  for (let i = 0; i < codeSize; ++i) {
    nodeRender.push(
      <button
        className={
          buttonStatus[i] === 0
            ? toggle[i]
              ? "node0 nodeToggle "
              : "node0"
            : buttonStatus[i] % 3 === 1
            ? toggle[i]
              ? "node1 nodeToggle "
              : "node1"
            : toggle[i]
            ? "node2 nodeToggle "
            : "node2"
        }
        disabled={taskState === true}
        onMouseOver={() => handleToggle(correlationList[i])}
        onMouseOut={() => handleToggle(correlationList[i])}
        onClick={() => changeButtonStatus(i)}
      >
        {words[i]}
      </button>
    );
  }

  return (
    <div className="task">
      <h1>Aufgabe 7: Abstand in Kodierungen 2</h1>
      <p>
        Gegeben sind alle möglichen binären Codewörter der Länge 5. Wählen Sie
        alle Wörter aus, so dass Ihre Auswahl an Wörter eine Kodierung ergeben,
        welche folgende Eigenschaften erfüllt:
      </p>
      <h4>{possibleTasks[taskNumber][0]}</h4>
      <p>
        Ein Wort ist dabei bereits vorgegeben. Alle Wörter in Grün sind in Ihrer
        Auswahl. Rote und blaue Wörter sind beide nicht in der Auswahl. Rot ist
        nur eine visuelle Hilfe, z.B. können Sie alle Wörter rot markieren, die
        Sie mit Sicherheit ausschliessen wollen. Es wird nur das gewertet, was
        grün ist. Weiter werden immer alle Wörter hervorgehoben, welche einen
        Abstand von 1 zum aktuellen Wort haben.
      </p>
      <div className="graphGrid">
        <div className="row">{nodeRender[0]}</div>
        <div className="row">
          {nodeRender[1]}
          {nodeRender[2]}
          {nodeRender[3]}
          {nodeRender[4]}
          {nodeRender[5]}
        </div>
        <div className="row">
          {nodeRender[6]}
          {nodeRender[7]}
          {nodeRender[8]}
          {nodeRender[9]}
          {nodeRender[10]}
          {nodeRender[11]}
          {nodeRender[12]}
          {nodeRender[13]}
          {nodeRender[14]}
          {nodeRender[15]}
        </div>
        <div className="row">
          {nodeRender[16]}
          {nodeRender[17]}
          {nodeRender[18]}
          {nodeRender[19]}
          {nodeRender[20]}
          {nodeRender[21]}
          {nodeRender[22]}
          {nodeRender[23]}
          {nodeRender[24]}
          {nodeRender[25]}
        </div>
        <div className="row">
          {nodeRender[26]}
          {nodeRender[27]}
          {nodeRender[28]}
          {nodeRender[29]}
          {nodeRender[30]}
        </div>
        <div className="row">{nodeRender[31]}</div>
        <button disabled={taskState === true} onClick={() => handleAnswer()}>
          <h2>überprüfen</h2>
        </button>
        {taskState === false && <p style={{ color: "red" }}>{text}</p>}
        {taskState === true && (
          <div>
            <p style={{ color: "green" }}>{text}</p>
            <p>
              Mit dieser Methode lässt sich einfach eine Kodierung finden,
              welche eine bestimmte Eigenschaft erfüllen soll. Will man eine
              Kodierung mit einem Abstand von k haben, so beginnt man bei einem
              Wort und streicht alle Wörter weg, welche einen Abstand kleiner
              als k zum Anfangswort haben. Dann sucht man sich ein neues Wort
              aus und streicht von dort aus alle Wörter weg, welche einen
              Abstand kleiner als k zu diesem Wort haben, usw., bis man keine
              Wörter mehr streichen kann.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task7;
