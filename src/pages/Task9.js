import React, { useState } from "react";
import SquareExeciseExample from "../components/SquareExerciseExample";
import SquareExecise from "../components/SquareExercise";
import { ReactComponent as S0 } from "../graphics/Square_0_T9.svg";
import { ReactComponent as S1 } from "../graphics/Square_1_T9.svg";
import { ReactComponent as S2 } from "../graphics/Square_2_T9.svg";
import { ReactComponent as S3 } from "../graphics/Square_3_T9.svg";

/*
Task 9: Given are 4x4 squares where each square has a digit 0 or 1.
Some squares serve as control bits. In the exercise, the user
is given squares containing exact one error that must be found.
*/

function Task9() {
  // used for theory at the beginning
  const binaryRep = ["00", "01", "10", "11"];

  // number of questions for subtasks to solve
  const numberOfTasksA = 3;
  const minWrongAnswers1 = 3;
  const minWrongAnswers2 = 5;
  const minWrongAnswers3 = 7;

  // Table for encoding
  const table = [];

  // Table Head
  table.push(
    <tr key={4}>
      <th>Binäre Darstellung</th>
      <th>Kodierung</th>
    </tr>
  );

  // Table items
  for (let i = 0; i < 4; ++i) {
    table.push(
      <tr key={i}>
        <td>{binaryRep[i]}</td>
        <td>
          {binaryRep[i]}
          <span style={{ color: "red" }}>{binaryRep[i]}</span>
          <span style={{ color: "green" }}>{binaryRep[i] + " "}</span>
        </td>
      </tr>
    );
  }

  /* 
  Keeping track of number of correct solutions or wrong answers
  for subtask A. If correctAnswersA === numberOfTasks, then
  subtask A is solved and the next subtask is revealed.
  If wrongAnswersA === minWrongAnswers, then solution for subtask
  A is revealed.
  */
  const [wrongAnswersA, setWrongAnswersA] = useState(0);
  const [correctAnswersA, setCorrectAnswersA] = useState(0);

  return (
    <div className="task">
      <h1>Aufgabe 9: Effiziente Kodierung 1</h1>
      <p>
        Bei der Konstruktion einer Kodierung ist uns der Abstand sehr wichtig.
        Der Abstand ist massgebend, wie viele Fehler wir erkennen oder
        korrigieren können. Wenn wir z.B. eine Kodierung mit 4 Wörtern und einem
        Abstand von 3 haben wollen, sodass wir einzelne Fehler korrigieren
        können, dann können wir ganz einfach die Wörter verdreifachen. Im
        gegebenen Beispiel haben wir die 4 Wörter, welche einen Abstand von 1
        Haben. Durch die Verdreifachung haben die Wörter einen Abstand von 1 in
        jeder Sektion (Schwarz, Rot, Grün), was einen totalen Abstand von 3
        ergibt.
      </p>
      <table>
        <tbody>{table}</tbody>
      </table>
      <p>
        Mit der Verdreifachung können wir immer eine Kodierung schaffen, mit
        Abstand 3 und das für jede Wortlänge. Das ist alllerdings nicht
        effizient. Die Nachrichten werden somit 3 mal so lang, wobei wir jeweils
        nur Fehler korrigieren können, wenn maximal einer auftritt. Werden die
        Nachrichten zu Lang, dann erhöt sich die Wahrscheinlichkeit, dass
        mehrere Fehler auftreten.
      </p>
      <p>
        Wir wollen uns dazu andere Methoden anschauen, um effizientere
        Kodierungen zu finden. Dazu fangen wir mit einer kleinen Aufgabe an.
        Gegeben ist ein 4 mal 4 Rechteck, wobei jede Zelle ein eigenes Bit
        repräsentiert. Diese Bits sind nicht alle zufällig gewählt. Einige von
        ihnen sind, wie wir das zu Beginn gesehen haben, Prüfbits oder auch
        Kontrollbits genannt. Das gegebene Rechteck erfüllt eine bestimmte
        Eigenschaft. Wenn ein Bit nicht mehr korrekt sein sollte, dann können
        wir es dank dieser Eigenschaft finden und auch korrigieren.
      </p>
      <SquareExeciseExample />
      <p>
        Hier sind nun einige andere Rechtecke, bei denen ein Bit falsch ist.
        Erkennen Sie, welche Eigenschaft wir suchen? Finden Sie anhand des
        gegebenen Beispieles das falsche Bit in jedem der Rechtecke.
      </p>
      {[...Array(numberOfTasksA)].map((e, i) => (
        <SquareExecise
          key={i}
          onWorong={() => setWrongAnswersA(wrongAnswersA + 1)}
          onCorrect={() => setCorrectAnswersA(correctAnswersA + 1)}
        />
      ))}
      {wrongAnswersA >= minWrongAnswers1 &&
        correctAnswersA !== numberOfTasksA && (
          <p>
            Hinweis 1: Denken Sie zurück an eine der ersten Methoden, welche wir
            betrachtet haben.
          </p>
        )}

      {wrongAnswersA >= minWrongAnswers2 &&
        correctAnswersA !== numberOfTasksA && (
          <p>Hinweis 2: Betrachten Sie die einzelnen Spalten und Zeilen.</p>
        )}

      {wrongAnswersA >= minWrongAnswers3 &&
        correctAnswersA !== numberOfTasksA && (
          <p>
            Lösung: Die Anzahl Einsen in jeder Zeile und jeder Spalte muss
            gerade sein. Der Fehler lieg da, wo sich die Spalte und die Zeile
            kreuzen, welche fehlerhaft sind. Um fortfahren zu können, müssen Sie
            die Aufgabe fertig lösen.
          </p>
        )}

      {correctAnswersA === numberOfTasksA && (
        <div>
          <p>
            Wir haben zwei arten von Bits. Die einen sind die normalen Bits B
            und die Kontrollbits C. Die eigentliche Nachricht ist
            B1-B2-B3-B4-B5-B6-B7-B8-B9 und die anderen Bits dienen zur
            Fehlererkennung und Korrektur.
          </p>
          <div className="squareGraphics">
            <S0 />
          </div>
          <p>
            Die Kontrollbits sind so gesetzt, dass jede Zeile und Spalte eine
            gerade Anzahl an Einsen hat. Bei einem Fehler finden wir das
            fehlerhafte Bit, indem wir die Zeile und Spalte finden, wo die
            Eigenschaft nicht mehr erfüllt ist. Dort wo diese sich kreuzen, da
            muss der Fehler vorgefallen sein.
          </p>
          <div className="squareGraphics">
            <S1 />
          </div>
          <p>
            Sollten zwei Fehler auftreten, so bemerken wir das zwar, allerdings
            finden wir die Fehler nicht mehr. Im gegebenen Beispiel kommen 4
            Bits infrage fehlerhaft zu sein, allerdings sind nur 2 falsch.
          </p>
          <div className="squareGraphics">
            <S2 />
          </div>
          <p>
            Dieses Beispiel zeigt, dass 3 Fehler unter Umständen nicht mehr
            erkannt werden können.
          </p>
          <div className="squareGraphics">
            <S3 />
          </div>
        </div>
      )}
    </div>
  );
}

export default Task9;
