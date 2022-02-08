import React, { useState } from "react";
import TextExercise from "../components/TextExercise";
import MC from "../components/MC";
import CorrectionBitsExercise2 from "../components/CorrectionBitsExercise2";
import sumChecksum from "../functions/sumChecksum";

/*
Task 11: Hamming-Codes

Task A: some questions about the properties of Hamming-Codes.

Task B: The user must set the correlation matrix for the control bits of a Hamming-Code.
*/

function Task11() {
  // used for checking if answer by the user to the matrix was correct or not
  const [matrixSolution, setMatrixSolution] = useState("");

  // keeping track if task B is solved or not
  const [stateA, setStateA] = useState(Array(4).fill(false));

  const handleStateA = (index) => {
    let temp = [...stateA];
    temp[index] = true;
    setStateA(temp);
  };

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
        className={toggle[i] ? "activeSquare toggleSquare" : "activeSquare"}
      >
        {values[i]}
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
        className={toggle[i] ? "inactiveSquare toggleSquare" : "inactiveSquare"}
      >
        {values[i]}
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

  // deko Buttons
  for (let i = 0; i < 8; ++i) {
    matrixButtons.push(
      <button key={i} disabled className={"inactiveSquare"}>
        {matrixValues[0][i]}
      </button>
    );
  }

  // c1 deko button
  matrixButtons.push(
    <button key={8} disabled className={"inactiveSquare"}>
      {matrixValues[1][0]}
    </button>
  );

  // real buttons row 1
  for (let i = 1; i < 5; ++i) {
    matrixButtons.push(
      <button
        key={i + 8}
        disabled={matrixSolution === true}
        className={"activeSquare"}
        onClick={() => handleMatrixValue(1, i)}
      >
        {matrixValues[1][i]}
      </button>
    );
  }

  // deko buttons row 1
  for (let i = 5; i < 8; ++i) {
    matrixButtons.push(
      <button key={i + 8} disabled className={"inactiveSquare"}>
        {matrixValues[1][i]}
      </button>
    );
  }

  // c2 deko button
  matrixButtons.push(
    <button key={16} disabled className={"inactiveSquare"}>
      {matrixValues[2][0]}
    </button>
  );

  // real buttons row 2
  for (let i = 1; i < 5; ++i) {
    matrixButtons.push(
      <button
        key={i + 16}
        disabled={matrixSolution === true}
        className={"activeSquare"}
        onClick={() => handleMatrixValue(2, i)}
      >
        {matrixValues[2][i]}
      </button>
    );
  }

  // deko buttons row 2
  for (let i = 5; i < 8; ++i) {
    matrixButtons.push(
      <button key={i + 16} disabled className={"inactiveSquare"}>
        {matrixValues[2][i]}
      </button>
    );
  }

  // c3 deko button
  matrixButtons.push(
    <button key={24} disabled className={"inactiveSquare"}>
      {matrixValues[3][0]}
    </button>
  );

  // real buttons row 2
  for (let i = 1; i < 5; ++i) {
    matrixButtons.push(
      <button
        key={i + 24}
        disabled={matrixSolution === true}
        className={"activeSquare"}
        onClick={() => handleMatrixValue(3, i)}
      >
        {matrixValues[3][i]}
      </button>
    );
  }

  // deko buttons row 2
  for (let i = 5; i < 8; ++i) {
    matrixButtons.push(
      <button key={i + 24} disabled className={"inactiveSquare"}>
        {matrixValues[3][i]}
      </button>
    );
  }

  // for checking the matrix solution
  const checkMartix = () => {
    console.log(matrixValues);

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
    let temp1 = sumR1 === "3" && sumR2 === "3" && sumR3 === "3";

    // all rows add up to 2 except one adds to 3
    let temp2 =
      sumC1 === "2" && sumC2 === "2" && sumC3 === "2" && sumC4 === "3";
    let temp3 =
      sumC1 === "2" && sumC2 === "2" && sumC3 === "3" && sumC4 === "2";
    let temp4 =
      sumC1 === "2" && sumC2 === "3" && sumC3 === "2" && sumC4 === "2";
    let temp5 =
      sumC1 === "3" && sumC2 === "2" && sumC3 === "2" && sumC4 === "2";

    let temp6 = temp2 || temp3 || temp4 || temp5;
    let tempFinal = temp1 && temp6;

    setMatrixSolution(tempFinal);
  };

  return (
    <div className="task">
      <h1>Aufgabe 11: Effiziente Kodierung 3</h1>
      <p>
        Tatsächlich können wir noch kürzere Kodierungen erzeugen, mit welchen
        wir immer Fehler der Grösse 1 korrigieren können. Angenommen wir wollen
        eine Kodierung mit 2^4 = 16 Wörtern, mit Abstand 3. Durch Verdreifachen
        haben wir 8 zusätzliche Bits. Mit der Rechteckmethode haben wir 2 + 2 +
        1 = 5 zusätzliche Bits. Der sogenannte Hamming-Code benutzt nur 3
        zusätzliche Kontrollbits.
      </p>
      <p>
        Der Hamming-Code nutzt folgende elegante Lösung: Mit 3 Bits können Sie
        2^3 = 8 verschiedene Zahlen darstellen, von 0 bis 7. Das entspricht den
        7 Stellen in der Nachricht, inklusive der Kontrollbits selber. 000 wird
        selber nicht benutzt. Man ordnet Bits einer der Zahlen 1 bis 7 zu, z.B.
        B4 wird mit 101 gekoppelt. Das bedeutet, dass B4, C1 und C3 zusammen
        eine gerade Anzahl an Einsen haben muss. Würde man einem Bit 000
        zuordnen, dann korreliert dieses Bit mit keinem Kontrollbit. Damit kann
        man keine Fehler mehr an diesem Bit erkennen oder korrigieren können.
        Mit 3 Bits können wir also 2^3 - 1 = 7 Bit Stellen abdecken.
      </p>
      <TextExercise
        callerFunction={() => handleStateA(0)}
        question={
          "Wie viele Kontrollbits benötigen Sie für einen Hamming-Code, welcher eine gesammte Nachrichtenlänge (inklusive Kontrollbits) von 31 hat."
        }
        text={"Anzahl Kontrollbits :"}
        solutions={["5"]}
        textOnCorrect={""}
        textOnWrong={"2^5 - 1 = 31"}
      />
      {stateA[0] && (
        <div>
          <TextExercise
            callerFunction={() => handleStateA(1)}
            question={"Wie viele Nachrichten sind das in der Kodierung?"}
            text={"Anzahl als Zweierpotenz (2^x) :"}
            solutions={["2^26"]}
            textOnCorrect={""}
            textOnWrong={"2^5 - 1 = 31 und 31 - 5 = 26"}
          />
        </div>
      )}
      {stateA[1] && (
        <div>
          <MC
            callerFunction={() => handleStateA(2)}
            question={
              "Wie viele Kontrollbits benötigen Sie mindestends für einen Hamming-Code mit 2^10 Wörtern?"
            }
            options={["3", "4", "5", "6"]}
            answerKey={[false, true, false, false]}
            textOnCorrect={""}
            textOnWrong={
              "2^3 - 1 = 7, was nicht reicht um 10 + 3 = 13 Bits abzudecken. 2^4 - 1 = 15 ist die nächst höhere Zweierpotenz und kann 10 + 4 = 14 Bits abdecken."
            }
          />
        </div>
      )}
      {stateA[2] && (
        <div>
          <MC
            callerFunction={() => handleStateA(3)}
            question={
              "Für eine beliebige gesammte Wortlänge n (inklusive den Kontrollbits) müssen welche Ungleichungen in einem Hamming-Code erfüllt sein, damit man die kleinst mögliche Anzahl an Kontrollbits c hat?"
            }
            options={[
              "2^c - 1 >= n",
              "2^c - 1 <= n",
              "n - 1 <= 2^(c-1)",
              "2^c + 1 >= n",
              "n >= 2^(c-1)",
            ]}
            answerKey={[true, false, false, false, true]}
            textOnCorrect={""}
            textOnWrong={"2^c - 1 >= n > 2^(c-1) müssen gelten."}
          />
        </div>
      )}
      {stateA[3] && (
        <div>
          <p>
            Gegeben ist eine Tabelle, bei welcher Sie die Korrelationen setzen
            müssen, damit Sie einen Hamming-Code haben, mit welchem Sie in der
            Lage sind, Fehler der Grösse 1 zu korrigieren. Alles, was Sie in die
            Tabelle einfügen, wird vom Code unten direkt übernommen. Sie können
            zur Überprüfung Ihrer Lösung schauen, ob Sie die Nachricht mit einem
            Fehler korrigieren können. Für diese Aufgabe gibt es verschiedene
            Lösungen. Es kann sein, dass Ihre Lösung nicht mit derjenigen
            übereinstimmt, welche zum Generieren den fehlerhaften Wörtern
            genutzt wird.
          </p>
          <h4>Korrelations-Tabelle:</h4>
          <div>
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
          </div>
          <div>
            <button
              disabled={matrixSolution === true}
              onClick={() => checkMartix()}
            >
              überprüfe Tabelle
            </button>
          </div>
          {matrixSolution === false && (
            <div className="containerSquares">
              <h3 style={{ color: "red" }}>Falsch</h3>
            </div>
          )}
          {matrixSolution && (
            <div className="containerSquares">
              <h3 style={{ color: "green" }}>Korrekt</h3>
              <p>
                Nun haben Sie eine Methode um effiziente Kodierungen zu
                konstruieren, welche einzelne Fehler korrigieren können. Man
                stellt genau so eine Tabelle auf und schaut, dass jede Spalte
                eindeutig mit den Kontrollbits korreliert, d.h. je zwei Spalten
                unterscheiden sich in mindestends einer Zeile in der Tabelle.
                Damit sollte auch klar sein, dass es keine kürzere Lösung geben
                kann. Ein Kontrollbit weniger und dann könnte man zwei Spalten
                nicht mehr unterscheiden.
              </p>
            </div>
          )}
          <p></p>
          <h4>Kodierung nach der Tabelle:</h4>
          <p></p>
          <div className="containerSquares">
            <div className="squareRow">{renderButtons}</div>
          </div>
          <p></p>
          <h4>Wort mit einem Fehler:</h4>
          <CorrectionBitsExercise2 />
        </div>
      )}
    </div>
  );
}

export default Task11;
