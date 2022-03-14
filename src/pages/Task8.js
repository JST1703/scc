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
    let sol = Array(numberOfTasks + 1).fill(false);
    sol[0] = true;
    return sol;
  });

  const handleTask = (index) => {
    let temp = [...task];
    temp[index] = true;
    setTask(temp);
  };

  const taskRender = [];
  for (let i = 0; i < numberOfTasks; ++i) {
    taskRender.push(
      task[i] && (
        <div className="task" key={i}>
          <EncodingDistanceExercise callerFunction={() => handleTask(i + 1)} />
        </div>
      )
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
                midestends sein abhängig von k?
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
                    Codewörter ist, dann muss ein Übertragungsfehler vorgefallen
                    sein. Haben alle unser Codewörter einen Abstand von k + 1
                    beduetet das, dass wir k + 1 Stellen an einem Codewort
                    ändern müssen, damit wir ein anderes Codewort erhalten.
                    Werden weniger Stellen abgeändert, dann erreichen wir damit
                    kein Codewort. Deswegen können wir mit einem Abstand von k +
                    1 bis zu k Fehler erkennen.
                  </p>
                }
              />
              <div className="space"></div>
              <p>
                Angenommen, wir wollen eine Kodierungen haben, die bis zu k
                Fehler korrigieren kann. Wie gross muss dafür der Abstand d
                midestends sein abhängig von k?
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
                    Um einen erhaltenen String s, welcher nicht zu den
                    Codewörter gehört, korrigieren zu können, ordnen wir diesen
                    dem nächstgelegenen Codewort zu, mit dem kleinsetn abstand
                    zu s. Wenn alle Codewörter einen Abstand von 2k + 1 haben,
                    kann ein beliebeger String s nicht gleich weit entfehrnt von
                    den beiden Codewörter sein. Sollte der Abstand zu einem
                    Codewort k sein, muss zwingend der Abstand zum anderen k + 1
                    sein, sonst wäre der Abstand der Codewörter nicht
                    mindestends 2k + 1.
                  </p>
                }
              />
              <div className="space"></div>
            </>
          )}
        </div>
      </div>

      {state2 && (
        <div className="task">
          <div className="space"></div>
          <p>
            Gegeben sind enige Kodierungen. Bestimmen Sie jeweils den Abstand
            der Kodierung und deren Eigenschaften.
          </p>
          <div className="space"></div>

          {taskRender}
        </div>
      )}
    </div>
  );
}

export default Task8;
