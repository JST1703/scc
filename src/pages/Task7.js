import React from "react";
import EncodingDistanceExercise from "../components/EncodingDistanceExercise";

/*
Task 7: Distances in Encodings

Given some random encodings, determine
- the distance of the code
- it's properties
*/

function Task7() {
  return (
    <div className="task">
      <h1>Aufgabe 7: Abstand in Kodierungen 2</h1>
      <p>
        In eiem Code mit Hamming-Abstand d kann man bis zu (d-1) Fehler erkennen
        und maximal (d-1)/2 Fehler korrigieren. Bestimmen sie für die gegebenen
        Kodierungen deren Hamming Abstand und deren Eigenschaften.
      </p>
      <EncodingDistanceExercise />
    </div>
  );
}

export default Task7;
