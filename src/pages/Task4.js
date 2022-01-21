import React from "react";
import MC from "../components/MC";
import arrayFiller from "../functions/arrayFiller";

/*
Task 4: codes ans error correction

*/

function Task4() {
  // Table content
  const words = ["Hund", "Mond", "Pizza", "Auto"];
  const binaryRep = ["00", "01", "10", "11"];
  const encoding = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1],
  ];

  // Table for encoding
  const table = [];

  // Table Head
  table.push(
    <tr>
      <th>Wort</th>
      <th>Binäre Darstellung</th>
      <th>Kodierung</th>
    </tr>
  );

  // Table items
  for (let i = 0; i < 4; ++i) {
    table.push(
      <tr>
        <td>{words[i]}</td>
        <td>{binaryRep[i]}</td>
        <td>{encoding[i]}</td>
      </tr>
    );
  }

  // MC Questions task4A
  const mc4A = [];

  // questions with one error
  for (let i = 0; i < 2; ++i) {
    // random encoding being chosen
    let k = Math.floor(Math.random() * 4);
    if (k === 4) {
      k = 3;
    }

    // for answer key
    let key = arrayFiller(4, () => {
      return false;
    });
    key[k] = true;

    mc4A.push(
      <MC
        callerFunction={() => {}}
        question={"Nachricht: " + encoding[k].join("")}
        options={words}
        answerKey={key}
        textOnWrong={"Falsch. Die richtige antwort lautet " + words[k]}
        textOnCorrect="Korrekt."
      />
    );
  }

  return (
    <div className="task">
      <h1>Aufgabe 4: Kodierungen und Fehlerkorrektur 1</h1>
      <div className="task4A">
        <p>
          Wir haben verschiedene Methoden kennen gelehrnt, um Fehler erkennen zu
          können. Diese waren sehr simpel, aber dafür auch sehr Limitiert.
          Bisher konnten wir nur einzelne Fehler erkennen, allerdings nicht of
          nicht mehr als einer, und wir können bisher auch keine Fehler
          korrigieren. Wir wollen nun Kodierungssysteme anschauen, mit denen wir
          auch Fehler korrigieren können.
        </p>
        <p>
          Gegeben sind 4 Wörter, welche wir einer binären Darstellung zuordnen.
          Weiter kodieren wir die binäre Darstellungen, in dem wir diese jeweils
          3mal wiederholen.
        </p>
        <table>{table}</table>
        <p>
          Wenn Sie nun ein bestimmtes Wort kommunizieren wollen, dann versenden
          Sie die entsprechende Kodierung. Wenn Sie "{words[1]}" als Nachricht
          verschicken wollen, dann senden Sie die Kodierung "{encoding[1]}".
          Auch da können Fehler auftreten. Gegeben sind Nachrichten, welche
          Fehler beinhalten. Geben Sie das Wort an, was am wahrscheinlichsten
          die ursprüngliche Nachricht war.
        </p>
        {mc4A}
      </div>
    </div>
  );
}

export default Task4;
