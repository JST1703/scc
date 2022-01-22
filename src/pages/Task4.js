import React, { useState } from "react";
import MC from "../components/MC";
import arrayFiller from "../functions/arrayFiller";
import errormaker from "../functions/errormaker";

/*
Task 4: codes ans error correction

*/

// Table content
const words = ["Hund", "Mond", "Pizza", "Auto"];
const binaryRep = ["00", "01", "10", "11"];
const encoding = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1],
];

function Task4() {
  const numberOfTasks = 3;

  // keeping track of the number of answers given in each task
  const [answersA, setAnswersA] = useState(0);
  const [answersB, setAnswersB] = useState(0);
  const [answersC, setAnswersC] = useState(0);

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

  // Temp for MC Questions
  const [mcTemp] = useState(() => {
    let sol = arrayFiller(3 * numberOfTasks, () => {
      // random encoding being chosen
      let k = Math.floor(Math.random() * 4);
      if (k === 4) {
        k = 3;
      }
      return k;
    });
    return sol;
  });

  console.log(mcTemp);

  // MC Questions
  let mc4A = []; // one error
  let mc4B = []; // two errors
  let mc4C = []; // three errors

  // for answer key
  let key = arrayFiller(4, () => {
    return false;
  });

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
      <MC
        callerFunction={() => setAnswersA(answersA + 1)}
        question={"Nachricht: " + seqTemp1.join("")}
        options={words}
        answerKey={key1}
        textOnWrong={"Falsch. Die richtige antwort lautet " + words[k1] + "."}
        textOnCorrect="Korrekt."
      />
    );

    mc4B.push(
      <MC
        callerFunction={() => setAnswersB(answersB + 1)}
        question={"Nachricht: " + seqTemp2.join("")}
        options={words}
        answerKey={key2}
        textOnWrong={"Falsch. Die richtige antwort lautet " + words[k2] + "."}
        textOnCorrect="Korrekt."
      />
    );

    mc4C.push(
      <MC
        callerFunction={() => setAnswersC(answersC + 1)}
        question={"Nachricht: " + seqTemp3.join("")}
        options={words}
        answerKey={key3}
        textOnWrong={"Falsch. Die richtige antwort lautet " + words[k3] + "."}
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
        {answersA === numberOfTasks && mc4B}
        {answersB === numberOfTasks && mc4C}
      </div>
    </div>
  );
}

export default Task4;
