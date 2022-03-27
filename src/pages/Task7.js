import React, { useState } from "react";
import GT from "../components/GraphTask";
import Info from "../components/Info";

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

  // number of fails after which the hint is revealed
  const maxFails = 3;

  // current number of fails
  const [numberOfFails, setNumberOfFails] = useState(0);

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

      <p>
        Gegeben sind Aufgaben mit allen möglichen binären Strings der Länge 5.
        Ihre Aufgabe ist es, eine Kodierung zusammenzustellen, mit allen
        möglichen Code-Wörtern, welche bestimmte Eigenschaften erfüllen muss.
        Ein Code-Wort ist dabei bereits vorgegeben. Alle Strings in{" "}
        <span style={{ color: "green" }}>Grün</span> sind in Ihrer Auswahl.{" "}
        <span style={{ color: "red" }}>Rote </span>
        und <span style={{ color: "blue" }}>blaue</span> Strings sind nicht in
        der Auswahl. Es wird nur das gewertet, was grün ist. Weiter werden immer
        alle Strings hervorgehoben, welche einen Abstand von 1 zum aktuellen
        String haben.
      </p>

      <div className="task">
        <GT
          taskNumber={0}
          callerFunction={() => updateTaskTracker(0)}
          failFunction={() => {
            setNumberOfFails(numberOfFails + 1);
          }}
        />
      </div>

      {numberOfFails >= maxFails && (
        <>
          <div className="space"></div>
          <Info
            text={
              <p>
                Will man eine Kodierung mit einem Abstand von k haben, so
                beginnt man bei einem Wort und streicht alle Wörter weg, welche
                einen Abstand kleiner als k zum Anfangswort haben. Dann sucht
                man sich ein neues Wort aus und streicht von dort aus alle
                Wörter weg, welche einen Abstand kleiner als k zu diesem Wort
                haben, usw., bis man keine Wörter mehr streichen kann.
              </p>
            }
          />
          <div className="space"></div>
        </>
      )}

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
        <div className="task">
          <GT
            taskNumber={1}
            callerFunction={() => updateTaskTracker(1)}
            failFunction={() => {
              setNumberOfFails(numberOfFails + 1);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Task7;
