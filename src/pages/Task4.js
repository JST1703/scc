import React, { useState } from "react";
import MC from "../components/MC";
import YN from "../components/YN";
import errormaker from "../functions/errormaker";

/*
Task 4: codes and error correction

Task A: given an encoding. The user is given a few messages with one error. He must find the original message.

Task B: given an encoding. The user is given a few messages with two errors. He must find the original message, which he might fail.

Task C: given an encoding. The user is given a few messages with one error. He must find the original message, which he might fail.

Task D: Y and N questions about the property of this encoding. The user should realise after the pervious exercises that with this encoding 
you can detect 2 errors, but only correct one error.

*/

function Task4() {
  // Table content
  const words = [
    <span>Hund</span>,
    <span>Mond</span>,
    <span>Pizza</span>,
    <span>Auto</span>,
  ];
  const binaryRep = ["00", "01", "10", "11"];
  const encoding = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1],
  ];

  const numberOfTasks = 3;

  // keeping track of the number of answers given in each task for revealing the next task
  const [answersA, setAnswersA] = useState(0);
  const [answersB, setAnswersB] = useState(0);
  const [answersC, setAnswersC] = useState(0);

  // if true, next task is revealed
  const [taskStateD, setTaskStateD] = useState(Array(5).fill(false));

  // revealing next part of task D
  const handleTaskStateD = (index) => {
    let temp = [...taskStateD];
    temp[index] = true;
    setTaskStateD(temp);
  };

  // Table for encoding
  const table = [];

  // Table Head
  table.push(
    <tr key={4}>
      <th>Wort</th>
      <th>Binäre Darstellung</th>
      <th>Kodierung</th>
    </tr>
  );

  // Table items
  for (let i = 0; i < 4; ++i) {
    table.push(
      <tr key={i}>
        <td>{words[i]}</td>
        <td>{binaryRep[i]}</td>
        <td>{encoding[i]}</td>
      </tr>
    );
  }

  // Temp for MC Questions
  const [mcTemp] = useState(
    Array.from({ length: 3 * numberOfTasks }, () => {
      // random encoding being chosen
      let k = Math.floor(Math.random() * 4);
      if (k === 4) {
        k = 3;
      }
      return k;
    })
  );

  // MC Questions
  let mc4A = []; // one error
  let mc4B = []; // two errors
  let mc4C = []; // three errors

  // for answer key
  let key = Array(4).fill(false);

  for (let i = 0; i < 3 * numberOfTasks; i += 3) {
    let k1 = mcTemp[i];
    let k2 = mcTemp[i + 1];
    let k3 = mcTemp[i + 2];

    let key1 = [...key];
    let key2 = [...key];
    let key3 = [...key];

    key1[k1] = true;
    key2[k2] = true;
    key3[k3] = true;

    let seqTemp1 = [...encoding[k1]];
    let seqTemp2 = [...encoding[k2]];
    let seqTemp3 = [...encoding[k3]];

    errormaker(seqTemp1, 1);
    errormaker(seqTemp2, 2);
    errormaker(seqTemp3, 3);

    mc4A.push(
      <>
        <div className="space"></div>
        <p>Nachricht: {seqTemp1.join("")}</p>
        <div className="smallSpace"></div>
        <MC
          key={i}
          callerFunction={() => setAnswersA(answersA + 1)}
          options={words}
          answerKey={key1}
          textOnWrong={<p>Die richtige Antwort lautet {words[k1]}.</p>}
          textOnCorrect={<p></p>}
        />
      </>
    );

    mc4B.push(
      <>
        <div className="space"></div>
        <p>Nachricht: {seqTemp2.join("")}</p>
        <div className="smallSpace"></div>
        <MC
          key={i + 1}
          callerFunction={() => setAnswersB(answersB + 1)}
          options={words}
          answerKey={key2}
          textOnWrong={<p>Die richtige Antwort lautet {words[k2]}.</p>}
          textOnCorrect={<p></p>}
        />
      </>
    );

    mc4C.push(
      <>
        <div className="space"></div>
        <p>Nachricht: {seqTemp1.join("")}</p>
        <div className="smallSpace"></div>
        <MC
          key={i + 2}
          callerFunction={() => setAnswersC(answersC + 1)}
          options={words}
          answerKey={key3}
          textOnWrong={<p>Die richtige Antwort lautet {words[k3]}.</p>}
          textOnCorrect={<p></p>}
        />
      </>
    );
  }

  return (
    <div className="main">
      <h1>Aufgabe 4: Kodierungen und Fehlerkorrektur 1</h1>

      <div className="space"></div>

      <div className="task">
        <div className="taskLeft">
          <p>
            Gegeben sind 4 Wörter, welche wir einer binären Darstellung
            zuordnen. Weiter kodieren wir die binären Darstellungen, in dem wir
            diese jeweils 3-mal wiederholen. Beispielsweise wird {binaryRep[1]}{" "}
            zu
            {" " + binaryRep[1]}
            <span style={{ color: "red" }}>{binaryRep[1]}</span>
            <span style={{ color: "green" }}>{binaryRep[1] + " "}</span>{" "}
            kodiert.
          </p>
          <div className="space"></div>
          <p>TOD Task A</p>
          {mc4A}

          <div className="space"></div>

          <button
            onClick={() => {
              setAnswersA(numberOfTasks);
            }}
          >
            <p>Aufgabe überspringen</p>
          </button>
          <div className="space"></div>

          {answersA >= numberOfTasks && (
            <>
              <p>TOD Task B</p>
              {mc4B}
              <div className="space"></div>
              <button
                onClick={() => {
                  setAnswersB(numberOfTasks);
                }}
              >
                <p>Aufgabe überspringen</p>
              </button>
              <div className="space"></div>
            </>
          )}

          {answersB >= numberOfTasks && (
            <>
              <p>TOD Task C</p>
              {mc4C}
              <div className="space"></div>
              <button
                onClick={() => {
                  setAnswersC(numberOfTasks);
                }}
              >
                <p>Aufgabe überspringen</p>
              </button>
              <div className="space"></div>
            </>
          )}
        </div>

        <div className="taskRightScroll">
          <table>
            <tbody>{table}</tbody>
          </table>
        </div>
      </div>

      {answersC >= numberOfTasks && (
        <div className="task">
          <p>Mit der gegebenen Kodierung kann man immer...</p>
          <YN
            callerFunction={() => handleTaskStateD(0)}
            question={"Fehler erkennen, wenn ein Fehler aufgetreten ist."}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnWrong={
              "Wenn ein Fehler auftrit, dann ist die fehlerhafte Nachricht gar nicht eines unserer Code-Wörter."
            }
            textOnCorrect={
              "Wenn ein Fehler auftrit, dann ist die fehlerhafte Nachricht gar nicht eines unserer Code-Wörter."
            }
            solution={1}
          />
          {taskStateD[0] && (
            <YN
              callerFunction={() => handleTaskStateD(1)}
              question={"Fehler korrigieren, wenn ein Fehler aufgetreten ist."}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Unsere Code-Wörter unterscheiden sich in mindesten an 3 Stellen. Die fehlerhafte Nachricht unterscheidet sich mit einem Fehler nur an einer Stelle zu einem Code-Wort und zu allen anderen in mintesten zwei Stellen. Man kan somit die Feherhafte nachricht eindeutig zuordnen."
              }
              textOnCorrect={
                "Unsere Code-Wörter unterscheiden sich in mindesten an 3 Stellen. Die fehlerhafte Nachricht unterscheidet sich mit einem Fehler nur an einer Stelle zu einem Code-Wort und zu allen anderen in mintesten zwei Stellen. Man kan somit die Feherhafte nachricht eindeutig zuordnen."
              }
              solution={1}
            />
          )}
          {taskStateD[1] && (
            <YN
              callerFunction={() => handleTaskStateD(2)}
              question={"Fehler erkennen, wenn zwei Fehler aufgetreten sind."}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Wenn zewi Fehler auftreten, dann ist die fehlerhafte Nachricht gar nicht eines unserer Code-Wörter."
              }
              textOnCorrect={
                "Wenn zewi Fehler auftreten, dann ist die fehlerhafte Nachricht gar nicht eines unserer Code-Wörter."
              }
              solution={1}
            />
          )}
          {taskStateD[2] && (
            <YN
              callerFunction={() => handleTaskStateD(3)}
              question={
                "Fehler korrigieren, wenn zwei Fehler aufgetreten sind."
              }
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Bei zwei Fehlern kann man nur erkennen, dass ein Fehler aufgetereten ist, kann ihn aber nicht Korrigieren. 101010 könnte zu 100000 umgewandelt werden mit zwei Fehlern, und man würde das fälschlicherweise zu 000000 korrigieren."
              }
              textOnCorrect={
                "Bei zwei Fehlern kann man nur erkennen, dass ein Fehler aufgetereten ist, kann ihn aber nicht Korrigieren. 101010 könnte zu 100000 umgewandelt werden mit zwei Fehlern, und man würde das fälschlicherweise zu 000000 korrigieren."
              }
              solution={0}
            />
          )}
          {taskStateD[3] && (
            <YN
              callerFunction={() => handleTaskStateD(4)}
              question={"Fehler erkennen, wenn drei Fehler aufgetreten sind."}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "010101 könnte sich per Zufall bei 3 Fehlern zu 000000 umwandeln, was man nicht als Fehler erkennen kann."
              }
              textOnCorrect={
                "010101 könnte sich per Zufall bei 3 Fehlern zu 000000 umwandeln, was man nicht als Fehler erkennen kann."
              }
              solution={0}
            />
          )}
          {taskStateD[4] && (
            <YN
              callerFunction={() => {}}
              question={
                "Fehler korrigieren, wenn drei Fehler aufgetreten sind."
              }
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Man kann unter umständen die Fehler nicht erkennen und darum erst gar nicht korrigieren."
              }
              textOnCorrect={
                "Man kann unter umständen die Fehler nicht erkennen und darum erst gar nicht korrigieren."
              }
              solution={0}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Task4;
