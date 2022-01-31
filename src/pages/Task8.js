import React, { useState } from "react";
import EncodingDistanceExercise from "../components/EncodingDistanceExercise";

/*
Task 8: Distances in Encodings

Given some random encodings, determine
- the distance of the code
- it's properties
*/

function Task8() {
  // number of tasks in this exercise
  const numberOfTasks = 5;

  // if true, next task is revealed
  const [task, setTask] = useState(() => {
    let sol = Array(numberOfTasks + 1).fill(false);
    sol[0] = true;
    return sol;
  });

  const handleTask = (index) => {
    let temp = [...task];
    temp[index] = true;
    setTask(temp);
  };

  const taskRender = [];
  for (let i = 0; i < numberOfTasks; ++i) {
    taskRender.push(
      task[i] && (
        <div className="EDE">
          <EncodingDistanceExercise callerFunction={() => handleTask(i + 1)} />
        </div>
      )
    );
  }

  return (
    <div className="task">
      <h1>Aufgabe 8: Abstand in Kodierungen 3</h1>
      <p>
        In einem Code mit Hamming-Abstand d kann man bis zu (d-1) Fehler
        erkennen und maximal (d-1)/2 Fehler korrigieren. Bestimmen sie für die
        gegebenen Kodierungen deren Hamming Abstand und deren Eigenschaften.
      </p>
      {taskRender}
    </div>
  );
}

export default Task8;
