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

  /* all possible task, one of which is chosen at random
  given in a triplet: task, solution of hamming distance, solution of number of code words
  */
  const possibleTasks = [
    ["Mit der Kodierung kann man nur einzelne Fehler erkennen.", 2, 16],
    [
      "Mit der Kodierung kann man einzelne Fehler Korrigieren und nur Fehler der grösse 2 erkennen.",
      3,
      4,
    ],
    [
      "Mit der Kodierung kann man zwei Fehler Korrigieren und Fehler der grösse 4 erkennen.",
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

  // after submission, stating whether answer was correct or not
  const [correctAnswer, setCorrextAnswer] = useState("");

  // text displayed if answer is either correct or wrong
  const [text, setText] = useState("");

  // logic for changing the button status
  const changeButtonStatus = (index) => {
    let temp = [...buttonStatus];
    temp[index] = (temp[index] + 1) % 3;
    setButoonStatus(temp);
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
    setCorrextAnswer(sol);
  };

  return (
    <div className="task">
      <h1>Aufgabe 7: Abstand in Kodierungen 2</h1>
      <p>
        Gegeben sind alle möglichen binären Codewörter der länge 5. Whälen Sie
        alle Wörter aus, so dass Ihre Auswahl an Wörter eine Kodierung ergeben,
        welche folgende Eigenschaften erfüllt:
      </p>
      <h4>{possibleTasks[taskNumber][0]}</h4>
      <p>
        Ein Wort ist dabei bereits vorgegeben. Alle Wörter in gürn sind in Ihrer
        Auswahl. Rote und graue Wörter sind biede nicht in der Auswahl. Rot ist
        nur eine visuelle Hilfe, z.B. können Sie alle Wörter rot markieren, die
        Sie mit sicherheit ausschliessen wollen. Es wird nur das gewerted, was
        gürn ist.
      </p>
      <div className="graphGrid">
        <div className="row">
          <button
            className={
              buttonStatus[0] === 0
                ? "node0"
                : buttonStatus[0] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[0] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(0)}
          >
            {words[0]}
          </button>
        </div>
        <div className="row">
          <button
            className={
              buttonStatus[1] === 0
                ? "node0"
                : buttonStatus[1] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[1] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(1)}
          >
            {words[1]}
          </button>
          <button
            className={
              buttonStatus[2] === 0
                ? "node0"
                : buttonStatus[2] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[2] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(2)}
          >
            {words[2]}
          </button>
          <button
            className={
              buttonStatus[3] === 0
                ? "node0"
                : buttonStatus[3] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[3] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(3)}
          >
            {words[3]}
          </button>
          <button
            className={
              buttonStatus[4] === 0
                ? "node0"
                : buttonStatus[4] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[4] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(4)}
          >
            {words[4]}
          </button>
          <button
            className={
              buttonStatus[5] === 0
                ? "node0"
                : buttonStatus[5] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[5] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(5)}
          >
            {words[5]}
          </button>
        </div>
        <div className="row">
          <button
            className={
              buttonStatus[6] === 0
                ? "node0"
                : buttonStatus[6] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[6] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(6)}
          >
            {words[6]}
          </button>
          <button
            className={
              buttonStatus[7] === 0
                ? "node0"
                : buttonStatus[7] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[7] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(7)}
          >
            {words[7]}
          </button>
          <button
            className={
              buttonStatus[8] === 0
                ? "node0"
                : buttonStatus[8] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[8] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(8)}
          >
            {words[8]}
          </button>
          <button
            className={
              buttonStatus[9] === 0
                ? "node0"
                : buttonStatus[9] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[9] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(9)}
          >
            {words[9]}
          </button>
          <button
            className={
              buttonStatus[10] === 0
                ? "node0"
                : buttonStatus[10] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[10] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(10)}
          >
            {words[10]}
          </button>
          <button
            className={
              buttonStatus[11] === 0
                ? "node0"
                : buttonStatus[11] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[11] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(11)}
          >
            {words[11]}
          </button>
          <button
            className={
              buttonStatus[12] === 0
                ? "node0"
                : buttonStatus[12] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[12] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(12)}
          >
            {words[12]}
          </button>
          <button
            className={
              buttonStatus[13] === 0
                ? "node0"
                : buttonStatus[13] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[13] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(13)}
          >
            {words[13]}
          </button>
          <button
            className={
              buttonStatus[14] === 0
                ? "node0"
                : buttonStatus[14] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[14] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(14)}
          >
            {words[14]}
          </button>
          <button
            className={
              buttonStatus[15] === 0
                ? "node0"
                : buttonStatus[15] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[15] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(15)}
          >
            {words[15]}
          </button>
        </div>
        <div className="row">
          <button
            className={
              buttonStatus[16] === 0
                ? "node0"
                : buttonStatus[16] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[16] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(16)}
          >
            {words[16]}
          </button>
          <button
            className={
              buttonStatus[17] === 0
                ? "node0"
                : buttonStatus[17] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[17] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(17)}
          >
            {words[17]}
          </button>
          <button
            className={
              buttonStatus[18] === 0
                ? "node0"
                : buttonStatus[18] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[18] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(18)}
          >
            {words[18]}
          </button>
          <button
            className={
              buttonStatus[19] === 0
                ? "node0"
                : buttonStatus[19] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[19] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(19)}
          >
            {words[19]}
          </button>
          <button
            className={
              buttonStatus[20] === 0
                ? "node0"
                : buttonStatus[20] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[20] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(20)}
          >
            {words[20]}
          </button>
          <button
            className={
              buttonStatus[21] === 0
                ? "node0"
                : buttonStatus[21] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[21] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(21)}
          >
            {words[21]}
          </button>
          <button
            className={
              buttonStatus[22] === 0
                ? "node0"
                : buttonStatus[22] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[22] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(22)}
          >
            {words[22]}
          </button>
          <button
            className={
              buttonStatus[23] === 0
                ? "node0"
                : buttonStatus[23] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[23] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(23)}
          >
            {words[23]}
          </button>
          <button
            className={
              buttonStatus[24] === 0
                ? "node0"
                : buttonStatus[24] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[24] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(24)}
          >
            {words[24]}
          </button>
          <button
            className={
              buttonStatus[25] === 0
                ? "node0"
                : buttonStatus[25] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[25] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(25)}
          >
            {words[25]}
          </button>
        </div>
        <div className="row">
          <button
            className={
              buttonStatus[26] === 0
                ? "node0"
                : buttonStatus[26] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[26] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(26)}
          >
            {words[26]}
          </button>
          <button
            className={
              buttonStatus[27] === 0
                ? "node0"
                : buttonStatus[27] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[27] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(27)}
          >
            {words[27]}
          </button>
          <button
            className={
              buttonStatus[28] === 0
                ? "node0"
                : buttonStatus[28] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[28] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(28)}
          >
            {words[28]}
          </button>
          <button
            className={
              buttonStatus[29] === 0
                ? "node0"
                : buttonStatus[29] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[29] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(29)}
          >
            {words[29]}
          </button>
          <button
            className={
              buttonStatus[30] === 0
                ? "node0"
                : buttonStatus[30] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[30] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(30)}
          >
            {words[30]}
          </button>
        </div>
        <div className="row">
          <button
            className={
              buttonStatus[31] === 0
                ? "node0"
                : buttonStatus[31] % 3 === 1
                ? "node1"
                : "node2"
            }
            disabled={buttonStatus[31] === 4 || correctAnswer === true}
            onClick={() => changeButtonStatus(31)}
          >
            {words[31]}
          </button>
        </div>
        <button
          disabled={correctAnswer === true}
          onClick={() => handleAnswer()}
        >
          <h2>überprüfen</h2>
        </button>
        {correctAnswer === false && <p style={{ color: "red" }}>{text}</p>}
        {correctAnswer === true && <p style={{ color: "green" }}>{text}</p>}
      </div>
    </div>
  );
}

export default Task7;
