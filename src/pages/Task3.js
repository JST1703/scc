import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import randomBinaryString from "../functions/randomBinaryString";
import binaryCheckSymbol1 from "../functions/binaryCheckSymbol1";
import binaryCheckSymbol2 from "../functions/binaryCheckSymbol2";

/*
Task 3: Checksums with Binary Strings

Task A: 

Task B:

Task C:
*/

function Task3() {
  // number of examples displayed in the exercise
  const numOfExamples = 5;

  // number of wrong answers, before solution is revealed
  const minWrongAnswers = 3;

  // number of questions for subtasks to solve
  const numberOfTasks = 3;

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
  Keeping track of number of correct solutions or wrong answers
  for subtask B. If correctAnswersA === numberOfTasks, then
  subtask B is solved and the next subtask is revealed.
  If wrongAnswersB === minWrongAnswers, then solution for subtask
  B is revealed.
  */
  const [wrongAnswersB, setWrongAnswersB] = useState(0);
  const [correctAnswersB, setCorrectAnswersB] = useState(0);

  return (
    <div className="task">
      <h1>Aufgabe 3: Binäre Kodirungen und Fehlererkennung</h1>
      <div className="task3A">
        <p>BLA BLA BLA</p>
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
        {wrongAnswersA >= minWrongAnswers &&
          correctAnswersA !== numberOfTasks && <p>Wrong</p>}
      </div>
      {correctAnswersA === numberOfTasks && (
        <div className="task3B">
          <p>BLA BLA BLA</p>
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
              onWorong={() => setWrongAnswersB(wrongAnswersB + 1)}
              onCorrect={() => setCorrectAnswersB(correctAnswersB + 1)}
            />
          ))}
          {wrongAnswersB >= minWrongAnswers &&
            correctAnswersB !== numberOfTasks && <p>Wrong</p>}
        </div>
      )}
      {correctAnswersB === numberOfTasks && (
        <div>
          {" "}
          <p>Swaaag</p>
        </div>
      )}
    </div>
  );
}

export default Task3;
