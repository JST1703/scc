import React from "react";
import { ReactComponent as G1 } from "../graphics/Graph_1_T6.svg";
import { ReactComponent as G2 } from "../graphics/Graph_2_T6.svg";
import { ReactComponent as G3 } from "../graphics/Graph_3_T6.svg";
import { ReactComponent as G4 } from "../graphics/Graph_4_T6.svg";
import { ReactComponent as G5 } from "../graphics/Graph_5_T6.svg";

/*
Task 6: Distances in Encodings
just theory  
*/

function Task6() {
  return (
    <div className="task">
      <h1>Aufgabe 6: Abstand in Kodierungen 1</h1>
      <p>
        Wir möchten nun genauer untersuchen, wass eine Kodierung erfüllen muss,
        damit man Fehler bemerken und korrigieren kann. Dafür ist der Abstand
        der Codewörter massgebend. Abhänig davon kann man eine bestimmte Anzahl
        Fehler erkennen oder eine bestimmte Anzahl Fehler korrigieren. Der
        Abstand zwischen zwei Codewörter ist definiert als die Anzahl Stellen,
        an denen sich die wörter unterscheiden. Beispielsweise haben die Wörter
        10010 und 10100 den Abstand 3, da sich die letzten 3 bits unterscheiden.
        Dieser Abstand wird auch Hamming-Abstand oder Hamming-Distanz genannt.
      </p>
      <p>
        Betrachten wir im ersten einfachen Beispiel die gegebenen Codewörter (in
        Grün). Diese haben einen Abstand von 1. Sollte sich durch einen Fehler
        das eine Wort zum anderen Abändern, wenn hier das letzte Bit sich
        ändert, dann würde der Feher unbermerkt bleiben. Man kann in diesem Fall
        keine Fehler zwischen den Wörtern erkennen.
      </p>
      <G1 />
      <p>
        Im zweiten Beipiel haben wir zwei Codewörter mit einer Distanz von 2.
        Sollte nun ein Fehler auftreten, dann fällt das auf. 00001 gehört nicht
        zum Code und somit muss da ein Fehler vorgefallen sein. Wir können den
        Fehler leider nicht beheben. Beide Codewörter liegen gleich nahe zum
        falschen Wort. Eine eindeutige Korrektur ist nicht möglich.
      </p>
      <G2 />
      <p>
        Im dritten Beipiel haben wir zwei Codewörter mit einer Distanz von 4.
        Sollte hier ein Fehler auftreten, dann können wir den auch korrigieren.
        00001 und 00111 sind die einzigen Wörter, die wir mit einer Änderung
        erreichen können. 00001 liegt eindeutig näher bei 00000 und somit ist
        eine Korrektur möglich. 2 Fehler können wir nicht mehr korrigieren. Das
        Wort 00011 hat wieder die gleiche Distanz zu den Codewörter. Allerdigns
        können wir den Fehler von 2 erkennen. Auch wenn 3 Fehler auftreten,
        können wir das erkennen. 00000 kann sich mit 3 Fehlern zu 00111
        umwandeln. Dann würden wir allerdings das fälschlicherweise zu 01111
        korrigieren. Deswegen können wir hier nur bis zu 3 Fehler erkennen. Bei
        4 Fehlern könnte sich 00000 zu 01111 umwandeln, was wir nicht als Fehler
        registrieren würden. Zusammengefasst können wir mit einem Abstand 4 bis
        zu 3 Fehler erkennen und bis zu 1 Fehler korrigieren.
      </p>
      <G3 />
      <p>
        Im letzten Beispiel haben wir eine Distanz von 5. Damit können wir bis
        zu 2 Fehler korrigieren und bis zu 4 Fehler erkennen.
      </p>
      <G4 />
      <p>
        Damit man eine bestimmte Anzahl Fehler korrigieren und/oder erkennen
        kann, ist der kleinste Abstand zwischen allen Codewörter massgebend.
        Hier haben wir einen Code mit einem Abstand von 2. Damit können wir im
        gesammten Code jeweils nur einzelne Fehler erkennen.
      </p>
      <G5 />
    </div>
  );
}

export default Task6;
