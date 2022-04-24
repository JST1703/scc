import React, { useState } from "react";
import MC from "../components/MC";
import YN from "../components/YN";
import errormaker from "../functions/errormaker";
import distance from "../functions/distance";

/*
Task 5: Given is an encoding. The user is given a few messages with errors. The user must find the original message.

Task A has only one error in the message.

Task B has two errors in the message.

Task C has 3 errors, which allows for multiple solutions.

Task D are some YN Questions about the properties of the given encoding.
*/

function Task5() {
  // Table content
  const words = [
    <span>Hund</span>,
    <span>Mond</span>,
    <span>Pizza</span>,
    <span>Auto</span>,
  ];
  const binaryRep = ["00", "01", "10", "11"];
  const encoding = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0],
  ];

  const numberOfTasks = 3;

  // keeping track of the number of answers given in each task for revealing the next task
  const [answersA, setAnswersA] = useState(0);
  const [answersB, setAnswersB] = useState(0);
  const [answersC, setAnswersC] = useState(0);

  // if true, next task is revealed
  const [taskStateD, setTaskStateD] = useState(Array(6).fill(false));

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

      let key2 = [];
      let show2 = [];
      for (let i = 0; i < 4; ++i) {
        if (distance(seqTemp2, encoding[i]) < 3) {
          key2[i] = true;
          show2.push(<span>{words[i]} </span>);
        } else {
          key2[i] = false;
        }
      }

      let key3 = [];
      let show3 = [];
      for (let i = 0; i < 4; ++i) {
        if (distance(seqTemp3, encoding[i]) <= 3) {
          key3[i] = true;
          show3.push(<span>{words[i]} </span>);
        } else {
          key3[i] = false;
        }
      }

      // gather them all together
      sol.push([seqTemp1.join(""), key1, words[k1]]);
      sol.push([seqTemp2.join(""), key2, show2]);
      sol.push([seqTemp3.join(""), key3, show3]);
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
      <div key={i}>
        <div className="space"></div>
        <p>Erhaltene Nachricht: {element1[0]}</p>
        <div className="smallSpace"></div>
        <MC
          callerFunction={() => setAnswersA(answersA + 1)}
          options={words}
          answerKey={element1[1]}
          textOnWrong={<p>Lösung: {element1[2]}</p>}
          textOnCorrect={<p></p>}
        />
      </div>
    );

    mc4B.push(
      <div key={i + 1}>
        <div className="space"></div>
        <p>Erhaltene Nachricht: {element2[0]}</p>
        <div className="smallSpace"></div>
        <MC
          callerFunction={() => setAnswersB(answersB + 1)}
          options={words}
          answerKey={element2[1]}
          textOnWrong={
            <p>
              Lösung: {element2[2]}- Beachten Sie, dass es bis zu 2 Fehler sein
              können.
            </p>
          }
          textOnCorrect={<p></p>}
        />
      </div>
    );

    mc4C.push(
      <div key={i + 2}>
        <div className="space"></div>
        <p>Erhaltene Nachricht: {element3[0]}</p>
        <div className="smallSpace"></div>
        <MC
          callerFunction={() => setAnswersC(answersC + 1)}
          options={words}
          answerKey={element3[1]}
          textOnWrong={
            <p>
              Lösung: {element3[2]}- Beachten Sie, dass es bis zu 3 Fehler sein
              können.
            </p>
          }
          textOnCorrect={<p></p>}
        />
      </div>
    );
  }

  return (
    <div className="main">
      <h1>Aufgabe 5: Kodierungen und Fehlerkorrektur 2</h1>

      <div className="space"></div>

      <div className="task">
        <div className="taskLeft">
          <p>
            Gegeben ist eine Kodierung von 4 Nachrichten (siehe Tabelle rechts).
            Die Kodierung ordnet jeder Nachricht einen String zu, welcher
            wiederum 1-mal wiederholt und mit einem Prüfbit ergänzt wird.
            Beispielsweise wird {binaryRep[1]} mit
            {" " + binaryRep[1]}
            <span style={{ color: "red" }}>{binaryRep[1]}</span>
            <span style={{ color: "green" }}>{0 + " "}</span> kodiert. Das
            Prüfbit und die ursprüngliche Bitfolge haben zuasammen eine gerade
            Anzahl an Einsen.
          </p>
          <div className="space"></div>
          <p>
            <b>5.1)</b> Gegeben sind Nachrichten nach einer Übertragung.
            Bestimmen Sie die mögliche ursprüngliche Nachricht unter der
            Annahme, dass genau ein Übertragungsfehler vorgefallen ist.
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
                <b>5.2)</b> Gegeben sind Nachrichten nach einer Übertragung.
                Bestimmen Sie die möglichen ursprünglichen Nachrichten unter der
                Annahme, dass bis zu zwei Übertragungsfehler vorgefallen sein
                könnten. Mehrere Antworten sind möglich.
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
                <b>5.3)</b> Gegeben sind Nachrichten nach einer Übertragung.
                Bestimmen Sie die möglichen ursprünglichen Nachrichten unter der
                Annahme, dass bis zu drei Übertragungsfehler vorgefallen sein
                könnten. Mehrere Antworten sind möglich.
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
                <b>5.4)</b> Wenn genau ein Fehler in der Übertragung auftritt,
                dann ist der erhaltene String nicht Teil der Code-Wörter.
              </p>
            }
            solution={1}
            optionYes={<span>Richtig</span>}
            optionNo={<span>Falsch</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Die Code-Wörter unterscheiden sich mindestens in 3 Stellen. Ein
                Fehler reicht nicht aus, um das eine Code-Wort in ein anderes
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
                <b>5.5)</b> Wenn genau ein Fehler in der Übertragung auftrit,
                dann kann man diesen korrigieren.
              </p>
            }
            solution={1}
            optionYes={<span>Richtig</span>}
            optionNo={<span>Falsch</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Das fehlerhafte Wort unterscheidet sich zu genau einem Code-Wort
                in einer Stelle. Die anderen Code-Wörter unterscheiden sich
                mindestens in 2 Stellen zum Fehlerhaften Sting, weil sich die
                Code-Wörter in mindestens 3 Stellen unterscheiden. Damit kann
                man den Fehler eindeutig korrigieren.
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
                <b>5.6)</b> Wenn zwei Fehler in der Übertragung auftreten, dann
                ist der erhaltene String nicht Teil der Code-Wörter.
              </p>
            }
            solution={1}
            optionYes={<span>Richtig</span>}
            optionNo={<span>Falsch</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Die Code-Wörter unterscheiden sich mindestens in 3 Stellen. Zwei
                Fehler reicht nicht aus, um das eine Code-Wort in ein anderes
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
                <b>5.7)</b> Wenn zwei Fehler in der Übertragung auftreten, dann
                kann man diese korrigieren.
              </p>
            }
            solution={0}
            optionYes={<span>Richtig</span>}
            optionNo={<span>Falsch</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Erhält man den String 10000, dann könnte das ein Fehler im Wort
                00000 an der ersten Stelle gewesen sein oder zwei Fehler im Wort
                10101. Man kann sich deswegen bei zwei Fehlern nicht sicher
                sein, was das ursprüngliche Code-Wort war und somit ist keine
                Korrektur möglich.
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
                <b>5.8)</b> Wenn drei Fehler in der Übertragung auftreten, dann
                ist der erhaltene String nicht Teil der Code-Wörter.
              </p>
            }
            solution={0}
            optionYes={<span>Richtig</span>}
            optionNo={<span>Falsch</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>Z. B. können drei Fehler 10101 zu 00000 umwandeln.</p>
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
                <b>5.9)</b> Wenn drei Fehler in der Übertragung auftreten, dann
                kann man diese korrigieren.
              </p>
            }
            solution={0}
            optionYes={<span>Richtig</span>}
            optionNo={<span>Falsch</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Wenn man 00000 erhält, was ein Code-Wort ist, geht man nicht von
                einem Fehler aus und kann deswegen auch nichts korrigieren.
              </p>
            }
            callerFunction={() => handleTaskStateD(5)}
          />
        </div>
      )}

      {taskStateD[5] && (
        <div className="task">
          <div className="space"></div>
          <YN
            question={
              <p>
                <b>5.10)</b> Welche Kodierung ist besser?
              </p>
            }
            solution={0}
            optionYes={<span>Die aus Aufgabe 4</span>}
            optionNo={<span>Die aus Aufgabe 5</span>}
            textOnCorrect={<p></p>}
            textOnWrong={
              <p>
                Diese Kodierung in Aufgabe 5 hat die gleichen Eigenschaften, wie
                diejenige aus Aufgabe 4, nur mit weniger Bits pro Code-Wort.
                Desswegen ist diese etwas besser.
              </p>
            }
            callerFunction={() => {}}
          />
        </div>
      )}
    </div>
  );
}

export default Task5;
