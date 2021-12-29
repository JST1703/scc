import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import sumChecksum from "../functions/sumChecksum";
import nextTenChecksum from "../functions/nextTenChecksum";

function Task1() {
  const numOfExamples = 3;
  const minWrongAnswers = 3;
  const numberOfTasks = 3;

  const [wrongAnswersA, setWrongAnswersA] = useState(0);
  const [correctAnswersA, setCorrectAnswersA] = useState(0);
  const [wrongAnswersB, setWrongAnswersB] = useState(0);
  const [correctAnswersB, setCorrectAnswersB] = useState(0);

  return (
    <div className="task1">
      <h1>Aufgabe 1: Prüfsummen</h1>
      <div className="task1A">
        <p>Todo Aufgabenstellung A</p>
        {[...Array(numOfExamples)].map(() => (
          <ChecksumExample checksumFunction={sumChecksum} />
        ))}
        {[...Array(numberOfTasks)].map(() => (
          <ChecksumExercise
            checksumFunction={sumChecksum}
            onWorong={() => setWrongAnswersA(wrongAnswersA + 1)}
            onCorrect={() => setCorrectAnswersA(correctAnswersA + 1)}
          />
        ))}
        {wrongAnswersA >= minWrongAnswers && correctAnswersA != 3 && (
          <p>Todo Lösung aufgabe A</p>
        )}
      </div>
      {correctAnswersA === numberOfTasks && (
        <div className="task1B">
          <p>Todo Aufgabenstellung B</p>
          {[...Array(numOfExamples)].map(() => (
            <ChecksumExample checksumFunction={nextTenChecksum} />
          ))}
          {[...Array(numberOfTasks)].map(() => (
            <ChecksumExercise
              checksumFunction={nextTenChecksum}
              onWorong={() => setWrongAnswersB(wrongAnswersB + 1)}
              onCorrect={() => setCorrectAnswersB(correctAnswersB + 1)}
            />
          ))}
          {wrongAnswersB >= minWrongAnswers && correctAnswersB != 3 && (
            <p>Lösung Aufgabe B</p>
          )}
        </div>
      )}
      {correctAnswersB === numberOfTasks && (
        <div className="task1C">
          <p>Todo Aufgabenstellung C</p>
        </div>
      )}
    </div>
  );
}

export default Task1;
