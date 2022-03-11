import React, { useState } from "react";
import GT from "../components/GraphTask";

/*
Task 7: Given all possible binary words of length 5,
the user must select all words to form an encoding fulfilling
a some properties. One word is selected already at the beginning.

Task A: find an encoding that ensures detecting single errors, but no correction is possible.

Task B: find an encoding that ensures correcting single errors.
*/

function Task7() {
  return (
    <div className="main">
      <h1>Aufgabe 7: Abstand in Kodierungen 2</h1>
      <div className="space"></div>
      <GT taskNumber={0} />
      <GT taskNumber={1} />
    </div>
  );
}

export default Task7;
