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
  // number of questions for subtasks to solve
  const numberOfTasksA = 3;
  const minWrongAnswers1 = 3;
  const minWrongAnswers2 = 5;
  const minWrongAnswers3 = 7;

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
        Wir wollen nun eine Methode anschauen, mit der wir Kodierungen finden zu
        können, welche möglichst wenig Bits benötigen, und dennoch Fehler
        erkennen und korrigieren können. Dazu schauen wir zunächst eine kleine
        Aufgabe an.
      </p>
      <p>
        Gegeben ist ein 4 mal 4 Rechteck, wobei jede Zelle ein eigenes Bit
        repräsentiert. Diese Bits sind nicht alle Zufällig gewählt. Einige von
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
      {[...Array(numberOfTasksA)].map(() => (
        <SquareExecise
          onWorong={() => setWrongAnswersA(wrongAnswersA + 1)}
          onCorrect={() => setCorrectAnswersA(correctAnswersA + 1)}
        />
      ))}
      {wrongAnswersA >= minWrongAnswers1 &&
        correctAnswersA !== numberOfTasksA && (
          <p>
            Hinweis 1: Denken Sie zurück an eine der Ersten Methoden, welche wir
            betrachtet haben.
          </p>
        )}

      {wrongAnswersA >= minWrongAnswers2 &&
        correctAnswersA !== numberOfTasksA && (
          <p>Hinweis 2: Betrachten Sie nur die einzelnen Spalten und Zeilen.</p>
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
            Fehlerhafte bit, indem wir die Zeile und Spalte finden, wo die
            Eigenschaft nicht mehr erfüllt ist. Dort wo diese sich kreuzen, da
            muss der Fehler vorgefallen sein.
          </p>
          <div className="squareGraphics">
            <S1 />
          </div>
          <p>
            Sollten zwei Fehler auftreten, so bemerken wir das zwar, allerdings
            finden wir die Fehler nicht mehr. Im gegebenen Beispiel kommen 4
            Bits in Frage fehlerhaft zu sein, allerdings sind nur 2 falsch.
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
