import React, { useState } from "react";
import EncodingDistanceExercise from "../components/EncodingDistanceExercise";

/*
Task 7: Distances in Encodings

Given some random encodings, determine
- the distance of the code
- it's properties
*/

function Task7() {
  // number of tasks in this exercise
  const numberOfTasks = 5;

  const taskRender = [];
  for (let i = 0; i < numberOfTasks; ++i) {
    taskRender.push(
      <div className="EDE">
        <EncodingDistanceExercise />
      </div>
    );
  }

  return (
    <div className="task">
      <h1>Aufgabe 7: Abstand in Kodierungen 2</h1>
      <p>
        In einem Code mit Hamming-Abstand d kann man bis zu (d-1) Fehler
        erkennen und maximal (d-1)/2 Fehler korrigieren. Bestimmen sie für die
        gegebenen Kodierungen deren Hamming Abstand und deren Eigenschaften.
      </p>
      {taskRender}
    </div>
  );
}

export default Task7;
