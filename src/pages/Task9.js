import React, { useState } from "react";
import SquareExeciseExample from "../components/SquareExerciseExample";
import SquareColorExample from "../components/SquareColorExample";
import SquareExecise from "../components/SquareExercise";
import Info from "../components/Info";

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
    <div className="main">
      <h1>Aufgabe 9: Effiziente Kodierung 1</h1>

      <div className="space"></div>
      <p>
        Gegeben sind Magische Quadrate, welche aus kleineren Quadrate bestehen,
        mit jeweils einem Bit 1 oder 0. Die Bits in einem Quadrat erfüllen eine
        bestimmte Eigenschaft. Alle Bits im linken Quadrat sind korrekt, bei den
        rechts ist jeweils genau ein Bit falsch. Finden Sie das felerhafte Bit
        in den jeweiligen Quadraten. Die Eigenschaft, welche die Quadrate
        erfüllen sollen, kann Ihnen dabei helfen.
      </p>

      <div className="space"></div>

      <div className="task">
        <div className="taskLeftScroll">
          {wrongAnswersA >= minWrongAnswers1 && (
            <>
              <Info
                text={
                  <p>
                    Hinweis 1: Betrachten Sie die einzelnen Spalten und Zeilen.
                  </p>
                }
              />
              <div className="space"></div>
            </>
          )}

          {wrongAnswersA >= minWrongAnswers2 && (
            <>
              <Info
                text={
                  <p>
                    Hinweis 2: Denken Sie zurück an eine der ersten Methoden,
                    welche wir betrachtet haben.
                  </p>
                }
              />
              <div className="space"></div>
            </>
          )}

          {wrongAnswersA >= minWrongAnswers3 && (
            <>
              <Info
                text={
                  <p>
                    Lösung: Die Anzahl Einsen in jeder Spalte und in jeder Zeile
                    ist gerade.
                  </p>
                }
              />
              <div className="space"></div>
            </>
          )}

          <SquareExeciseExample />
        </div>

        <div className="taskRight">
          {[...Array(numberOfTasksA)].map((e, i) => (
            <SquareExecise
              key={i}
              onWorong={() => setWrongAnswersA(wrongAnswersA + 1)}
              onCorrect={() => setCorrectAnswersA(correctAnswersA + 1)}
            />
          ))}
        </div>
      </div>

      <div className="space"></div>
      <div className="task">
        <button
          onClick={() => {
            setCorrectAnswersA(numberOfTasksA);
          }}
        >
          <p>Aufgabe überspringen</p>
        </button>
      </div>
      <div className="space"></div>

      {correctAnswersA >= numberOfTasksA && (
        <div className="task">
          <div className="taskLeftScroll">
            <SquareColorExample />
          </div>
          <div className="taskRight"></div>
        </div>
      )}
    </div>
  );
}

export default Task9;
