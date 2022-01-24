import React, { useState } from "react";
import MC from "../components/MC";
import YN from "../components/YN";
import arrayFiller from "../functions/arrayFiller";
import errormaker from "../functions/errormaker";

/*
Task 5: codes and error correction

Task A: given an encoding. The user is given a few messages with one error. He must find the original message.

Task B: given an encoding. The user is given a few messages with two errors. He must find the original message, which he might fail.

Task C: given an encoding. The user is given a few messages with one error. He must find the original message, which he might fail.

Task D: Y and N questions about the property of this encoding. The user should realise after the pervious exercises that with this encoding 
you can detect 2 errors, but only correct one error. With task 4, he realizes, that there are different ways of encoding. He should learn in
the next exercise that it is about the distance between the code words.

*/

// Table content
const words = ["Hund", "Mond", "Pizza", "Auto"];
const binaryRep = ["00", "01", "10", "11"];
const encoding = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0],
];

function Task5() {
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

  // MC Questions
  let mc5A = []; // one error
  let mc5B = []; // two errors
  let mc5C = []; // three errors

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

    mc5A.push(
      <MC
        callerFunction={() => setAnswersA(answersA + 1)}
        question={"Nachricht: " + seqTemp1.join("")}
        options={words}
        answerKey={key1}
        textOnWrong={"Falsch. Die richtige antwort lautet " + words[k1] + "."}
        textOnCorrect="Korrekt."
      />
    );

    mc5B.push(
      <MC
        callerFunction={() => setAnswersB(answersB + 1)}
        question={"Nachricht: " + seqTemp2.join("")}
        options={words}
        answerKey={key2}
        textOnWrong={
          "Falsch. Die richtige antwort lautet " +
          words[k2] +
          ". Vergessen Sie nicht, dass es nun 2 Fehler in den Nachrichten gibt."
        }
        textOnCorrect="Korrekt."
      />
    );

    mc5C.push(
      <MC
        callerFunction={() => setAnswersC(answersC + 1)}
        question={"Nachricht: " + seqTemp3.join("")}
        options={words}
        answerKey={key3}
        textOnWrong={
          "Falsch. Die richtige antwort lautet " +
          words[k3] +
          ". 3 Fehler sind aber fast unmöglich zu Korrigieren."
        }
        textOnCorrect="Korrekt."
      />
    );
  }

  return (
    <div className="task">
      <h1>Aufgabe 5: Kodierungen und Fehlerkorrektur 2</h1>
      <div className="task5A">
        <p>
          Wir haben gesehn, dass man mit Kodierungen Fehler in Nachrichten
          erkennen und auch korrigieren kann. Das wollen wir noch genauer
          untersuchen. Wir nehmen eine ähnliche Kodierung wie zuvor. Diesesmal
          wird die binäre Darstellung verdoppelt und es wird ein weiteres Bit
          angefügt. Das angefügte Bit wird so gesetzt, dass die Anzahl Einsen in
          der binären Darstellung und diesem Bit gerade ist.
        </p>
        <table>{table}</table>
        <p>
          Wie zuvor, wenn Sie nun ein bestimmtes Wort kommunizieren wollen, dann
          versenden Sie die entsprechende Kodierung. Wenn Sie "{words[2]}" als
          Nachricht verschicken wollen, dann senden Sie die Kodierung "
          {encoding[2]}". Auch da können Fehler auftreten. Gegeben sind
          Nachrichten, welche genau einen Fehler beinhalten. Geben Sie das Wort
          an, was am wahrscheinlichsten die ursprüngliche Nachricht war.
        </p>
        {mc5A}
        {answersA === numberOfTasks && (
          <p>
            Gegeben sind Nachrichten, welche nun zwei Fehler beinhalten. Können
            Sie immernoch die ursprüngliche Nachricht identifizieren? Probieren
            Sie es aus.
          </p>
        )}
        {answersA === numberOfTasks && mc5B}
        {answersB === numberOfTasks && (
          <p>
            Als letztes versuchen wir Nachrichten zu korrigieren, welche nun
            drei Fehler beinhalten. Können Sie immernoch die ursprüngliche
            Nachricht identifizieren? Probieren Sie es aus.
          </p>
        )}
        {answersB === numberOfTasks && mc5C}

        {answersC === numberOfTasks && (
          <div>
            <p>Mit der gegebenen Kodierung kann man immer...</p>
            <YN
              callerFunction={() => {}}
              question={"Fehler erkennen, wenn ein Fehler aufgetreten ist."}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Flasch. Wenn ein Fehler auftrit, dann ist die fehlerhafte Nachricht gar nicht eines unserer Kode-Wörter."
              }
              textOnCorrect={
                "Richtig. Wenn ein Fehler auftrit, dann ist die fehlerhafte Nachricht gar nicht eines unserer Kode-Wörter."
              }
              solution={1}
            />
            <YN
              callerFunction={() => {}}
              question={"Fehler korrigieren, wenn ein Fehler aufgetreten ist."}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Flasch. Unsere Kode-Wörter unterscheiden sich in mindesten an 3 Stellen. Die fehlerhafte Nachricht unterscheidet sich mit einem Fehler nur an einer Stelle zu einem Kode-Wort und zu allen anderen in mintesten zwei Stellen. Man kan somit die Feherhafte nachricht eindeutig zuordnen."
              }
              textOnCorrect={
                "Richtig. Unsere Kode-Wörter unterscheiden sich in mindesten an 3 Stellen. Die fehlerhafte Nachricht unterscheidet sich mit einem Fehler nur an einer Stelle zu einem Kode-Wort und zu allen anderen in mintesten zwei Stellen. Man kan somit die Feherhafte nachricht eindeutig zuordnen."
              }
              solution={1}
            />

            <YN
              callerFunction={() => {}}
              question={"Fehler erkennen, wenn zwei Fehler aufgetreten sind."}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Falsh. Wenn zewi Fehler auftreten, dann ist die fehlerhafte Nachricht gar nicht eines unserer Kode-Wörter."
              }
              textOnCorrect={
                "Richtig. Wenn zewi Fehler auftreten, dann ist die fehlerhafte Nachricht gar nicht eines unserer Kode-Wörter."
              }
              solution={1}
            />
            <YN
              callerFunction={() => {}}
              question={
                "Fehler korrigieren, wenn zwei Fehler aufgetreten sind."
              }
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Flasch. Bei zwei Fehlern kann man nur erkennen, dass ein Fehler aufgetereten ist, kann ihn aber nicht Korrigieren. 101010 könnte zu 100000 umgewandelt werden mit zwei Fehlern, und man würde das fälschlicherweise zu 000000 korrigieren."
              }
              textOnCorrect={
                "Richtig. Bei zwei Fehlern kann man nur erkennen, dass ein Fehler aufgetereten ist, kann ihn aber nicht Korrigieren. 101010 könnte zu 100000 umgewandelt werden mit zwei Fehlern, und man würde das fälschlicherweise zu 000000 korrigieren."
              }
              solution={0}
            />

            <YN
              callerFunction={() => {}}
              question={"Fehler erkennen, wenn drei Fehler aufgetreten sind."}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Falsh. 01011 könnte sich per Zufall bei 3 Fehlern zu 00000 umwandeln, was man nicht als Fehler erkennen kann."
              }
              textOnCorrect={
                "Richtig. 01011 könnte sich per Zufall bei 3 Fehlern zu 00000 umwandeln, was man nicht als Fehler erkennen kann."
              }
              solution={0}
            />
            <YN
              callerFunction={() => {}}
              question={
                "Fehler korrigieren, wenn drei Fehler aufgetreten sind."
              }
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Flasch. Man kann unter umständen die Fehler nicht erkennen und darum erst gar nicht korrigieren."
              }
              textOnCorrect={
                "Richtig. Man kann unter umständen die Fehler nicht erkennen und darum erst gar nicht korrigieren."
              }
              solution={0}
            />
            <YN
              callerFunction={() => {}}
              question={"Ist diese Kodierung besser als die Vorherige?"}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnWrong={
                "Flasch. Beide Kodierungen haben die gleichen Eigenschaften. Diese ist zwar 1 Bit kürzer und somit effizienter, aber das ist hier vernachlässigbar."
              }
              textOnCorrect={
                "Richtig. Beide Kodierungen haben die gleichen Eigenschaften. Diese ist zwar 1 Bit kürzer und somit effizienter, aber das ist hier vernachlässigbar."
              }
              solution={0}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Task5;
