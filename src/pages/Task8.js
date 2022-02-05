import React, { useState } from "react";
import EncodingDistanceExercise from "../components/EncodingDistanceExercise";
import { ReactComponent as G3 } from "../graphics/Graph_3_T6.svg";
import MC from "../components/MC";
import TextExecise from "../components/TextExercise";

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
        <div className="EDE">
          <EncodingDistanceExercise callerFunction={() => handleTask(i + 1)} />
        </div>
      )
    );
  }

  return (
    <div className="task">
      <h1>Aufgabe 8: Abstand in Kodierungen 3</h1>
      <G3 />
      <TextExecise
        callerFunction={() => setState1(true)}
        question={
          "Angenommen, wir wollen eine Kodierungen haben, die bis zu k Fehler erkennen kann. Wie gross muss der Abstand d midestends sein abhängig von k?"
        }
        text={"d ="}
        solutions={["k+1", "1+k"]}
        textOnCorrect={""}
        textOnWrong={"Die richtige Lösung lautet: d = k+1"}
      />

      {state1 && (
        <MC
          callerFunction={() => setState2(true)}
          question={
            "Angenommen, wir wollen eine Kodierungen haben, die bis zu k Fehler korrigieren kann. Wie gross muss der Abstand d mindistends sein abhängig von k?"
          }
          options={["d = 2k + 1", "d = 2k", "d = 2k - 1"]}
          answerKey={[true, false, false]}
          textOnCorrect={"Richtig."}
          textOnWrong={"Falsch. d = 2k + 1 wäre die richtige Lösung."}
        />
      )}
      {state2 && (
        <div>
          <p>
            Gegeben sind enige Kodierungen. Bestimmen Sie jeweils den Abstand
            der Kodierung und deren Eigenschaften.
          </p>
          {taskRender}
        </div>
      )}
    </div>
  );
}

export default Task8;
