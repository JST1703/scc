import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import MC from "../components/MC";
import YN from "../components/YN";
import randomDigits from "../functions/randomDigits";
import sumChecksum from "../functions/sumChecksum";
import arrayFiller from "../functions/arrayFiller";
import errormaker from "../functions/errormaker";

/*
Task 1: Checksums

Subtask A: Given some examples of a checksum method,
calculate the checksum of other examples.

Subtask B: Given some examples of a checksum different method
than sin subtask A, calculate the checksum of other examples.
*/

function Task1() {
  // number of examples displayed in the exercise
  const numOfExamples = 3;

  // number of wrong answers, before solution is revealed
  const minWrongAnswers = 3;

  // number of questions for subtasks to solve
  const numberOfTasksA = 1;
  const numberOfTasksB = 3;

  /* 
  Keeping track of number of correct solutions or wrong answers
  for each subtask. If correctAnswersX === numberOfTasks, then
  subtask X is solved and the next subtask is revealed.
  If wrongAnswersX === minWrongAnswers, then solution for subtask
  X is revealed.
  */
  const [wrongAnswersA, setWrongAnswersA] = useState(0);
  const [correctAnswersA, setCorrectAnswersA] = useState(0);

  // Stuff for task B
  const [answeredB, setAnsweredB] = useState(false);
  const [tempTaskB] = useState(
    arrayFiller(numberOfTasksB, () => {
      return errormaker(randomDigits, sumChecksum, 0);
    })
  );
  const [mcOptionsTaskB] = useState(() => {
    let sol = [];
    for (let i = 0; i < numberOfTasksB; ++i) {
      let element = tempTaskB[i];
      let last = element.length - 1;
      let temp = element.slice(0, last).join("");
      sol[sol.length] = temp.toString() + " " + element[last].toString();
    }
    return sol;
  });
  const [mcAKTaskB] = useState(() => {
    let sol = [];
    for (let i = 0; i < numberOfTasksB; ++i) {
      let element = tempTaskB[i];
      let last = element.length - 1;
      let temp = element.slice(0, last);
      if (element[last] === sumChecksum(temp)) {
        sol[sol.length] = true;
      } else {
        sol[sol.length] = false;
      }
    }
    return sol;
  });

  return (
    <div className="task1">
      <h1>Aufgabe 1: Prüfziffern und Fehlererkennung 1</h1>
      <div className="task1A">
        <p>
          Eine Möglichkeit um Fehler in Daten zu erkennen, ist es die Daten mit
          weiteren Prüfziffern zu ergänzen. In diesem Beispiel haben wir einige
          Folgen von Zahlen gegebn (hier in schwarz) und die dazugehörigen
          Prüfziffern (hier in rot). Die Prüfziffer wird durch die Folge der
          Zahlen festgelegt. Können Sie in diesem Beispiel herausfinden, wie man
          aus der gegebenen Zahlenfolge die Prüfziffer berechnen kann? Ergänzen
          Sie die weiteren Prüfziffern der gegebenen Zahlenfolgen.
        </p>
        {[...Array(numOfExamples)].map(() => (
          <ChecksumExample checksumFunction={sumChecksum} />
        ))}
        {[...Array(numberOfTasksA)].map(() => (
          <ChecksumExercise
            checksumFunction={sumChecksum}
            onWorong={() => setWrongAnswersA(wrongAnswersA + 1)}
            onCorrect={() => setCorrectAnswersA(correctAnswersA + 1)}
          />
        ))}
        {wrongAnswersA >= minWrongAnswers &&
          correctAnswersA !== numberOfTasksA && (
            <p>
              Das ist leider nicht korrekt. Die Lösung der Aufgabe ist, dass die
              Prüfziffer die Summe der einzelnen Zahlen der Zahlenfolge ist. Um
              fortfahren zu können, müssen Sie die Aufgabe korrekt lösen.
            </p>
          )}
      </div>
      {correctAnswersA === numberOfTasksA && (
        <div className="task1B">
          <p>Todo Aufgabenstellung B</p>
          <MC
            question={"?"}
            options={mcOptionsTaskB}
            answerKey={mcAKTaskB}
            textOnCorrect={"okay"}
            textOnWrong={"not okay"}
            callerFunction={() => {
              setAnsweredB(true);
            }}
          />
        </div>
      )}
      {answeredB && (
        <div className="task1C">
          <p>Todo Aufgabenstellung C</p>
          <YN
            question={"Frage?"}
            solution={1}
            optionYes={"Yes"}
            optionNo={"No"}
            textOnCorrect={"okay"}
            textOnWrong={"not okay"}
            callerFunction={() => {}}
          />
        </div>
      )}
    </div>
  );
}

export default Task1;
