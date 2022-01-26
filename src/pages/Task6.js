import React from "react";
import { ReactComponent as G1 } from "../graphics/Graph_1_T6.svg";

/*
Task 6: Distances in Encodings

Task A: Theroie about  
*/

function Task6() {
  return (
    <div className="task">
      <h1>Aufgabe 6: Abstand in Kodierungen 1</h1>
      <p>
        Wir möchten nun genauer untersuchen, wass eine Kodierung erfüllen muss,
        damit man Fehler bemerken und korrigieren kann. Dafür ist der Abstand
        der Kodewörter massgebend. Abhänig davon kann man eine bestimmte Anzahl
        Fehler erkennen oder eine bestimmte Anzahl Fehler korrigieren.
      </p>
      <G1 className={"graphics"} />
    </div>
  );
}

export default Task6;
