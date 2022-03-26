import React, { useState } from "react";
import TextExercise from "../components/TextExercise";
import MC from "../components/MC";
import CorrectionBitsExercise2 from "../components/CorrectionBitsExercise2";
import sumChecksum from "../functions/sumChecksum";
import Info from "../components/Info";

/*
Task 11: Hamming-Codes

Task A: some questions about the properties of Hamming-Codes.

Task B: The user must set the correlation matrix for the control bits of a Hamming-Code.
*/

function Task11() {
  // used for checking if answer by the user to the matrix was correct or not
  const [matrixSolution, setMatrixSolution] = useState("");

  // keeping track if subtasks of A are solved or not
  const [stateA, setStateA] = useState(Array(4).fill(false));

  const handleStateA = (index) => {
    let temp = [...stateA];
    temp[index] = true;
    setStateA(temp);
  };

  // number of fails after which the hint is revealed
  const maxFails = 3;

  // current number of fails of subtask B
  const [numberOfFails, setNumberOfFails] = useState(0);

  // bits of our 7-4 Hamming Code
  const numButtons = 7;

  // used for toggle and setting the values for the control bits
  const [correlationList] = useState([[0], [1], [2], [3], [4], [5], [6]]);

  // toggle status of each button
  const [toggle, setToggle] = useState(Array(numButtons).fill(false));

  // value of each button, 0 or 1
  const [values, setValues] = useState(Array(numButtons).fill(0));

  // changing values
  const handleValues = (arr) => {
    let temp = [...values];
    for (let i = 0; i < arr.length; ++i) {
      let tempIndex = arr[i];
      temp[tempIndex] = (temp[tempIndex] + 1) % 2;
    }
    setValues(temp);
  };

  // toggle function over the buttons
  const handleToggle = (arr) => {
    let temp = [...toggle];
    for (let i = 0; i < arr.length; ++i) {
      let tempIndex = arr[i];
      temp[tempIndex] = !temp[tempIndex];
    }
    setToggle(temp);
  };

  // renderung the buttons
  let renderButtons = [];

  // only normal bits can be clicked, but both can be toggled
  for (let i = 0; i < 4; ++i) {
    renderButtons.push(
      <button
        key={i}
        onClick={() => handleValues(correlationList[i])}
        onMouseOver={() => handleToggle(correlationList[i])}
        onMouseOut={() => handleToggle(correlationList[i])}
        className={toggle[i] ? "squareBit4 toggleSquare" : "squareBit4"}
      >
        <h3>{values[i]}</h3>
      </button>
    );
  }
  // control bits can't be clicked, but both can be toggled
  for (let i = 4; i < numButtons; ++i) {
    renderButtons.push(
      <button
        key={i}
        onMouseOver={() => handleToggle(correlationList[i])}
        onMouseOut={() => handleToggle(correlationList[i])}
        className={toggle[i] ? "squareBit5 toggleSquare" : "squareBit5"}
      >
        <h3>{values[i]}</h3>
      </button>
    );
  }

  // for correlation table
  const [matrixValues, setMatrixValues] = useState(() => {
    let temp1 = ["X", "B1", "B2", "B3", "B4", "C1", "C2", "C3"];
    let temp2 = ["C1", 0, 0, 0, 0, 1, 0, 0];
    let temp3 = ["C2", 0, 0, 0, 0, 0, 1, 0];
    let temp4 = ["C3", 0, 0, 0, 0, 0, 0, 1];
    return [temp1, temp2, temp3, temp4];
  });

  // handle clicks in the matrix
  const handleMatrixValue = (i, j) => {
    // reset values, otherwise leads to false results
    setValues(Array(7).fill(0));

    // changing matrix values
    let tempM = [...matrixValues];
    let temp = tempM[i][j];

    // changing correlation lists
    let tempCL = [...correlationList];
    let tempC = tempCL[i + 3];
    let tempB = tempCL[j - 1];

    if (temp === 0) {
      tempM[i][j] = 1;
      tempCL[i + 3] = tempC.push(j - 1);
      tempCL[j - 1] = tempB.push(i + 3);
    } else {
      tempM[i][j] = 0;
      tempCL[i + 3] = tempC.splice(tempC.indexOf(j - 1), 1);
      tempCL[j - 1] = tempB.splice(tempB.indexOf(i + 3), 1);
    }

    setMatrixValues(tempM);
  };

  // Matrix Buttons
  let matrixButtons = [];

  matrixButtons.push(
    <button key={0} disabled className={"squareBit5"}>
      <h3>{matrixValues[0][0]}</h3>
    </button>
  );

  // deko Buttons
  for (let i = 1; i < 5; ++i) {
    matrixButtons.push(
      <button key={i} disabled className={"squareBit4"}>
        <h3>{matrixValues[0][i]}</h3>
      </button>
    );
  }

  // deko Buttons
  for (let i = 5; i < 8; ++i) {
    matrixButtons.push(
      <button key={i} disabled className={"squareBit5"}>
        <h3>{matrixValues[0][i]}</h3>
      </button>
    );
  }

  // c1 deko button
  matrixButtons.push(
    <button key={8} disabled className={"squareBit5"}>
      <h3>{matrixValues[1][0]}</h3>
    </button>
  );

  // real buttons row 1
  for (let i = 1; i < 5; ++i) {
    matrixButtons.push(
      <button
        key={i + 8}
        disabled={matrixSolution === true}
        className={"squareBit4"}
        onClick={() => handleMatrixValue(1, i)}
      >
        <h3>{matrixValues[1][i]}</h3>
      </button>
    );
  }

  // deko buttons row 1
  for (let i = 5; i < 8; ++i) {
    matrixButtons.push(
      <button key={i + 8} disabled className={"squareBit5"}>
        <h3>{matrixValues[1][i]}</h3>
      </button>
    );
  }

  // c2 deko button
  matrixButtons.push(
    <button key={16} disabled className={"squareBit5"}>
      <h3>{matrixValues[2][0]}</h3>
    </button>
  );

  // real buttons row 2
  for (let i = 1; i < 5; ++i) {
    matrixButtons.push(
      <button
        key={i + 16}
        disabled={matrixSolution === true}
        className={"squareBit4"}
        onClick={() => handleMatrixValue(2, i)}
      >
        <h3>{matrixValues[2][i]}</h3>
      </button>
    );
  }

  // deko buttons row 2
  for (let i = 5; i < 8; ++i) {
    matrixButtons.push(
      <button key={i + 16} disabled className={"squareBit5"}>
        <h3>{matrixValues[2][i]}</h3>
      </button>
    );
  }

  // c3 deko button
  matrixButtons.push(
    <button key={24} disabled className={"squareBit5"}>
      <h3>{matrixValues[3][0]}</h3>
    </button>
  );

  // real buttons row 2
  for (let i = 1; i < 5; ++i) {
    matrixButtons.push(
      <button
        key={i + 24}
        disabled={matrixSolution === true}
        className={"squareBit4"}
        onClick={() => handleMatrixValue(3, i)}
      >
        <h3>{matrixValues[3][i]}</h3>
      </button>
    );
  }

  // deko buttons row 2
  for (let i = 5; i < 8; ++i) {
    matrixButtons.push(
      <button key={i + 24} disabled className={"squareBit5"}>
        <h3>{matrixValues[3][i]}</h3>
      </button>
    );
  }

  // for checking the matrix solution
  const checkMartix = () => {
    let sumR1 = sumChecksum([...matrixValues[1]].splice(1, 4));
    let sumR2 = sumChecksum([...matrixValues[2]].splice(1, 4));
    let sumR3 = sumChecksum([...matrixValues[3]].splice(1, 4));

    let sumC1 = sumChecksum([
      matrixValues[1][1],
      matrixValues[2][1],
      matrixValues[3][1],
    ]);
    let sumC2 = sumChecksum([
      matrixValues[1][2],
      matrixValues[2][2],
      matrixValues[3][2],
    ]);
    let sumC3 = sumChecksum([
      matrixValues[1][3],
      matrixValues[2][3],
      matrixValues[3][3],
    ]);
    let sumC4 = sumChecksum([
      matrixValues[1][4],
      matrixValues[2][4],
      matrixValues[3][4],
    ]);

    // all rows must add up to 3
    let temp1 = sumR1 === "03" && sumR2 === "03" && sumR3 === "03";

    // all rows add up to 2 except one adds to 3
    let temp2 =
      sumC1 === "02" && sumC2 === "02" && sumC3 === "02" && sumC4 === "03";
    let temp3 =
      sumC1 === "02" && sumC2 === "02" && sumC3 === "03" && sumC4 === "02";
    let temp4 =
      sumC1 === "02" && sumC2 === "03" && sumC3 === "02" && sumC4 === "02";
    let temp5 =
      sumC1 === "03" && sumC2 === "02" && sumC3 === "02" && sumC4 === "02";

    let temp6 = temp2 || temp3 || temp4 || temp5;
    let tempFinal = temp1 && temp6;

    setMatrixSolution(tempFinal);

    if (!tempFinal) {
      setNumberOfFails(numberOfFails + 1);
    }
  };

  return (
    <div className="main">
      <h1>Aufgabe 11: Effiziente Kodierung 3</h1>

      <div className="space"></div>

      <p>
        Der Hamming-Code nutzt die effizienteste Methode um eine Kodierung zu
        konstruieren, welche einen Mindestendabstand zwischen den Code-Wörter
        von 3 hat, unter der Nutzung der wenigsten Kontrollbits.
      </p>

      <div className="space"></div>

      <Info
        text={
          <p>
            Jede Stelle in einem String kann man Binär darstellen, z.B. die
            Stelle 4 mit 100. Mit n Kontrollbits kann man 2<sup>n</sup> Zahlen
            darstellen. Allerdings fällt die Zahl 0 weg, weil jedes Bit (oder
            jede Stelle), mit einem der Kontrollbits in verbindung stehen muss.
            Man ordnet jeder Stelle einer der 2<sup>n</sup> - 1 mögliche Zahlen
            zu, so dass bei einem Fehler im String die Stelle eindeutig erkannt
            werden kann.
          </p>
        }
      />

      <div className="space"></div>

      <TextExercise
        callerFunction={() => handleStateA(0)}
        question={
          <p>
            Wie viele Kontrollbits benötigen Sie für einen Hamming-Code, welcher
            eine gesammte Nachrichtenlänge (inklusive Kontrollbits) von 31 hat.
          </p>
        }
        text={<p></p>}
        solutions={["5"]}
        textOnCorrect={""}
        textOnWrong={
          <p>Man benötigt 5 Kontrollbits um 2⁵ - 1 = 31 Bits abzudecken.</p>
        }
      />

      {stateA[0] && (
        <>
          {" "}
          <div className="space"></div>
          <TextExercise
            callerFunction={() => handleStateA(1)}
            question={
              <p>
                Wie viele verschiedene Code-Wörter sind das in der Kodierung?
              </p>
            }
            text={
              <p>
                Anzahl als Zweierpotenz (2<sup>x</sup>) :
              </p>
            }
            solutions={["2^26", "2²⁶"]}
            textOnCorrect={""}
            textOnWrong={
              <p>
                Es sind insgesammt 2⁵ - 1 = 31 Bits, wobei 5 davon Kontrollbits
                sind. Damit bleiben 31 - 5 = 26 Nachrichtenbits übrig, was 2²⁶
                verschiedene Code-Wörter sind.
              </p>
            }
          />
        </>
      )}

      {stateA[1] && (
        <>
          <div className="space"></div>
          <p>
            Wie viele Kontrollbits benötigen Sie mindestends für einen
            Hamming-Code mit 2¹⁰ Code-Wörtern?
          </p>
          <MC
            callerFunction={() => handleStateA(2)}
            options={[
              <span>3</span>,
              <span>4</span>,
              <span>5</span>,
              <span>6</span>,
            ]}
            answerKey={[false, true, false, false]}
            textOnCorrect={""}
            textOnWrong={
              <p>
                2³ - 1 = 7, was nicht reicht um 10 + 3 = 13 Bits abzudecken. 2⁴
                - 1 = 15 ist die nächst höhere Möglichkeit und kann 10 + 4 = 14
                Bits abdecken. 5 und 6 sind zu viel.
              </p>
            }
          />
        </>
      )}

      {stateA[2] && (
        <>
          <div className="space"></div>
          <p>
            Für eine beliebige gesammte Wortlänge n (inklusive Kontrollbits)
            müssen welche Ungleichungen in einem Hamming-Code erfüllt sein,
            damit man die kleinst mögliche Anzahl an Kontrollbits c hat?
          </p>
          <MC
            callerFunction={() => handleStateA(3)}
            options={[
              <span>
                2<sup>c</sup> - n ≥ 1
              </span>,
              <span>
                2<sup>c</sup> - 1 ≤ n
              </span>,
              <span>
                n - 2<sup>c-1</sup> ≤ 1
              </span>,
              <span>
                2<sup>c</sup> + 1 ≥ n
              </span>,
              <span>
                n - 1 ≥ 2<sup>c-1</sup> - 1
              </span>,
            ]}
            answerKey={[true, false, false, false, true]}
            textOnCorrect={""}
            textOnWrong={
              <p>
                2<sup>c</sup> - 1 ≥ n ≥ 2<sup>c - 1</sup> müssen gelten, was
                glleich den Antworten 1 und 5 ist.
              </p>
            }
          />
        </>
      )}

      <div className="space"></div>
      <div className="task">
        <button
          onClick={() => {
            setStateA(Array(4).fill(true));
          }}
        >
          <p>Aufgabe überspringen</p>
        </button>
      </div>

      <div className="space"></div>

      {stateA[3] && (
        <div className="task">
          <p>
            Ergänzen Sie die Fehlermeldungstabelle für einen Hamming-Code der
            Länge 7 mit der möglichkeit einzelne Fehler korrigieren zu können.
            Die Tabelle wird im Code-Wort Generator direckt umgesetzt. Mehrere
            Antworten sind möglich. Der Beispielstinrg folgt nur einer dieser
            Antworten.
          </p>
          <div className="space"></div>
          <>
            <div className="squareRow">
              {matrixButtons[0]}
              {matrixButtons[1]}
              {matrixButtons[2]}
              {matrixButtons[3]}
              {matrixButtons[4]}
              {matrixButtons[5]}
              {matrixButtons[6]}
              {matrixButtons[7]}
            </div>
            <div className="squareRow">
              {matrixButtons[8]}
              {matrixButtons[9]}
              {matrixButtons[10]}
              {matrixButtons[11]}
              {matrixButtons[12]}
              {matrixButtons[13]}
              {matrixButtons[14]}
              {matrixButtons[15]}
            </div>
            <div className="squareRow">
              {matrixButtons[16]}
              {matrixButtons[17]}
              {matrixButtons[18]}
              {matrixButtons[19]}
              {matrixButtons[20]}
              {matrixButtons[21]}
              {matrixButtons[22]}
              {matrixButtons[23]}
            </div>
            <div className="squareRow">
              {matrixButtons[24]}
              {matrixButtons[25]}
              {matrixButtons[26]}
              {matrixButtons[27]}
              {matrixButtons[28]}
              {matrixButtons[29]}
              {matrixButtons[30]}
              {matrixButtons[31]}
            </div>
          </>
          <div className="smallSpace"></div>
          <div className="squareRow">
            <button
              disabled={matrixSolution === true}
              onClick={() => checkMartix()}
            >
              <p>überprüfe Tabelle</p>
            </button>
          </div>

          {matrixSolution === false && (
            <div className="squareRow">
              <h3 style={{ color: "red" }}>Falsch</h3>
            </div>
          )}

          {matrixSolution && (
            <div className="squareRow">
              <h3 style={{ color: "green" }}>Korrekt</h3>
            </div>
          )}

          {numberOfFails >= maxFails && (
            <>
              <div className="smallSpace"></div>
              <Info
                text={
                  <p>
                    Jede Spalte in der Fehlermeldungstabelle muss eine
                    eindeutige Kombination der Kontrollbits haben.
                  </p>
                }
              />
              <div className="smallSpace"></div>
            </>
          )}

          <div className="smallSpace"></div>
          <div className="squareRow">
            <h3>Code-Wort Generator nach der Tabelle</h3>
          </div>
          <div className="smallSpace"></div>

          <div className="squareRow">{renderButtons}</div>

          <div className="smallSpace"></div>
          <div className="squareRow">
            <h3>Beispiel String mit einem Fehler</h3>
          </div>
          <CorrectionBitsExercise2 />
        </div>
      )}
    </div>
  );
}

export default Task11;
