import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import MC from "../components/MC";
import YN from "../components/YN";
import randomDigits from "../functions/randomDigits";
import nextTenChecksum from "../functions/nextTenChecksum";
import errormaker from "../functions/errormaker";

/*
Task 2: Different checksum

Subtask A: Given some examples of a checksum method,
calculate the checksum of other examples.

Subtask B: Given some number sequences and some checksums,
that can be wrong, the user must identify the wrong ones.

Subtask C: Some yes and no questions about the properties
of the given checksum.
*/

function Task2() {
  // number of examples displayed in the exercise
  const numOfExamples = 5;

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

  // if answeredB === true, then task C is revealed.
  const [answeredB, setAnsweredB] = useState(false);

  // mc questions and answer keys for task B
  const [BTemp] = useState(
    Array.from({ length: numberOfTasksB }, () => {
      let seq1 = randomDigits();
      let cs1 = nextTenChecksum(seq1);
      errormaker(seq1, 0);
      let cs2 = nextTenChecksum(seq1);
      return [seq1.join("") + cs1, cs1 !== cs2];
    })
  );

  let mcOptionsTaskB = [];
  let mcAKTaskB = [];

  for (let i = 0; i < numberOfTasksB; ++i) {
    let elemet = BTemp[i];
    mcOptionsTaskB[i] = elemet[0];
    mcAKTaskB[i] = elemet[1];
  }

  return (
    <div className="task">
      <h1>Aufgabe 2: Prüfziffer und Fehlererkennung 2</h1>
      <div className="task2A">
        <p>
          Hier haben wir ein anderes Beipiel einer anderen Prüfziffer. Erkennen
          Sie, wie man aus der Zahlenfolge (hier in Schwarz) die Prüfziffer
          (hier in Rot) berechnen kann? Ergänzen Sie, wie im Beipiel, die
          fehlenden Prüfziffern.
        </p>
        {[...Array(numOfExamples)].map(() => (
          <ChecksumExample
            checksumFunction={nextTenChecksum}
            sequence={randomDigits}
          />
        ))}
        {[...Array(numberOfTasksA)].map(() => (
          <ChecksumExercise
            checksumFunction={nextTenChecksum}
            sequence={randomDigits}
            onWorong={() => setWrongAnswersA(wrongAnswersA + 1)}
            onCorrect={() => setCorrectAnswersA(correctAnswersA + 1)}
          />
        ))}
        {wrongAnswersA >= minWrongAnswers &&
          correctAnswersA !== numberOfTasksA && (
            <p>
              Das ist leider nicht korrekt. Um die Prüfziffer ermitteln zu
              können, muss man zuerst die Summe der Zahlenfolge berechnen. Die
              Prüfziffer ist dann das, was zum nächsten Zehner fehlt. Anders
              ausgedrückt: Quersumme der Zahlenfolge + Prüfziffer kann man durch
              10 teilen, und zwar ohne Rest.
            </p>
          )}
      </div>
      {correctAnswersA === numberOfTasksA && (
        <div className="task2B">
          <p>
            Beim Übermitteln von Daten, oder in unserem Beispiel von Zahlen,
            kann es vorkommen, dass die eine oder andere Ziffer falsch ist. Der
            Fehler kann sowohl in der Zahlenfolge auftreten, oder aber auch in
            der Prüfziffer selbst.
          </p>
          <MC
            question={
              "Gegeben sind weitere Beispiele von Zahlenfolgen und ihre Prüfziffer. Bestimmen sie die Prüfziffern, die falsch sind."
            }
            options={mcOptionsTaskB}
            answerKey={mcAKTaskB}
            textOnCorrect={"Richtig."}
            textOnWrong={
              "Nicht Korrekt. Die Quersumme der Zahlenfolge und die Prüfziffer zusammengezählt, müssen durch 10 teilbar sein."
            }
            callerFunction={() => {
              setAnsweredB(true);
            }}
          />
        </div>
      )}
      {answeredB && (
        <div className="task2C">
          <p>
            Diese Art von Prüfziffer ist eine einfache Methode, um zu
            überprüfen, ob ein Fehler beim Versenden von Daten aufgetreten ist.
            Diese Methode hat einige Vor- und einige Nachteile. Belegen Sie, ob
            diese Ausagen korrekt oder falsch sind.
          </p>
          <YN
            question={
              "Wenn genau eine Ziffer in den Daten falsch ist, dann erkennt man das an der Prüfziffer."
            }
            solution={1}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnCorrect={
              "Genau, wenn eine Ziffer falsch ist, dann ist die Quersumme und die Prüfziffer zusammen nicht mehr durch 10 teilbar."
            }
            textOnWrong={
              "Falsch, wenn eine Ziffer falsch ist, dann ist die Quersumme und die Prüfziffer zusammen nicht mehr durch 10 teilbar."
            }
            callerFunction={() => {}}
          />
          <YN
            question={
              "Wenn die Prüfziffer falsch ist, dann sind auch die Daten falsch."
            }
            solution={0}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnCorrect={
              "Genau, die Prüfzidder selber kann falsch sein, auch wenn die Daten korrekt sind. Man muss zwar davon ausgehen, dass ein Fehler vorgefallen ist und die Daten neu senden."
            }
            textOnWrong={
              "Nicht ganz, die Daten können korrekt sein, aber die Prüfziffer selber könnte einen Fehler beinhalten. Man muss zwar davon ausgehen, dass ein Fehler vorgefallen ist."
            }
            callerFunction={() => {}}
          />
          <YN
            question={
              "Ein häufiger Fehler ist, dass man die Ziffern in der falschen Reihenfolge aufschreib, z.B. 72 statt 27. Kann diese Prüfziffermethode solche Fehler erkennen?"
            }
            solution={0}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnCorrect={
              "Richtig. 72 und 27 haben z.B. beide die Prüfziffer 1 (7 + 2 = 2 + 7)."
            }
            textOnWrong={
              "Falsch.  72 und 27 haben z.B. beide die Prüfziffer 1 (7 + 2 = 2 + 7)."
            }
            callerFunction={() => {}}
          />
          <YN
            question={
              "Wenn genau eine Ziffer in den Daten falsch ist, kann man mit der Prüfziffer erkennen, welche Ziffer das ist."
            }
            solution={0}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnCorrect={
              "Richtig. Man erkennt nur, dass ein Fehler passiert ist, aber nicht wo genau. Man kann mit der Prüfziffer nur Fehler erkennen, aber nicht korrigieren."
            }
            textOnWrong={
              "Falsch. Angenommen die Zahlenfolge wäre 234 und die Prüfziffer 2. Dann kann es sein, dass die korrekte Zahlenfolge 233 gewesen wäre, oder aber auch 224. Man kann mit der Prüfziffer nur Fehler erkennen, aber nicht korrigieren."
            }
            callerFunction={() => {}}
          />
          <YN
            question={
              "Erkennt man mit der Prüfziffer, ob die Daten falsch sind, wenn zwei Fehler passiert sind?"
            }
            solution={0}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnCorrect={
              "Richtig. Eine Ziffer könnte um den Betrag x höher sein und eine andere Ziffer um den gleichen Betrag x tiefer. Die Summe bleibt dennoch gleich und somit auch die Prüfziffer."
            }
            textOnWrong={
              "Falsch. Angenommen die Zahlenfolge wäre 234 und die Prüfziffer 1. Dann kann es sein, dass die korrekte Zahlenfolge 225 gewesen wäre, oder aber auch 324."
            }
            callerFunction={() => {}}
          />
          <YN
            question={
              "Erkennt man den Fehler, wenn man eine Ziffer in der Zahlenfolge vergisst oder auslässt?"
            }
            solution={0}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnCorrect={
              "Richtig. Die Ziffer 0 könnte weggelassen werden und die Summe bleibt gleich. Generell sagt die Prüfziffer nichts aus über die Anzahl Nullen in der Zahlenfolge. 1200000 hat die gleiche Prüfziffer wie 120."
            }
            textOnWrong={
              "Falsch. Die Ziffer 0 könnte weggelassen werden und die Summe bleibt gleich. Generell sagt die Prüfziffer nichts aus über die Anzahl Nullen in der Zahlenfolge. 1200000 hat die gleiche Prüfziffer wie 120. Wenn man 0 nicht erlaubt, dann hätten Sie recht."
            }
            callerFunction={() => {}}
          />
          <YN
            question={
              "Welche Fehlererkennungsmethode ist besser, diese Prüfiffer oder die Prüfsumme"
            }
            solution={1}
            optionYes={"Prüfziffer"}
            optionNo={"Prüfsumme"}
            textOnCorrect={
              "Richtig. Die Prüfziffer schafft das gleiche wie die Prüfsumme und das nur mit einer zusätzlichen Ziffer. Die Prüfsumme braucht mehrere zusätzliche Ziffern."
            }
            textOnWrong={
              "Falsch. Die Prüfziffer schafft das gleiche wie die Prüfsumme und das nur mit einer zusätzlichen Ziffer. Die Prüfsumme braucht mehrere zusätzliche Ziffern."
            }
            callerFunction={() => {}}
          />
        </div>
      )}
    </div>
  );
}

export default Task2;
