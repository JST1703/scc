import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";
import binaryCheckSymbol2 from "../functions/binaryCheckSymbol2";
import CompareExercise from "../components/CompareExercise";
import nDigitComparer from "../functions/nDigitComparer";

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

  /* 
  if true, then next subtask is revealed.
  */
  const [answeredD, setAnsweredD] = useState(false);

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
          <p>
            Diese Methode des Prüfbits ist sehr einfach, allerdings auch
            limitiert. Gegeben ist eine weitere binäre Folge und deren Prüfbit.
            Ändern sie die Gegebene Folge an genau zewi Stellen ab, so dass das
            Prüfbit immernoch gültig ist. Geben Sie die neue Folge ohne Prüfbit
            an.
          </p>
          <CompareExercise
            checksumFunction={binaryCheckSymbol1}
            sequence={randomBinaryString(4)}
            textOnCorrect={"Korrekt."}
            textOnWrong={
              "Nicht korrekt. Ihre Angegebene Folge hat entweder mehr als 2 Änderungen oder erfüllt nicht mehr das gegebe Prüfbit."
            }
            comparer={(a, b, c, d) => {
              return nDigitComparer(a, b, c, d, 2);
            }}
            callerFunction={() => {
              setAnsweredB(true);
            }}
          />
        </div>
      )}
      {answeredB && (
        <div className="task3C">
          <p>
            Ähnlich wie bei der Prüfsumme können mit dieser Methode nur einzelne
            Fehler erkannt werden. Wenn sich mehr als 2 Bits ändern, kann man
            den Fehler, mit dieser Methode, nicht mehr erkennen. Es ist auch
            wahrscheinlicher, dass Fehler bei 2 benachbarten Bits gleichzeitig
            auftreten, z.B. durch das Vertauschen von Bits. Dafür gibt es eine
            weitere Methode um solchen Fehler entgegenzuwirken. Man benötigt
            dafür zwei Prüfbits. Gegeben sind einige binäre Foglen und deren
            Prüfbits. Berechnen Sie anhand der Beispiele die Prügbits der
            restlichen Folgen. Hinweis: Diese Methode ist sehr ähnlich zur
            vorherigen Methode und kann speziell den Fehler von vertauschten
            Bits erkennen.
          </p>
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
            correctAnswersC !== numberOfTasks && (
              <p>
                Das ist leider nicht korrekt. Für as erste Bit müssen Sie die
                vorherige Prüfbitmethode anwenden und zwar auf jedes zweite Bit
                der binären Folge. Das gleiche gilt für das zweite Prüfbit, nur
                mit den anderen Bits der binären Folge. Beispiel, gegeben sei
                die Folge <span style={{ color: "red" }}>{1}</span>
                <span style={{ color: "green" }}>{1}</span>
                <span style={{ color: "red" }}>{1}</span>
                <span style={{ color: "green" }}>{0}</span>, dann sind die
                Prüfbits <span style={{ color: "red" }}>{0}</span>
                <span style={{ color: "green" }}>{1}</span>. Das erste Prüfbit
                ergibt sich mit den Bits an der ersten und der dritten Stelle,
                das zweite Prüfbit aus den Bits an der zewiten und vierten
                Stelle. Ergänzen Sie die restlichen Prüfbits um fortfahren zu
                können.
              </p>
            )}
        </div>
      )}
      {correctAnswersC === numberOfTasks && (
        <div className="task3D">
          <p>
            Diese Methode ist um einiges besser als die vorherige Methode. Das
            Vertauschen von Bits fällt natürlich auf. Wenn zwei bits von den
            Jeweiligen gruppen Falsch sind, dann stimmt das nicht mehr mit den
            Prüfbits überein und somit kann man auch 2 Fehler erkennen.
            Allerdings muss das nicht immer der Fall sein. Gegeben ist eine
            weitere binäre Folge und deren Prüfbits. Ändern sie die Gegebene
            Folge an genau zewi Stellen ab, so dass die Prüfbits immernoch
            gültig ist. Geben Sie die neue Folge ohne Prüfbits an.
          </p>
          <CompareExercise
            checksumFunction={binaryCheckSymbol2}
            sequence={randomBinaryString(6)}
            textOnCorrect={"Korrekt."}
            textOnWrong={
              "Nicht korrekt. Ihre Angegebene Folge hat entweder mehr als 2 Änderungen oder erfüllt nicht mehr die gegeben Prüfbits."
            }
            comparer={(a, b, c, d) => {
              return nDigitComparer(a, b, c, d, 2);
            }}
            callerFunction={() => {
              setAnsweredD(true);
            }}
          />
        </div>
      )}
      {answeredD && (
        <div className="task3E">
          <p>
            Wenn in der binären Folge zwei Fehler passieren, bei Bits, welche zm
            gleichen Prüfbit beitragen, dann kann man den Fehler nicht erkennen.
            Die zweite Mehtode ist besser, als die erste Methode, da diese mehr
            Fehler erkennen kann. Die zweite Methode kann den Fehler auch
            eingernzen. Ist zum Beispiel das erste Prüfbit nicht erfüllt, dann
            weiss man, dass eines der Bits an den ungeraden Stellen der Folge
            falsch sein muss. Das ist allerdings noch zu ungenau um ermitteln zu
            können, welches Bit nun falsch ist. Um Fehler korigieren zu können,
            braucht es mehr Informationen.
          </p>
        </div>
      )}
    </div>
  );
}

export default Task3;
