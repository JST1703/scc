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
      return [seq1.join("") + " " + cs1, cs1 !== cs2];
    })
  );

  let mcOptionsTaskB = [];
  let mcAKTaskB = [];

  for (let i = 0; i < numberOfTasksB; ++i) {
    let elemet = BTemp[i];
    mcOptionsTaskB[i] = elemet[0];
    mcAKTaskB[i] = elemet[1];
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
        <>
          <p>
            Beim Übermitteln von Daten, oder in unserem Beispiel von Zahlen,
            kann es vorkommen, dass die eine oder andere Ziffer falsch ist. Der
            Fehler kann sowohl in der Zahlenfolge auftreten, oder aber auch in
            der Prüfziffer selbst.
          </p>
          <MC
            question={
              "Gegeben sind weitere Beispiele von Zahlenfolgen und ihre Prüfsummen. Bestimmen sie die Prüfsummen, die falsch sind."
            }
            options={mcOptionsTaskB}
            answerKey={mcAKTaskB}
            textOnCorrect={
              "Die Summe der Zahlenfolge muss immer gleich der Prüfziffer sein. Ansosten muss ein Fehler vorgefallen sein."
            }
            textOnWrong={
              "Die falschen Prüfsummen sind die, welche nicht gleich der Summe der Zahlenfolge sind."
            }
            callerFunction={() => {
              setTaskStateB(true);
            }}
          />
        </>
      )}
      {taskStateB && (
        <div>
          <p>
            Die Prüfsumme ist eine einfache Methode, um zu überprüfen, ob ein
            Fehler beim Versenden von Daten aufgetreten ist. Diese Methode hat
            einige Vor- und einige Nachteile. Belegen Sie, ob diese Aussagen
            korrekt oder falsch sind.
          </p>
          <YN
            question={
              "Wenn genau eine Ziffer in den Daten falsch ist, dann erkennt man das an der Prüfziffer."
            }
            solution={1}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnCorrect={
              "Wenn eine Ziffer falsch ist, dann stimmt die Summe nicht mehr mit der Prüfziffer überein."
            }
            textOnWrong={
              "Wenn eine Ziffer falsch ist, dann stimmt die Summe nicht mehr mit der Prüfziffer überein."
            }
            callerFunction={() => handleTaskStateC(0)}
          />
          {taskStateC[0] && (
            <YN
              question={
                "Wenn genau eine Ziffer in der Prüfziffer falsch ist, dann sind auch die Daten falsch."
              }
              solution={0}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnCorrect={
                "Der Fehler kann in der Prüfsumme selber vorkommen, auch wenn die Daten korrekt sind. Man muss zwar davon ausgehen, dass ein Fehler vorgefallen ist und die Daten neu senden."
              }
              textOnWrong={
                "Die Daten können korrekt sein, aber die Prüfsumme selber könnte einen Fehler beinhalten. Man muss zwar davon ausgehen, dass ein Fehler vorgefallen ist."
              }
              callerFunction={() => handleTaskStateC(1)}
            />
          )}
          {taskStateC[1] && (
            <YN
              question={
                "Ein häufiger Fehler ist, dass man die Ziffern in der falschen Reihenfolge aufschreib, z.B. 73 statt 37. Kann die Prüfsumme solche Fehler erkennen?"
              }
              solution={0}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnCorrect={
                "Die Prüfsumme ist die Summe der einzelnen Zahlen es spielt keine Rolle, in welcher Reihenfolge man die Zahlen addiert (7 + 3 = 3 + 7)."
              }
              textOnWrong={
                "Die Prüfsumme ist die Summe der einzelnen Zahlen es spielt keine Rolle, in welcher Reihenfolge man die Zahlen addiert (7 + 3 = 3 + 7)."
              }
              callerFunction={() => handleTaskStateC(2)}
            />
          )}
          {taskStateC[2] && (
            <YN
              question={
                "Wenn genau eine Ziffer in den Daten falsch ist, kann man mit der Prüfsumme erkennen, welche Ziffer das ist."
              }
              solution={0}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnCorrect={
                "Man erkennt nur, dass ein Fehler passiert ist, aber nicht wo genau. Man kann mit der Prüfsumme nur Fehler erkennen, aber nicht korrigieren."
              }
              textOnWrong={
                "Angenommen die Zahlenfolge wäre 234 und die Prüfsumme 7. Dann kann es sein, dass die korrekte Zahlenfolge 231 gewesen wäre, oder aber auch 214. Man kann mit der Prüfsumme nur Fehler erkennen, aber nicht korrigieren."
              }
              callerFunction={() => handleTaskStateC(3)}
            />
          )}
          {taskStateC[3] && (
            <YN
              question={
                "Erkennt man mit der Prüfsumme, ob die Daten falsch sind, wenn genau zwei Ziffern falsch sind?"
              }
              solution={0}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnCorrect={
                "Eine Ziffer könnte um den Betrag x höher sein und eine andere Ziffer um den gleichen Betrag x tiefer. Die Summe bleibt dennoch gleich."
              }
              textOnWrong={
                "Angenommen die Zahlenfolge wäre 234 und die Prüfsumme 9. Dann kann es sein, dass die korrekte Zahlenfolge 216 gewesen wäre, oder aber auch 531."
              }
              callerFunction={() => handleTaskStateC(4)}
            />
          )}
          {taskStateC[4] && (
            <YN
              question={
                "Erkennt man den Fehler, wenn man eine Ziffer in der Zahlenfolge vergisst oder auslässt?"
              }
              solution={0}
              optionYes={"Ja"}
              optionNo={"Nein"}
              textOnCorrect={
                "Die Ziffer 0 könnte weggelassen werden und die Summe bleibt gleich. Generell sagt die Prüfsumme nichts aus über die Anzahl Nullen in der Zahlenfolge. 1200000 hat die gleiche Prüfsumme wie 120."
              }
              textOnWrong={
                "Die Ziffer 0 könnte weggelassen werden und die Summe bleibt gleich. Generell sagt die Prüfsumme nichts aus über die Anzahl Nullen in der Zahlenfolge. 1200000 hat die gleiche Prüfsumme wie 120. Wenn man 0 nicht erlaubt, dann hätten Sie recht."
              }
              callerFunction={() => {}}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Task1;
