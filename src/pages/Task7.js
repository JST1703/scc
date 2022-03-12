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
  // keeping track which task has already been solved
  const [taskTracker, setTaskTracker] = useState(Array(2).fill(false));

  // updating task tracker
  const updateTaskTracker = (index) => {
    let temp = [...taskTracker];
    temp[index] = true;
    setTaskTracker(temp);
  };

  return (
    <div className="main">
      <h1>Aufgabe 7: Abstand in Kodierungen 2</h1>

      <div className="space"></div>

      <div className="task">
        <GT taskNumber={0} callerFunction={() => updateTaskTracker(0)} />
      </div>

      <div className="space"></div>
      <div className="task">
        <button
          onClick={() => {
            updateTaskTracker(0);
          }}
        >
          <p>Aufgabe überspringen</p>
        </button>
      </div>

      <div className="space"></div>

      {taskTracker[0] && (
        <>
          <div className="task">
            <GT taskNumber={1} callerFunction={() => updateTaskTracker(1)} />
          </div>

          <div className="space"></div>
          <div className="task">
            <button
              onClick={() => {
                updateTaskTracker(1);
              }}
            >
              <p>Aufgabe überspringen</p>
            </button>
          </div>
          <div className="space"></div>
        </>
      )}

      {taskTracker[1] && (
        <div className="task">
          <p>
            Mit dieser Methode lässt sich einfach eine Kodierung finden, welche
            eine bestimmte Eigenschaft erfüllen soll. Will man eine Kodierung
            mit einem Abstand von k haben, so beginnt man bei einem Wort und
            streicht alle Wörter weg, welche einen Abstand kleiner als k zum
            Anfangswort haben. Dann sucht man sich ein neues Wort aus und
            streicht von dort aus alle Wörter weg, welche einen Abstand kleiner
            als k zu diesem Wort haben, usw., bis man keine Wörter mehr
            streichen kann.
          </p>
        </div>
      )}
    </div>
  );
}

export default Task7;
