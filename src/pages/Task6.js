import React, { useState } from "react";
import MC from "../components/MC";
import YN from "../components/YN";
import { ReactComponent as G0 } from "../graphics/Graph_0_T6.svg";
import { ReactComponent as G1 } from "../graphics/Graph_1_T6.svg";
import { ReactComponent as G2 } from "../graphics/Graph_2_T6.svg";
import { ReactComponent as G3 } from "../graphics/Graph_3_T6.svg";
import { ReactComponent as G4 } from "../graphics/Graph_4_T6.svg";

/*
Task 6: Distances in Encodings
just theory and some YN/MC questions about Hamming-Distance.
*/

function Task6() {
  // keeping track which task has already been solved
  const [taskTracker, setTaskTracker] = useState(Array(9).fill(false));

  // updating task tracker
  const updateTaskTracker = (index) => {
    let temp = [...taskTracker];
    temp[index] = true;
    setTaskTracker(temp);
  };

  return (
    <div className="task">
      <h1>Aufgabe 6: Abstand in Kodierungen 1</h1>
      <p>
        Wir möchten nun genauer untersuchen, wass eine Kodierung erfüllen muss,
        damit man Fehler erkennen und korrigieren kann. Fangen wir bei einem
        sehr einfachen Beispiel an. Gegeben sind die Wörter 0 und 1 in unserer
        Kodierung.
      </p>
      <G0 />
      <YN
        callerFunction={() => updateTaskTracker(0)}
        question={
          "Kann man erkennen, ob ein Fehler aufgetreten ist, wenn eines der beiden Wörter als Nachricht ankommt?"
        }
        solution={0}
        optionYes={"Ja"}
        optionNo={"Nein"}
        textOnCorrect={
          "0 kann sich durch einen einzigen Fehler zu 1 umwandeln und andersrum."
        }
        textOnWrong={
          "0 kann sich durch einen einzigen Fehler zu 1 umwandeln und andersrum."
        }
      />

      {taskTracker[0] && (
        <div>
          <p>
            Im zweiten Beispiel sind nun die Wörter 00 und 11 in der Kodierung
            gegeben (in Grün). Eine der beiden möglichen Transformationen von
            einem zum anderen Wort ist hier dargestellt.
          </p>
          <G1 />
          <YN
            callerFunction={() => updateTaskTracker(1)}
            question={
              "Erkennt man den Fehler, wenn das Fehlerhafte Wort als Nachricht erhalten wird?"
            }
            solution={1}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnCorrect={
              "01 ist nicht in unserer Kodierung und kann desswegen nicht richtig sein."
            }
            textOnWrong={
              "01 ist nicht in unserer Kodierung und kann desswegen nicht richtig sein."
            }
          />
          <YN
            callerFunction={() => updateTaskTracker(2)}
            question={"Können sie diesen Fehler korrigieren?"}
            solution={0}
            optionYes={"Ja"}
            optionNo={"Nein"}
            textOnCorrect={
              "Beide Wörter haben den selben Abstannt zum fehlerhaften Wort. Eine eindeutige Zuordnung ist deswegen nicht möglich."
            }
            textOnWrong={
              "Beide Wörter haben den selben Abstannt zum fehlerhaften Wort. Eine eindeutige Zuordnung ist deswegen nicht möglich."
            }
          />
        </div>
      )}

      {taskTracker[1] && taskTracker[2] && (
        <div>
          <p>
            Gegeben sind wieder zwei Codewörter 0000 und 1111 und eine mögliche
            Transformation von einem zum anderen Wort.
          </p>
          <G2 />
          <MC
            callerFunction={() => updateTaskTracker(3)}
            question={"Wie viele Codewörter erkkenen Sie als Fehler?"}
            options={["1", "2", "3"]}
            answerKey={[false, false, true]}
            textOnCorrect={
              "Alle 3 Wörter dazwischen liegen nicht in der Kodierung."
            }
            textOnWrong={
              "Alle 3 Wörter dazwischen liegen nicht in der Kodierung."
            }
          />
          <MC
            callerFunction={() => updateTaskTracker(4)}
            question={"Wie viele Codewörter können Sie korrigieren?"}
            options={["1", "2", "3"]}
            answerKey={[false, true, false]}
            textOnCorrect={
              "0011 kann man nicht eindeutig 0000 oder 1111 zurdnen."
            }
            textOnWrong={
              "Nur 0001 und 0111 kann man den Wörter in unserer Kodierung eindeutig zuordnen."
            }
          />
          <MC
            callerFunction={() => updateTaskTracker(5)}
            question={
              "Wie viele Fehler kann in einem Wort vorfallen, so dass man das noch als Fehler erkennt?"
            }
            options={["1", "2", "3"]}
            answerKey={[false, false, true]}
            textOnCorrect={
              "Da die Wörter Abstand 4 haben, können bis zu 3 Fehler auftreten, die man noch erkennt. Bei 4 Fehler würde man das erhaltene Wort fälschlicher weise als korrekt betrachten."
            }
            textOnWrong={
              "Da die Wörter Abstand 4 haben, können bis zu 3 Fehler auftreten, die man noch erkennt. Bei 4 Fehler würde man das erhaltene Wort fälschlicher weise als korrekt betrachten."
            }
          />
          <MC
            callerFunction={() => updateTaskTracker(6)}
            question={
              "Wie viele Fehler können insgesammt bei unseren Codewörtern auftreten, so dass man das felerhafte Wort korrigieren kann?"
            }
            options={["1", "2", "3"]}
            answerKey={[true, false, false]}
            textOnCorrect={
              "Bei 2 Fehlern erhält man ein Wort, welches man nicht mehr zuorden kann. Bei mehr Fehlern korrigieren wir falsch."
            }
            textOnWrong={
              "Bei 2 Fehlern erhält man ein Wort, welches man nicht mehr zuorden kann. Bei mehr Fehlern korrigieren wir falsch."
            }
          />
        </div>
      )}

      {taskTracker[3] && taskTracker[4] && taskTracker[5] && taskTracker[6] && (
        <div>
          <p>Letztes Beispiel.</p>
          <G3 />
          <MC
            callerFunction={() => updateTaskTracker(7)}
            question={
              "Wie viele Fehler kann in einem Wort vorfallen, dass man das noch als Fehler erkennt?"
            }
            options={["2", "3", "4", "5"]}
            answerKey={[false, false, true, false]}
            textOnCorrect={""}
            textOnWrong={
              "Bis zu 4 Fehler können passieren. Die Wörter haben einen Abstand von 5 und deswegen würde erst ab 5 Fehlern das nicht mehr als falsch betrachted werden."
            }
          />
          <MC
            callerFunction={() => updateTaskTracker(8)}
            question={
              "Wie viele Fehler können insgesammt bei unseren Codewörtern auftreten, so dass man das felerhafte Wort korrigieren kann?"
            }
            options={["1", "2", "3", "4"]}
            answerKey={[false, true, false, false]}
            textOnCorrect={
              "Bei 2 Fehlern erhält man ein Wort, welches man immernoch eindeudig zuorden kann. Bei mehr Fehlern korrigieren wir falsch."
            }
            textOnWrong={
              "Bei 2 Fehlern erhält man ein Wort, welches man immernoch eindeudig zuorden kann. Bei mehr Fehlern korrigieren wir falsch."
            }
          />
        </div>
      )}

      {taskTracker[7] && taskTracker[8] && (
        <div>
          <p>
            Der Abstand der Codewörter ist also die entscheidende Grösse.
            Abhängig davon kann man eine bestimmte Anzahl Fehler erkennen oder
            eine bestimmte Anzahl Fehler korrigieren. Der Abstand zwischen zwei
            Codewörter ist definiert als die Anzahl Stellen, an denen sich die
            Wörter unterscheiden. Beispielsweise haben die Wörter 10010 und
            10100 den Abstand 3, da sich die letzten 3 Bits unterscheiden.
            Dieser Abstand wird auch Hamming-Abstand oder Hamming-Distanz
            genannt.
          </p>
          <p>
            Damit man innerhalb einer Kodierung immer eine bestimmte Anzahl
            Fehler korrigieren oder erkennen kann, so muss der Abstand zwischen
            allen Wörter-Paare in der Kodierung eine bestimmte Grösse haben. Das
            Beispiel hier zeig eine Kodierung mit Wörter der Länge 3 an, mit
            einem gerammten Abstand von 2.
          </p>
          <G4 />
        </div>
      )}
    </div>
  );
}

export default Task6;
