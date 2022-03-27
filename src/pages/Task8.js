import React, { useState } from "react";
import EncodingDistanceExercise from "../components/EncodingDistanceExercise";
import { ReactComponent as G } from "../graphics/Graph_2_T6.svg";
import MC from "../components/MC";
import TextExercise from "../components/TextExercise";
import Info from "../components/Info.js";

/*
Task 8: Distances in Encodings

Task A: questions about the formulas for k error detection and correction,
what distance does one need for that.

Task B: Given some random encodings, determine
- the distance of the code
- it's properties
*/

function Task8() {
  // variable for showing if the subtasks in A have been answered or not
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);

  // number of simple tasks in B
  const numberOfTasks = 4;

  // if true, next task is revealed
  const [task, setTask] = useState(() => {
    let sol = Array(numberOfTasks).fill(false);
    return sol;
  });

  const handleTask = (index) => {
    let temp = [...task];
    temp[index] = true;
    setTask(temp);
  };

  const [taskShuffle] = useState(
    [0, 1, 2, 3].sort(() => (Math.random() > 0.5 ? 1 : -1))
  );

  let taskRender = [];
  for (let i = 0; i < numberOfTasks; ++i) {
    taskRender.push(
      <>
        <EncodingDistanceExercise
          key={i}
          callerFunction={() => handleTask(i)}
          taskNumber={taskShuffle[i]}
        />
        <div className="space"></div>
      </>
    );
  }

  return (
    <div className="main">
      <h1>Aufgabe 8: Abstand in Kodierungen 3</h1>
      <div className="space"></div>

      <div className="task">
        <div className="taskLeftScroll">
          <G />
        </div>
        <div className="taskRight">
          <TextExercise
            callerFunction={() => setState1(true)}
            question={
              <p>
                Angenommen, wir wollen eine Kodierungen haben, die bis zu k
                Fehler erkennen kann. Wie gross muss der dafür Abstand d
                mindestens sein in Abhängigkeit von k?
              </p>
            }
            text={<span>d =</span>}
            solutions={["k+1", "1+k"]}
            textOnCorrect={<p></p>}
            textOnWrong={<p>Die richtige Lösung lautet: d = k + 1.</p>}
          />

          {state1 && (
            <>
              <div className="space"></div>
              <Info
                text={
                  <p>
                    Wenn wir einen String erhalten, welcher nicht teil unseren
                    Code-Wörtern ist, dann muss ein Übertragungsfehler
                    vorgefallen sein. Haben alle unsere Code-Wörter einen
                    Abstand von k + 1 bedeutet das, dass wir k + 1 Stellen an
                    einem Codewort ändern müssen, damit wir ein anderes
                    Code-Wort erhalten. Werden weniger Stellen abgeändert, dann
                    erreichen wir damit kein Code-Wort. Deswegen kann man mit
                    einem Abstand von k + 1 bis zu k Fehler erkennen.
                  </p>
                }
              />
              <div className="space"></div>
              <p>
                Angenommen, wir wollen eine Kodierungen haben, die bis zu k
                Fehler korrigieren kann. Wie gross muss der dafür Abstand d
                mindestens sein in Abhängigkeit von k?
              </p>
              <MC
                callerFunction={() => setState2(true)}
                options={[
                  <span>d = 2k + 1</span>,
                  <span>d = 2k</span>,
                  <span>d = 2k - 1</span>,
                ]}
                answerKey={[true, false, false]}
                textOnCorrect={<p></p>}
                textOnWrong={<p>Die richtige Lösung lautet: d = 2k + 1.</p>}
              />
            </>
          )}
          {state2 && (
            <>
              <div className="space"></div>
              <Info
                text={
                  <p>
                    Damit man einen beliebigen String korrigieren kann, muss
                    dieser eindeutig näher an einem Code-Wort sein, als zu den
                    restlichen Code-Wörtern. Liegt dieser gleich weit von 2
                    Codewörtern entfernt, ist keine Korrektur möglich. Damit man
                    bis zu k Fehler korrigieren kann, muss sich der fehlerhafte
                    String vom ursprünglichen Code-Wort in k stellen
                    unterscheiden und zu allen anderen Code Wörter in mindesten
                    k+1 stellen, damit wir eine eindeutige Zuordnung haben. Das
                    ist ein gerammter Abstand von 2k + 1 zwischen den
                    Code-Wörtern.
                  </p>
                }
              />
              <div className="space"></div>
            </>
          )}
        </div>
      </div>

      <div className="task">
        <button
          onClick={() => {
            setState1(true);
            setState2(true);
          }}
        >
          <p>Aufgabe überspringen</p>
        </button>
      </div>

      {state2 && (
        <div className="task">
          <div className="space"></div>
          <p>
            Gegeben sind einige Kodierungen. Bestimmen Sie jeweils den Abstand
            der Kodierung und deren Eigenschaften.
          </p>
          <div className="space"></div>

          <div className="taskLeft">
            {taskRender[0]}
            {task[1] && taskRender[2]}
          </div>

          <div className="taskRight">
            {task[0] && taskRender[1]}
            {task[2] && taskRender[3]}
          </div>
        </div>
      )}
    </div>
  );
}

export default Task8;
