import React, { useState } from "react";
import SquareExeciseExample from "../components/SquareExerciseExample";
import SquareColorExample from "../components/SquareColorExample";
import SquareExecise from "../components/SquareExercise";
import Info from "../components/Info";
import MC from "../components/MC";
import YN from "../components/YN";

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

  // if true, next task is revealed
  const [taskState, setTaskState] = useState(Array(50).fill(false));

  // revealing next part of task
  const handleTaskState = (index) => {
    let temp = [...taskState];
    temp[index] = true;
    setTaskState(temp);
  };

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
                    ist gerade. Der Fehler ist genau da, wo sich die eine Spalte
                    und Zeile kreuzen, welche nicht eine gerade Anzahl Einsen
                    haben.
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
            <h3>Zum cklicken und probieren:</h3>
            <div className="smallSpace"></div>
            <SquareColorExample />
          </div>
          <div className="taskRight">
            <YN
              question={
                <p>
                  Erkennt man, dass ein Fehler aufgetreten ist, wenn zwei Bits
                  falsch sind?
                </p>
              }
              solution={1}
              optionYes={<span>Ja</span>}
              optionNo={<span>Nein</span>}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Bei zwei Ferlerhaften Bits ist mindestends eine Zeile oder
                  Spalte fehlerhaft.
                </p>
              }
              callerFunction={() => handleTaskState(0)}
            />

            {taskState[0] && (
              <>
                <div className="space"></div>
                <YN
                  question={
                    <p>
                      Erkennt man, welche Bits falsch sind, wenn zwei Fehler
                      aufgetreten sind?
                    </p>
                  }
                  solution={0}
                  optionYes={<span>Ja</span>}
                  optionNo={<span>Nein</span>}
                  textOnCorrect={<p></p>}
                  textOnWrong={
                    <p>
                      Egal welche 2 Bits felerhaft sind, diese dauraus
                      reusltieren fehlerhaften Spalten oder Zeilen können auch
                      durch ein anderes Paar Bits verursacht werden.
                    </p>
                  }
                  callerFunction={() => handleTaskState(1)}
                />
              </>
            )}

            {taskState[1] && (
              <>
                <div className="space"></div>
                <p>
                  Wie viele Fehler müssen mindestends auftreten, so dass dennoch
                  jede Zeile und Spalte korrekt ist?
                </p>
                <MC
                  options={[
                    <span>3</span>,
                    <span>4</span>,
                    <span>5</span>,
                    <span>6</span>,
                    <span>7</span>,
                    <span>8</span>,
                  ]}
                  answerKey={[false, true, false, false, false, false]}
                  textOnCorrect={<p></p>}
                  textOnWrong={
                    <p>
                      4 ist Korrekt. Egal welche 2 Bits felerhaft sind, diese
                      dauraus reusltieren fehlerhaften Spalten oder Zeilen
                      können auch durch ein anderes Paar Bits verursacht werden.
                      Das andere Paar müsste man auch noch flippen, so dass die
                      gleichen Zeilen und Spalten wieder korrekt sind.
                    </p>
                  }
                  callerFunction={() => handleTaskState(2)}
                />
              </>
            )}

            {taskState[2] && (
              <>
                <div className="space"></div>
                <p>
                  Betrachten wir diese magischen Quadrate als Kodierung. Was ist
                  der Abstand von zwei gültingen Quadraten?
                </p>
                <MC
                  options={[
                    <span>1</span>,
                    <span>2</span>,
                    <span>3</span>,
                    <span>4</span>,
                    <span>5</span>,
                    <span>6</span>,
                  ]}
                  answerKey={[false, false, false, true, false, false]}
                  textOnCorrect={<p></p>}
                  textOnWrong={<p>4 ist Korrekt. Siehe letzte MC Aufgabe.</p>}
                  callerFunction={() => {}}
                />
              </>
            )}

            <div className="space"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task9;
