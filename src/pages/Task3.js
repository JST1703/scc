import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";
import binaryCheckSymbol2 from "../functions/binaryCheckSymbol2";
import CompareExercise from "../components/CompareExercise";

/*
Task 3: Checksums with Binary Strings

Task A: Given a method for determine a check bit for a binary string,
calculate the other check bits for the next examples.

Task C: Given an other method for determine two check bits for a binary string,
calculate the other check bits for the next examples.

Task C: Different Yes and No Questions about the properties of the check bit methods
*/

function Task3() {
  // number of examples displayed in the exercise
  const numOfExamples = 5;

  // number of wrong answers, before solution is revealed
  const minWrongAnswers = 3;

  // number of questions for subtasks to solve
  const numberOfTasks = 4;

  /* 
  Keeping track of number of correct solutions or wrong answers
  for subtask A. If correctAnswersA === numberOfTasks, then
  subtask A is solved and the next subtask is revealed.
  If wrongAnswersA === minWrongAnswers, then solution for subtask
  A is revealed.
  */
  const [wrongAnswersA, setWrongAnswersA] = useState(0);
  const [correctAnswersA, setCorrectAnswersA] = useState(0);

  /* 
  if true, then next subtask is revealed.
  */
  const [answeredB, setAnsweredB] = useState(false);

  /* 
  Keeping track of number of correct solutions or wrong answers
  for subtask C. If correctAnswersC === numberOfTasks, then
  subtask C is solved and the next subtask is revealed.
  If wrongAnswersC === minWrongAnswers, then solution for subtask
  C is revealed.
  */
  const [wrongAnswersC, setWrongAnswersC] = useState(0);
  const [correctAnswersC, setCorrectAnswersC] = useState(0);

  return (
    <div className="task">
      <h1>Aufgabe 3: Binäre Kodirungen und Fehlererkennung</h1>
      <div className="task3A">
        <p>
          Computer verwenden nur binäre Daten. Aber besoders da können schneller
          Fehler auftreten. Eine 1 kann sich schnell in eine 0 umwandeln (oder
          andersrum), wenn z.b. beim Versenden von Daten ein elektronischer
          Fehler auftritt. Je länger solche binäre Daten sind, desto höher ist
          die Wahrscheinlichkeit, dass ein slocher Fehler auftritt. Erneut ist
          hier ein Beipiel Gegeben von binären Folgen (hier in Schwarz) und eine
          Mthode um Fehler zu erkennen. Dafür berechnet man ein Prüfbit (hier in
          Rot). Finden Sie anhand der gegeben Beipile diese Methode raus und
          ergänzen Sie die fehlenden Prüfbits.
        </p>
        {[...Array(numOfExamples)].map(() => (
          <ChecksumExample
            checksumFunction={binaryCheckSymbol1}
            sequence={randomBinaryString(0)}
          />
        ))}
        {[...Array(numberOfTasks)].map(() => (
          <ChecksumExercise
            checksumFunction={binaryCheckSymbol1}
            sequence={randomBinaryString(0)}
            onWorong={() => setWrongAnswersA(wrongAnswersA + 1)}
            onCorrect={() => setCorrectAnswersA(correctAnswersA + 1)}
          />
        ))}
        {wrongAnswersA >= minWrongAnswers && correctAnswersA !== numberOfTasks && (
          <p>
            Das ist leider nicht korrekt. Das Prüfbit wird so gewählt, dass die
            Anzahl Einsen in der gesammten Folge (inklusive Prüfbit) gerade ist.
            Zum beispiel hat die Folge 11001 das Prüfbit{" "}
            <span style={{ color: "red" }}>{1}</span>. Wenn man die zusammenfügt
            hat die gesammte Folge 11001
            <span style={{ color: "red" }}>{1}</span> eine gerade Anzahl Einsen.
            Anders hat die Folge 1001 bereits eine gerande Anzahl einsen und
            somit das Prüfbit <span style={{ color: "red" }}>{0}</span>.
            Zusammengefügt ist das dann 1001
            <span style={{ color: "red" }}>{0}</span>. Ergänzen Sie die
            restlichen Prüfbits um fortfahren zu können.
          </p>
        )}
      </div>
      {correctAnswersA === numberOfTasks && (
        <div className="task3B">
          <p>fjiwejfiweofjiewijo</p>
          <CompareExercise
            checksumFunction={binaryCheckSymbol1}
            sequence={randomBinaryString(0)}
            textOnCorrect={"correct"}
            textOnWrong={"wrong"}
            comparer={(a, b, c, d) => {
              return false; // TODO Here
            }}
            callerFunction={() => {
              setAnsweredB(true);
            }}
          />
        </div>
      )}
      {answeredB && (
        <div className="task3C">
          <p>bla bla bla</p>
          {[...Array(numOfExamples)].map(() => (
            <ChecksumExample
              checksumFunction={binaryCheckSymbol2}
              sequence={randomBinaryString(0)}
            />
          ))}
          {[...Array(numberOfTasks)].map(() => (
            <ChecksumExercise
              checksumFunction={binaryCheckSymbol2}
              sequence={randomBinaryString(0)}
              onWorong={() => setWrongAnswersC(wrongAnswersC + 1)}
              onCorrect={() => setCorrectAnswersC(correctAnswersC + 1)}
            />
          ))}
          {wrongAnswersC >= minWrongAnswers &&
            correctAnswersC !== numberOfTasks && <p>Wrong</p>}
        </div>
      )}
      {correctAnswersC === numberOfTasks && (
        <div>
          {" "}
          <p>Swaaag</p>
        </div>
      )}
    </div>
  );
}

export default Task3;
