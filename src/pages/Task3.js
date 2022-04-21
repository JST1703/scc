import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";
import binaryCheckSymbol2 from "../functions/binaryCheckSymbol2";
import CompareExercise from "../components/CompareExercise";
import nDigitComparer from "../functions/nDigitComparer";
import Info from "../components/Info";

/*
Task 3: Checksums with Binary Strings

Task A: Given a method for determine a check bit for a binary string,
calculate the other check bits for the next examples.

Task B: given the same checksum method and a binary string, change the given string such that it still fulfils the checksum.

Task C: Given an other method for determine two check bits for a binary string,
calculate the other check bits for the next examples.

Task D: given the same checksum method and a binary string, change the given string such that it still fulfils the checksum.

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

  // if taskStateB === true, then task C is revealed.
  const [taskStateB, setTaskStateB] = useState(false);

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
    <div className="main">
      <h1>Aufgabe 3: Binäre Folgen und Fehlererkennung</h1>

      <div className="space"></div>

      <div className="task">
        <div className="taskLeft">
          <p>
            <b>3.1)</b> Gegeben sind Bitfolgen, bestehend aus den Ziffern 0 und
            1, und deren einstellitgen{" "}
            <span style={{ color: "red" }}>{" Prüfbits"}</span>. Ergänzen Sie
            anhand der gegebenen Beispielen die fehlenden Prüfbits.
          </p>
          <div className="space"></div>
          {wrongAnswersA >= minWrongAnswers && (
            <Info
              text={
                <p>
                  Das Prüfbit wird so gesetzt, dass die Anzahl Einsen in der
                  gesamten Folge (inklusive Prüfbit) gerade ist. Zum Beispiel
                  hat die Folge 11001 das Prüfbit{" "}
                  <span style={{ color: "red" }}>{1}</span>, ddamit die Folge
                  inklusive Prüfbit eine gerade Anzahl Einsen hat. Anders hat
                  die Folge 1001 bereits eine gerade Anzahl Einsen und somit das
                  Prüfbit <span style={{ color: "red" }}>{0}</span>.
                </p>
              }
            />
          )}
        </div>
        <div className="taskRight">
          {[...Array(numOfExamples)].map((e, i) => (
            <ChecksumExample
              key={i}
              checksumFunction={binaryCheckSymbol1}
              sequence={randomBinaryString(5)}
            />
          ))}
          <div className="space"></div>
          {[...Array(numberOfTasks)].map((e, i) => (
            <ChecksumExercise
              key={i}
              checksumFunction={binaryCheckSymbol1}
              sequence={randomBinaryString(5)}
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
            setCorrectAnswersA(numberOfTasks);
          }}
        >
          <p>Aufgabe überspringen</p>
        </button>
      </div>

      {correctAnswersA >= numberOfTasks && (
        <div className="task">
          <div className="space"></div>
          <div className="taskLeft">
            <p>
              <b>3.2)</b> Gegeben ist eine weitere binäre Folge mit{" "}
              <span style={{ color: "red" }}>{" Prüfbit"}</span>. Ändern Sie die
              gegebene Folge an genau zwei Stellen, sodass das Prüfbit immer
              noch gültig ist. Geben Sie die neue Folge ohne Prüfbit an.
            </p>
          </div>
          <div className="taskRight">
            <CompareExercise
              checksumFunction={binaryCheckSymbol1}
              sequence={randomBinaryString(4)}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Ihre Lösung beinhaltet entweder mehr als 2 Änderungen oder
                  stimmt nicht mit dem vorgegebenen Prüfbit überein.
                </p>
              }
              comparer={(a, b, c, d) => {
                return nDigitComparer(a, b, c, d, 2);
              }}
              callerFunction={() => {
                setTaskStateB(true);
              }}
            />
          </div>

          <div className="space"></div>
          <div className="task">
            <button
              onClick={() => {
                setTaskStateB(true);
              }}
            >
              <p>Aufgabe überspringen</p>
            </button>
          </div>
        </div>
      )}

      {taskStateB && (
        <div className="task">
          <div className="space"></div>
          <Info
            text={
              <p>
                Diese Prüfbit Methode ist sehr simpel und deswegen auch
                limitiert. Genau wie die Methoden aus den vorherigen Aufgaben
                kann man mit dem Prüfbit nur Übertragungsfehler erkennen, wenn
                diese nur an einer Stelle auftreten. Wenn mehr Fehler auftreten,
                kann dies unerkannt bleiben. Das fehlerhafte Bit lässt sich auch
                nicht ermitteln und deswegen auch nicht korrigieren. Diese
                Methode ist aber sehr effizient, da man nur ein zusätzliches Bit
                benötigt und nicht mehrere.
              </p>
            }
          />

          <div className="space"></div>
          <div className="taskLeft">
            <p>
              <b>3.3)</b> Gegeben sind weitere Bitfolgen, bestehend aus den
              Ziffern 0 und 1, und deren nun zweistelligen{" "}
              <span style={{ color: "red" }}>{" Prüfbits"}</span>. Ergänzen Sie
              anhand der gegebenen Beispielen die fehlenden Prüfbits.
            </p>
            <div className="space"></div>
            {wrongAnswersC >= minWrongAnswers && (
              <Info
                text={
                  <p>
                    Um die Prüfbits bestimmen zu können, nutzt man die gleiche
                    Methode wie vorhin, allerdings nur auf jedes zweite Bit.
                    Beispielsweise sei die Folge{" "}
                    <span style={{ color: "red" }}>{1}</span>
                    <span style={{ color: "green" }}>{1}</span>
                    <span style={{ color: "red" }}>{1}</span>
                    <span style={{ color: "green" }}>{0}</span> gegeben, dann
                    sind die Prüfbits <span style={{ color: "red" }}>{0}</span>
                    <span style={{ color: "green" }}>{1}</span>. Das erste{" "}
                    Prüfbit ergibt sich aus den Bits an den ungeraden Stellen
                    der Folge und das zweite Prüfbit aus den Bits an den geraden
                    Stellen.
                  </p>
                }
              />
            )}
          </div>
          <div className="taskRight">
            {[...Array(numOfExamples)].map((e, i) => (
              <ChecksumExample
                key={i}
                checksumFunction={binaryCheckSymbol2}
                sequence={randomBinaryString(6)}
              />
            ))}
            <div className="space"></div>
            {[...Array(numberOfTasks)].map((e, i) => (
              <ChecksumExercise
                key={i}
                checksumFunction={binaryCheckSymbol2}
                sequence={randomBinaryString(6)}
                onWorong={() => setWrongAnswersC(wrongAnswersC + 1)}
                onCorrect={() => setCorrectAnswersC(correctAnswersC + 1)}
              />
            ))}
          </div>
          <div className="space"></div>
          <div className="task">
            <button
              onClick={() => {
                setCorrectAnswersC(numberOfTasks);
              }}
            >
              <p>Aufgabe überspringen</p>
            </button>
          </div>
        </div>
      )}

      {correctAnswersC >= numberOfTasks && (
        <div className="task">
          <div className="space"></div>
          <div className="taskLeft">
            <p>
              <b>3.4)</b> Ändern Sie die gegebene Folge an genau zwei Stellen
              ab, sodass diese mit den gegebenen{" "}
              <span style={{ color: "red" }}>{" Prüfbits"}</span> immer noch
              übereinstimmt. Geben Sie die neue Folge ohne Prüfbits an.
            </p>
          </div>
          <div className="taskRight">
            <CompareExercise
              checksumFunction={binaryCheckSymbol2}
              sequence={randomBinaryString(6)}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Ihre Lösung beinhaltet entweder mehr als 2 Änderungen oder
                  stimmt nicht mit den vorgegebenen Prüfbits überein.
                </p>
              }
              comparer={(a, b, c, d) => {
                return nDigitComparer(a, b, c, d, 2);
              }}
              callerFunction={() => {}}
            />
          </div>

          <div className="space"></div>

          <Info
            text={
              <p>
                Diese Methode ist leicht besser. Man kann damit das Auftreten
                von bis zu 2 Fehlern erkennen, allerdings nur, wenn diese in den
                verschiedenen Positionsgruppen auftreten. Sonst kann man nur
                einzelne Fehler erkennen. In allen Fällen kann man immer noch
                nicht herausfinden, welche der Bits den Fehler beinhaltet und
                deswegen kann man auch hier keine Fehler korrigieren.
              </p>
            }
          />
        </div>
      )}
    </div>
  );
}

export default Task3;
