import React, { useState } from "react";
import EncodingDistanceExercise from "../components/EncodingDistanceExercise";
import { ReactComponent as G3 } from "../graphics/Graph_3_T6.svg";
import ChecksumExercise from "../components/ChecksumExercise";
import MC from "../components/MC";

/*
Task 8: Distances in Encodings

Task A: questions about the formulas for k error detection and correction,
what distance does one need for that.

Task B: Given some random encodings, determine
- the distance of the code
- it's properties

Task C: theory about the properties of two predetermined encodings
*/

function Task8() {
  //used for task c
  const code1 = [
    <div>0000</div>,
    <div>0011</div>,
    <div>0101</div>,
    <div>0110</div>,
    <div>1001</div>,
    <div>1010</div>,
    <div>1100</div>,
    <div>1111</div>,
  ];
  const code2 = [
    <div>000000</div>,
    <div>001001</div>,
    <div>010010</div>,
    <div>011011</div>,
    <div>100100</div>,
    <div>101101</div>,
    <div>110110</div>,
    <div>111111</div>,
  ];

  // variable for showing if the answer in task A is correct or not
  const [correctStateA, setCorrectStateA] = useState("");
  const [correctStateB, setCorrectStateB] = useState(false);

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
      <p>
        Angenommen, wir wollen eine Kodierungen haben, die bis zu k Fehler
        erkennen kann. Wie gross muss der Abstand d midestends sein abhängig von
        k?
      </p>
      <ChecksumExercise
        onCorrect={() => setCorrectStateA(true)}
        onWorong={() => setCorrectStateA(false)}
        checksumFunction={(x) => {
          return "k+1";
        }}
        sequence={["d", " ", "=", " "]}
      />
      {correctStateA === false && <p>Richtig ist d = k + 1.</p>}
      {(correctStateA === false || correctStateA === true) && (
        <MC
          callerFunction={() => setCorrectStateB(true)}
          question={
            "Angenommen, wir wollen eine Kodierungen haben, die bis zu k Fehler korrigieren kann. Wie gross muss der Abstand d mindistends sein abhängig von k?"
          }
          options={["d = 2k + 1", "d = 2k", "d = 2k - 1"]}
          answerKey={[true, false, false]}
          textOnCorrect={"Richtig."}
          textOnWrong={"Falsch. 2k + 1 wäre die richtige Lösung."}
        />
      )}
      {correctStateB && (
        <div>
          <p>
            Gegeben sind enige Kodierungen. Bestimmen Sie jeweils den Abstand
            der Kodierung und deren Eigenschaften.
          </p>
          {taskRender}
        </div>
      )}
      {task[numberOfTasks] && (
        <div>
          <p>
            Gegeben sind hier 2 Kodierungen mit je 8 Wörter. Beide haben einen
            Hamming-Abstand von 2, obwohl die zweite Kodierung weniger Bits
            benötigt. Es gibt also Kodierungen, die effizienter sind in der
            Wortlänge.
          </p>
          <div>
            <p>Kodierung 1:</p>
            {code1[0]}
            {code1[1]}
            {code1[2]}
            {code1[3]}
            {code1[4]}
            {code1[5]}
            {code1[6]}
            {code1[7]}
          </div>

          <div>
            <p>Kodierung 2:</p>
            {code2[0]}
            {code2[1]}
            {code2[2]}
            {code2[3]}
            {code2[4]}
            {code2[5]}
            {code2[6]}
            {code2[7]}
          </div>
        </div>
      )}
    </div>
  );
}

export default Task8;
