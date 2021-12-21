import React, { useState } from "react";
import ChecksumExercise from "../ChecksumExercise";
import checksum from "../../checksum/checksum";

function Task1() {
  const [numIncorrect, setNumIncorrect] = useState(0);

  return (
    <div className="task1">
      <h1>Aufgabe 1: Prüfsymbole</h1>
      <ChecksumExercise
        data={[3, 1]}
        checksumFn={checksum}
        onWrongAnswer={() => setNumIncorrect(numIncorrect + 1)}
      />
      <ChecksumExercise data={[2, 2]} checksumFn={checksum} />
    </div>
  );
}

export default Task1;
