import React, { useState } from "react";
import CorrectionBitsExercise from "../components/CorrectionBitsExercise";
import TextExercise from "../components/TextExercise";
import { ReactComponent as S0 } from "../graphics/Square_0_T10.svg";
import { ReactComponent as S1 } from "../graphics/Square_1_T10.svg";
import { ReactComponent as S2 } from "../graphics/Square_2_T10.svg";
import Info from "../components/Info";
import YN from "../components/YN";

/*
Task 10

Task A: Given is a bit string with some normal bits and some control bits.
In the exercise, the user is given sequences containing exact one error that must be found.

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
        className={toggle[i] ? "squareBit2 toggleSquare" : "squareBit2"}
      >
        <h3>{values[i]}</h3>
      </button>
    );
  }
  for (let i = 9; i < numButtons; ++i) {
    renderButtons.push(
      <button
        key={i}
        onMouseOver={() => handleToggle(correlationList[i])}
        onMouseOut={() => handleToggle(correlationList[i])}
        className={toggle[i] ? "squareBit3 toggleSquare" : "squareBit3"}
      >
        <h3>{values[i]}</h3>
      </button>
    );
  }

  // number of tasks in A
  const numberOfTasksA = 3;

  // number of times to fail before hint is revealed
  const numberOfFails = 3;

  // keeping track if task A is solved or not
  const [stateA, setStateA] = useState(0);

  // keeping track if task A is solved wrongly
  const [stateAF, setStateAF] = useState(0);

  let taskArender = [];
  for (let i = 0; i < numberOfTasksA; ++i) {
    taskArender.push(
      <>
        <CorrectionBitsExercise
          key={i}
          callerFunction={() => setStateA(stateA + 1)}
          functionOnWrong={() => setStateAF(stateAF + 1)}
        />
        <div className="smallSpace"></div>
      </>
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
    <div className="main">
      <h1>Aufgabe 10: Effiziente Kodierung 2</h1>

      <div className="space"></div>

      <p>
        Gegeben ist eine Kodierung, wobei die Code-Wörter aus 9 Nachrichtenbits
        und 7 <span style={{ color: "blue" }}>Kontrollbits</span> bestehen. Die{" "}
        <span style={{ color: "blue" }}>Kontrollbits</span> korrelieren mit den
        Nachrichtenbits wie in den magischen Rechtecken.
      </p>

      <div className="task">
        <div className="taskLeft">
          <S0 />
          <div className="squareRow">
            <h3>Code-Wort angeortnet im Quadrat</h3>
          </div>
          <div className="space"></div>
          <S2 />
          <div className="squareRow">
            <h3>Fehlermeldungstabelle</h3>
          </div>
        </div>
        <div className="taskRight">
          <S1 />
          <div className="squareRow">
            <h3>Code-Wort angeortnet im Array</h3>
          </div>
          <div className="space"></div>
          <p>
            Die Nachrichtenbits B1 bis B9 werden durch die{" "}
            <span style={{ color: "blue" }}>Kontrollbits</span>{" "}
            <span style={{ color: "blue" }}>C1</span> bis{" "}
            <span style={{ color: "blue" }}>C7</span> kontrolliert. Die{" "}
            <span style={{ color: "blue" }}>Kontrollbits</span> werden so
            gesetzt, dass die Spalten und Zeilen eine gerade Anzahl an Einsen
            besitzt. Sollte ein Bit fehlerhaft sein, wird dies über die{" "}
            <span style={{ color: "blue" }}>Kontrollbits</span> erkannt. Die
            Fehlermeldungstabelle zeigt an, welche{" "}
            <span style={{ color: "blue" }}>Kontrollbits</span> welche
            Nachrichtenbits kontrollieren.
          </p>
        </div>
      </div>

      <div className="space"></div>

      <div className="task">
        <div className="squareRow">
          <h3>Code-Wort Generator</h3>
          <p>(zum Klicken und Probieren)</p>
        </div>
        <div className="smallSpace"></div>

        <div className="squareRow">{renderButtons}</div>

        <div className="space"></div>

        <p>
          <b>10.1)</b> Gegeben sind Strings, welche entstanden sind durch einen
          Fehler in einem Code-Wort. Finden Sie in den gegebenen Strings das
          fehlerhafte Bit.
        </p>

        <div className="space"></div>
        {taskArender}
      </div>

      {stateAF >= numberOfFails && (
        <>
          <Info
            text={
              <p>
                Hinweis: Kopieren Sie am besten die Nachrichtenbits im Code-Wort
                Generator und überprüfen Sie mit den{" "}
                <span style={{ color: "blue" }}>Kontrollbits</span>, welche
                nicht mit derjenigen vom Generator übereinstimmen, welches Bit
                fehlerhaft sein könnte. Es können auch{" "}
                <span style={{ color: "blue" }}>Kontrollbits</span> falsch sein.
              </p>
            }
          />
          <div className="space"></div>
        </>
      )}

      <div className="task">
        <button
          onClick={() => {
            setStateA(numberOfTasksA);
          }}
        >
          <p>Aufgabe überspringen</p>
        </button>
      </div>

      <div className="space"></div>

      <div className="task">
        {stateA >= numberOfTasksA && (
          <TextExercise
            callerFunction={() => handleStateB(0)}
            question={
              <p>
                <b>10.2)</b> Wie viele verschiedene Code-Wörter sind in diesem
                Fall in der Kodierung enthalten? Geben Sie die Pontenz an, z.B.
                bei 2<sup>3</sup> Code-Wörter lautet Ihre Lösung 3.
              </p>
            }
            text={<p></p>}
            solutions={["9", "2⁹", "2^9"]}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Bei 9 Nachrichtenbits können wir 2⁹ verschiedene Code-Wörter
                konstruieren.
              </p>
            }
          />
        )}
        <div className="space"></div>
        {stateB[0] && (
          <TextExercise
            callerFunction={() => handleStateB(1)}
            question={
              <p>
                <b>10.3)</b> Angenommen wir haben eine Kodierung mit n
                Nachrichtenbits mit einem Abstand von 3. Wie viele zusätzliche
                Bits benötigen wir, wenn wir die Nachrichtenlänge verdreifachen?
              </p>
            }
            text={<p></p>}
            solutions={["2n", "2*n"]}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Wenn wir n Nachrichtenbits haben und die gesamte Nachricht
                verdreifachen, dann haben wir 2n zusätzliche Bits.
              </p>
            }
          />
        )}
        <div className="space"></div>
        {stateB[1] && (
          <TextExercise
            callerFunction={() => handleStateB(2)}
            question={
              <p>
                <b>10.4)</b> Betrachten wir dieselbe Kodierung mit n
                Nachrichtenbits und einem Abstand von 3. Ordenen wir die
                Nachrichtenbits in einem Rechteck an mit den Dimensionen a x b
                (z.B. bei n = 6 ist a = 3 und b = 2), wie viele zusäzlichen
                Kontrollbits benötigen wir in diesem Fall in Abhängigkeit von a
                und b?
              </p>
            }
            text={<p></p>}
            solutions={["1+a+b", "1+b+a", "a+1+b", "a+b+1", "b+a+1", "b+1+a"]}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                a + b + 1 ist die richtige Lösung. Für jede Spalte und jede
                Zeile braucht es ein{" "}
                <span style={{ color: "blue" }}>Kontrollbit</span>. Das
                zusätzliche Bit ist dasjenige oben rechts im Rechteck.
              </p>
            }
          />
        )}
        <div className="space"></div>
        {stateB[2] && (
          <YN
            callerFunction={() => {}}
            question={
              <p>
                <b>10.5)</b> Welche der beiden genannten Methoden benötigt
                weniger zusätzliche Bits?
              </p>
            }
            optionYes={<span>Die Anzahl Nachrichtenbits verdreifachen</span>}
            optionNo={
              <span>
                Nach der Methode der Rechtecke die Kontrollbits beifügen
              </span>
            }
            solution={0}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                a und b sind die Höhe und die Breite des Rechtecks. a und b kann
                man so wählen, dass n &gt; a und n &gt; b gelten und folglich
                gilt 2n &gt; a + b + 1.
              </p>
            }
          />
        )}
      </div>
    </div>
  );
}

export default Task10;
