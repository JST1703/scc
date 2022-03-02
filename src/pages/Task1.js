import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import MC from "../components/MC";
import YN from "../components/YN";
import randomDigits from "../functions/randomDigits";
import sumChecksum from "../functions/sumChecksum";
import errormaker from "../functions/errormaker";
import Info from "../components/Info";

/*
Task 1: Checksums

Subtask A: Given some examples of a checksum method,
calculate the checksum of other examples.

Subtask B: Given some number sequences and some checksums,
that can be wrong, the user must identify the wrong ones.

Subtask C: Some yes and no questions about the properties
of the given checksum.
*/

function Task1() {
  // number of examples displayed in the exercise
  const numOfExamples = 3;

  // number of wrong answers, before solution is revealed
  const minWrongAnswers = 3;

  // number of questions for subtasks to solve
  const numberOfTasksA = 3;
  const numberOfTasksB = 5;

  /* 
  Keeping track of number of correct solutions or wrong answers
  for subtask A. If correctAnswersA === numberOfTasks, then
  subtask A is solved and the next subtask is revealed.
  If wrongAnswersA === minWrongAnswers, then solution for subtask
  A is revealed.
  */
  const [wrongAnswersA, setWrongAnswersA] = useState(0);
  const [correctAnswersA, setCorrectAnswersA] = useState(0);

  // if taskStateB === true, then task C is revealed.
  const [taskStateB, setTaskStateB] = useState(false);

  // mc questions and answer keys for task B
  const [BTemp] = useState(
    Array.from({ length: numberOfTasksB }, () => {
      let seq1 = randomDigits();
      let cs1 = sumChecksum(seq1);
      errormaker(seq1, 0);
      let cs2 = sumChecksum(seq1);
      return [seq1.join(""), cs1, cs1 !== cs2];
    })
  );

  let mcOptionsTaskB = [];
  let mcAKTaskB = [];

  for (let i = 0; i < numberOfTasksB; ++i) {
    let elemet = BTemp[i];
    mcOptionsTaskB[i] = (
      <>
        <span>{elemet[0]}</span>
        <span style={{ color: "red" }}>{elemet[1]}</span>
      </>
    );
    mcAKTaskB[i] = elemet[2];
  }

  // if true, next task is revealed
  const [taskStateC, setTaskStateC] = useState(Array(5).fill(false));

  // revealing next part of task C
  const handleTaskStateC = (index) => {
    let temp = [...taskStateC];
    temp[index] = true;
    setTaskStateC(temp);
  };

  return (
    <div className="main">
      <h1>Aufgabe 1: Prüfziffer und Fehlererkennung 1</h1>
      <div className="task">
        <div className="taskLeft">
          <p>
            Gegeben sind Zahlenfolgen (hier in Schwarz) und deren Prüfziffern
            (hier in Rot). Egänzen Sie anhand der Beipiele die fehlenden
            Prüfziffern. Die Lösung besteht immer aus zwei Ziffern (bsp. 09
            statt 9).
          </p>
        </div>
        <div className="taskRight">
          {[...Array(numOfExamples)].map((e, i) => (
            <ChecksumExample
              key={i}
              checksumFunction={sumChecksum}
              sequence={randomDigits}
            />
          ))}
          <div className="task"></div>
          {[...Array(numberOfTasksA)].map((e, i) => (
            <ChecksumExercise
              key={i}
              checksumFunction={sumChecksum}
              sequence={randomDigits}
              onWorong={() => setWrongAnswersA(wrongAnswersA + 1)}
              onCorrect={() => setCorrectAnswersA(correctAnswersA + 1)}
            />
          ))}
        </div>
      </div>
      {wrongAnswersA >= minWrongAnswers && (
        <div className="task">
          <Info
            text={
              <p>
                Eine Methode um die Prüfziffer zu bestimmen, ist es die Summe
                der Folge zu Bilden.
              </p>
            }
          />
        </div>
      )}
      <div className="task">
        <button
          onClick={() => {
            setCorrectAnswersA(3);
          }}
        >
          <p>Aufgabe überspringen</p>
        </button>
      </div>
      {correctAnswersA >= numberOfTasksA && (
        <div className="task">
          <div className="taskLeft">
            <p>
              Gegeben sind Folgen und deren Prüfziffern. Bestimmen sie
              diejenigen Folgen, bei denen die Prüfziffer fehlerhaft ist.
            </p>
          </div>
          <div className="taskRight">
            <MC
              options={mcOptionsTaskB}
              answerKey={mcAKTaskB}
              textOnCorrect={<p></p>}
              textOnWrong={
                <>
                  <p className="task"></p>
                  <p>
                    Die Prüfziffer ist gleich der Summe der Ziffern der Folge.
                  </p>
                </>
              }
              callerFunction={() => {
                setTaskStateB(true);
              }}
            />
          </div>
        </div>
      )}
      {taskStateB && (
        <div className="task">
          <YN
            question={
              <p>
                Wenn genau eine Ziffer in der Folge falsch ist, dann erkennt man
                das an der Prüfziffer.
              </p>
            }
            solution={1}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <>
                <p className="task"></p>
                <p>
                  Wenn eine Ziffer falsch ist, dann stimmt die Summe nicht mehr
                  mit der Prüfziffer überein.
                </p>
              </>
            }
            textOnWrong={
              <>
                <p className="task"></p>
                <p>
                  Wenn eine Ziffer falsch ist, dann stimmt die Summe nicht mehr
                  mit der Prüfziffer überein.
                </p>
              </>
            }
            callerFunction={() => handleTaskStateC(0)}
          />
        </div>
      )}
    </div>
  );
}

export default Task1;
