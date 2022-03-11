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
  const [taskTracker, setTaskTracker] = useState(Array(8).fill(false));

  // updating task tracker
  const updateTaskTracker = (index) => {
    let temp = [...taskTracker];
    temp[index] = true;
    setTaskTracker(temp);
  };

  return (
    <div className="main">
      <h1>Aufgabe 6: Abstand in Kodierungen 1</h1>

      <div className="space"></div>

      <div className="task">
        <div className="taskLeftScroll">
          <G0 />
        </div>

        <div className="taskRight">
          <YN
            question={
              <p>
                Wir betrachen mögliche Kodierungen für die Nachrichten "Nein"
                und "Ja". Die <span style={{ color: "green" }}>Codewörter</span>{" "}
                bestehen in diesem Beispiel nur aus einem Bit. Angenommen wir
                haben einen Übertragungsfehler an einer Stelle beim Versenden
                einer Nachricht. Kann man das mit dieser Kodierung erkennen?
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Bei einem Übertragungsfehler bei dieser Kodierung wandelt sich
                das eine Codewort zum anderen um. Man würde keinen Fehler
                feststellen.
              </p>
            }
            callerFunction={() => updateTaskTracker(0)}
          />
        </div>
        <div className="space"></div>
      </div>

      {taskTracker[0] && (
        <div className="task">
          <div className="taskLeftScroll">
            <G1 />
          </div>

          <div className="taskRight">
            <YN
              question={
                <p>
                  Wir nutzen nun Bitstrings der Länge 2 für die{" "}
                  <span style={{ color: "green" }}>Codewörter</span>. Angenommen
                  wir haben einen Übertragungsfehler an einer Stelle beim
                  Versenden einer Nachricht. Kann man das mit dieser Kodierung
                  erkennen?
                </p>
              }
              solution={1}
              optionYes={<span>Ja</span>}
              optionNo={<span>Nein</span>}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Ein Übertragungsfehler an einer Stelle bei einem Codewort
                  führt dazu, dass wir ein String erreichen, welcher nicht in
                  unserer Kodierung enthalten ist. Damit erkennen wir, dass ein
                  Übertragungsfehler vorgefallen ist.
                </p>
              }
              callerFunction={() => updateTaskTracker(1)}
            />
            <div className="space"></div>
            <YN
              question={
                <p>
                  Können wir diesen Übertragungsfehler korrigieren mit der
                  gegebenen Kodierung?
                </p>
              }
              solution={0}
              optionYes={<span>Ja</span>}
              optionNo={<span>Nein</span>}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Das fehlerhafte Wort unterscheidet sich in gleich vielen
                  Stellen von beiden Codewörter. Damit können wir nicht
                  eindeutig bestimmen, welches die ursprüngliche Nachricht war.
                </p>
              }
              callerFunction={() => updateTaskTracker(2)}
            />
          </div>
          <div className="space"></div>
        </div>
      )}

      {taskTracker[1] && taskTracker[2] && (
        <div className="task">
          <div className="taskLeftScroll">
            <G2 />
          </div>

          <div className="taskRight">
            <p>
              Wir nutzen nun Bitstrings der Länge 4 für die{" "}
              <span style={{ color: "green" }}>Codewörter</span>. Wie viele
              Fehler können bei der Übertragung auftreten, dammit man eine
              Fehlübertragung erkennen kann? Mehrere Antworten sind möglich.
            </p>
            <MC
              options={[
                <span>1</span>,
                <span>2</span>,
                <span>3</span>,
                <span>4</span>,
              ]}
              answerKey={[true, true, true, false]}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Nur wenn an allen 4 Stellen ein Fehler auftrit, erhalten wir
                  das andere Codewort, was wir nicht als Fehler erkennen würden.
                  Bei weniger Fehlern erhalten wir einen String, welcher nicht
                  teil unserer gegebenen Kodierung ist, was wir als Fehler
                  erkennen.
                </p>
              }
              callerFunction={() => updateTaskTracker(3)}
            />
            <div className="space"></div>
            <p>
              Wie viele Fehler können bei der Übertragung auftreten, dammit man
              eine Fehlübertragung korrigieren kann?
            </p>
            <MC
              options={[
                <span>1</span>,
                <span>2</span>,
                <span>3</span>,
                <span>4</span>,
              ]}
              answerKey={[true, false, false, false]}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Nur Strings, welche sich an genau einer Stelle von einem
                  Codewort unterscheiden können wir einem der beiden Codewörter
                  eindeutig zuordnen. Die Strings, die sich in zwei Stellen von
                  einem Codewort unterscheiden, unterscheiden sich auch in zwei
                  Stellen zum anderen Codewort und können somit nicht einem der
                  beiden Codewörter eindeutig zugeordnet werden. Bei Fehler an
                  drei Stellen erhält man einen String, welcher näher am anderen
                  Codewort liegt und nicht am ursprünglichen Codewort. Man würde
                  in diesem Fall falsch korrigieren.
                </p>
              }
              callerFunction={() => updateTaskTracker(4)}
            />
          </div>
          <div className="space"></div>
        </div>
      )}

      {taskTracker[3] && taskTracker[4] && (
        <div className="task">
          <div className="taskLeftScroll">
            <G3 />
          </div>

          <div className="taskRight">
            <p>
              Wir nutzen nun Bitstrings der Länge 5 für die{" "}
              <span style={{ color: "green" }}>Codewörter</span>. Wie viele
              Fehler können bei der Übertragung auftreten, dammit man eine
              Fehlübertragung erkennen kann? Mehrere Antworten sind möglich.
            </p>
            <MC
              options={[
                <span>1</span>,
                <span>2</span>,
                <span>3</span>,
                <span>4</span>,
                <span>5</span>,
              ]}
              answerKey={[true, true, true, true, false]}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Nur wenn an allen 5 Stellen ein Fehler auftrit, erhalten wir
                  das andere Codewort, was wir nicht als Fehler erkennen würden.
                  Bei weniger Fehlern erhalten wir einen String, welcher nicht
                  teil unserer gegebenen Kodierung ist, was wir als Fehler
                  erkennen.
                </p>
              }
              callerFunction={() => updateTaskTracker(5)}
            />
            <div className="space"></div>
            <p>
              Wie viele Fehler können bei der Übertragung auftreten, dammit man
              eine Fehlübertragung korrigieren kann? Mehrere Antworten sind
              möglich.
            </p>
            <MC
              options={[
                <span>1</span>,
                <span>2</span>,
                <span>3</span>,
                <span>4</span>,
                <span>5</span>,
              ]}
              answerKey={[true, true, false, false, false]}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Nur Strings, welche sich an genau einer Stelle oder zwei
                  Stellen von einem Codewort unterscheiden können wir einem der
                  beiden Codewörter eindeutig zuordnen. Bei Fehler an drei oder
                  vier Stellen erhält man einen String, welcher näher am anderen
                  Codewort liegt und nicht am ursprünglichen Codewort. Man würde
                  in diesem Fall falsch korrigieren.
                </p>
              }
              callerFunction={() => updateTaskTracker(6)}
            />
          </div>
          <div className="space"></div>
        </div>
      )}

      {taskTracker[5] && taskTracker[6] && (
        <div className="task">
          <p>
            Welche Eigenschaft für eine Kodierung ist entscheident um eine
            bestimmte Anzahl an Fehler zu erkennen oder zu korrigieren zu
            können?
          </p>
          <MC
            options={[
              <span>Die Anzahl der Codewörter</span>,
              <span>Der Abstand der Codewörter</span>,
              <span>Die Länge der Codewörter</span>,
            ]}
            answerKey={[false, true, false]}
            textOnCorrect={
              <p>
                Der Abstand zweier Codewörter ist definiert als die Anzahl
                Stellen, an denen sich die Wörter unterscheiden. Dieser Abstand
                wird auch Hamming-Distanz genannt.
              </p>
            }
            textOnWrong={
              <p>
                Der Abstand zweier Codewörter ist definiert als die Anzahl
                Stellen, an denen sich die Wörter unterscheiden. Dieser Abstand
                wird auch Hamming-Distanz genannt. Dieser ist die massgebliche
                Grösse, welche bestimmt, wie viele Fehler man bei einer
                Fehlübertragung von Nachrichten erkennen oder korrigieren kann.
              </p>
            }
            callerFunction={() => updateTaskTracker(7)}
          />
          <div className="space"></div>
        </div>
      )}

      {taskTracker[7] && (
        <div className="task">
          <div className="taskLeft">
            <G4 />
          </div>

          <div className="taskRight">
            <p>
              Damit man bei jeder Nachricht x Fehler erkennen oder korrigieren
              kann muss der Abstand aller Paare von Codewörter eine bestimmte
              grösse betragen.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task6;
