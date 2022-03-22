import React, { useState } from "react";
import MC from "../components/MC";
import YN from "../components/YN";
import errormaker from "../functions/errormaker";
import distance from "../functions/distance";

/*
Task 4: Given is an encoding. The user is given a few messages with errors. The user must find the original message.

Task A has only one error in the message.

Task B has two errors in the message.

Task C has 3 errors, which allows for multiple solutions.

Task D are some YN Questions about the properties of the given encoding.
*/

function Task4() {
  // Table content
  const words = [
    <span>Hund</span>,
    <span>Mond</span>,
    <span>Pizza</span>,
    <span>Auto</span>,
  ];
  const binaryRep = ["00", "01", "10", "11"];
  const encoding = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1],
  ];

  const numberOfTasks = 3;

  // keeping track of the number of answers given in each task for revealing the next task
  const [answersA, setAnswersA] = useState(0);
  const [answersB, setAnswersB] = useState(0);
  const [answersC, setAnswersC] = useState(0);

  // if true, next task is revealed
  const [taskStateD, setTaskStateD] = useState(Array(5).fill(false));

  // revealing next part of task D
  const handleTaskStateD = (index) => {
    let temp = [...taskStateD];
    temp[index] = true;
    setTaskStateD(temp);
  };

  // Table for encoding
  const table = [];

  // Table Head
  table.push(
    <tr key={4}>
      <th>Wort</th>
      <th>Binäre Darstellung</th>
      <th>Kodierung</th>
    </tr>
  );

  // Table items
  for (let i = 0; i < 4; ++i) {
    table.push(
      <tr key={i}>
        <td>{words[i]}</td>
        <td>{binaryRep[i]}</td>
        <td>{encoding[i]}</td>
      </tr>
    );
  }

  // Temp for MC Questions
  const [mcTemp] = useState(() => {
    // return value of this function
    let sol = [];

    // always in pairs of 3, for each subtask 1
    for (let i = 0; i < 3 * numberOfTasks; i += 3) {
      // randomizing the selection of code words
      let k1 = Math.round(Math.random() * 3);
      let k2 = Math.round(Math.random() * 3);
      let k3 = Math.round(Math.random() * 3);

      // the false code word for the mc part being displayed
      let seqTemp1 = [...encoding[k1]];
      let seqTemp2 = [...encoding[k2]];
      let seqTemp3 = [...encoding[k3]];

      // creating some errors
      errormaker(seqTemp1, 1);
      errormaker(seqTemp2, 2);
      errormaker(seqTemp3, 3);

      // answer keys and
      let key1 = Array(4).fill(false);
      key1[k1] = true;
      let key2 = Array(4).fill(false);
      key2[k2] = true;

      let key3 = [];
      let k4 = 0;
      for (let i = 0; i < 4; ++i) {
        if (distance(seqTemp3, encoding[i]) === 3) {
          key3[i] = true;
          if (k3 != i) k4 = i;
        } else {
          key3[i] = false;
        }
      }

      // gather them all together
      sol.push([seqTemp1.join(""), key1, words[k1]]);
      sol.push([seqTemp2.join(""), key2, words[k2]]);
      sol.push([
        seqTemp3.join(""),
        key3,
        <span>
          {words[k3]} und {words[k4]}
        </span>,
      ]);
    }

    return sol;
  });

  // MC Questions
  let mc4A = []; // one error
  let mc4B = []; // two errors
  let mc4C = []; // three errors

  for (let i = 0; i < 3 * numberOfTasks; i += 3) {
    let element1 = mcTemp[i];
    let element2 = mcTemp[i + 1];
    let element3 = mcTemp[i + 2];

    mc4A.push(
      <>
        <div className="space"></div>
        <p>Erhaltene Nachricht: {element1[0]}</p>
        <div className="smallSpace"></div>
        <MC
          key={i}
          callerFunction={() => setAnswersA(answersA + 1)}
          options={words}
          answerKey={element1[1]}
          textOnWrong={<p>Die richtige Antwort lautet {element1[2]}.</p>}
          textOnCorrect={<p></p>}
        />
      </>
    );

    mc4B.push(
      <>
        <div className="space"></div>
        <p>Erhaltene Nachricht: {element2[0]}</p>
        <div className="smallSpace"></div>
        <MC
          key={i + 1}
          callerFunction={() => setAnswersB(answersB + 1)}
          options={words}
          answerKey={element2[1]}
          textOnWrong={<p>Die richtige Antwort lautet {element2[2]}.</p>}
          textOnCorrect={<p></p>}
        />
      </>
    );

    mc4C.push(
      <>
        <div className="space"></div>
        <p>Erhaltene Nachricht: {element3[0]}</p>
        <div className="smallSpace"></div>
        <MC
          key={i + 2}
          callerFunction={() => setAnswersC(answersC + 1)}
          options={words}
          answerKey={element3[1]}
          textOnWrong={<p>Die richtige Antworten sind {element3[2]}.</p>}
          textOnCorrect={<p></p>}
        />
      </>
    );
  }

  return (
    <div className="main">
      <h1>Aufgabe 4: Kodierungen und Fehlerkorrektur 1</h1>

      <div className="space"></div>

      <div className="task">
        <div className="taskLeft">
          <p>
            Gegeben ist eine Kodierung von 4 Nachrichten (Siehe Tabelle rechts).
            Die Kodierung ordnet jeder Nachricht einen String zu, welcher
            wiederum 2-mal wiederholt wird. Beispielsweise wird hier{" "}
            {binaryRep[1]} mit
            {" " + binaryRep[1]}
            <span style={{ color: "red" }}>{binaryRep[1]}</span>
            <span style={{ color: "green" }}>{binaryRep[1] + " "}</span>{" "}
            kodiert.
          </p>
          <div className="space"></div>
          <p>
            Gegeben sind Nachrichten nach der Übertragung. Bestimmen Sie die
            mögliche ursprüngliche Nachricht unter der Annahme, dass genau ein
            Fehler vorgefallen ist.
          </p>
          {mc4A}

          <div className="space"></div>

          <button
            onClick={() => {
              setAnswersA(numberOfTasks);
            }}
          >
            <p>Aufgabe überspringen</p>
          </button>
          <div className="space"></div>

          {answersA >= numberOfTasks && (
            <>
              <p>
                Gegeben sind Nachrichten nach der Übertragung. Bestimmen Sie die
                mögliche ursprüngliche Nachricht unter der Annahme, dass genau
                zwei Fehler vorgefallen sind.
              </p>
              {mc4B}
              <div className="space"></div>
              <button
                onClick={() => {
                  setAnswersB(numberOfTasks);
                }}
              >
                <p>Aufgabe überspringen</p>
              </button>
              <div className="space"></div>
            </>
          )}

          {answersB >= numberOfTasks && (
            <>
              <p>
                Gegeben sind Nachrichten nach der Übertragung. Bestimmen Sie die
                mögliche ursprüngliche Nachricht unter der Annahme, dass genau
                drei Fehler vorgefallen sind.
              </p>
              {mc4C}
              <div className="space"></div>
              <button
                onClick={() => {
                  setAnswersC(numberOfTasks);
                }}
              >
                <p>Aufgabe überspringen</p>
              </button>
              <div className="space"></div>
            </>
          )}
        </div>

        <div className="taskRightScroll">
          <table>
            <tbody>{table}</tbody>
          </table>
        </div>
      </div>

      {answersC >= numberOfTasks && (
        <div className="task">
          <div className="space"></div>
          <YN
            question={
              <p>
                Wenn ein Fehler in der Übertragung auftrit, dann ist der
                erhaltene String nicht in den Codewörter enthalten.
              </p>
            }
            solution={1}
            optionYes={<span>Richtig</span>}
            optionNo={<span>Falsch</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Die Codewörter unterscheiden sich mindestends in 3 Stellen. Ein
                Fehler reicht nicht aus, um das eine Codewort in ein anderes
                umzuwandeln.
              </p>
            }
            callerFunction={() => handleTaskStateD(0)}
          />
        </div>
      )}

      {taskStateD[0] && (
        <div className="task">
          <div className="space"></div>
          <YN
            question={
              <p>
                Wenn ein Fehler in der Übertragung auftrit, dann kann man diesen
                korrigieren.
              </p>
            }
            solution={1}
            optionYes={<span>Richtig</span>}
            optionNo={<span>Falsch</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Das feherhafte Wort unterscheidet sich zu genau einem Codewort
                um eine Stelle. Die anderen Codewörter unterscheiden sich
                mindestends in 2 Stellen zum Fehlerhaften Sting, weil sich die
                Codewörter sich in mindestends in 3 Stellen unterscheiden.
              </p>
            }
            callerFunction={() => handleTaskStateD(1)}
          />
        </div>
      )}

      {taskStateD[1] && (
        <div className="task">
          <div className="space"></div>
          <YN
            question={
              <p>
                Wenn zwei Fehler in der Übertragung auftreten, dann ist der
                erhaltene String nicht in den Codewörter enthalten.
              </p>
            }
            solution={1}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Die Codewörter unterscheiden sich mindestends in 3 Stellen. Zwei
                Fehler reichen nicht aus, um das eine Codewort in ein anderes
                umzuwandeln.
              </p>
            }
            callerFunction={() => handleTaskStateD(2)}
          />
        </div>
      )}

      {taskStateD[2] && (
        <div className="task">
          <div className="space"></div>
          <YN
            question={
              <p>
                Wenn zwei Fehler in der Übertragung auftreten, dann kann man
                diese korrigieren.
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                100000 könnte ein Übertragungsfehler gewesen sein an der ersten
                Stelle bei 000000 oder bei zwei Stellen von 101010. Deswegen
                kann man diesen Fehler nicht korrigieren.
              </p>
            }
            callerFunction={() => handleTaskStateD(3)}
          />
        </div>
      )}

      {taskStateD[3] && (
        <div className="task">
          <div className="space"></div>
          <YN
            question={
              <p>
                Wenn drei Fehler in der Übertragung auftreten, dann ist der
                erhaltene String nicht in den Codewörter enthalten.
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>Z.B. können drei Fehler 101010 zu 000000 umwandeln.</p>
            }
            callerFunction={() => handleTaskStateD(4)}
          />
        </div>
      )}

      {taskStateD[4] && (
        <div className="task">
          <div className="space"></div>
          <YN
            question={
              <p>
                Wenn zwei Fehler in der Übertragung auftreten, dann kann man
                diese korrigieren.
              </p>
            }
            solution={0}
            optionYes={<span>Prüfsumme</span>}
            optionNo={<span>Prüfziffer</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Wenn wir 000000 erhalten, was ein Codewort ist, so gehen wir
                nicht von einem Fehler aus und würden das nicht korrigieren.
              </p>
            }
            callerFunction={() => {}}
          />
        </div>
      )}
    </div>
  );
}

export default Task4;
