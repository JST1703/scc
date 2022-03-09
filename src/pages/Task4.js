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
      let k1 = Math.floor(Math.random() * 4);
      let k2 = Math.floor(Math.random() * 4);
      let k3 = Math.floor(Math.random() * 4);

      // could be 4
      if (k1 === 4) k1 = 3;
      if (k2 === 4) k2 = 3;
      if (k3 === 4) k3 = 3;

      // the false code word for the mc part being displayed
      let seqTemp1 = [...encoding[k1]];
      let seqTemp2 = [...encoding[k2]];
      let seqTemp3 = [...encoding[k3]];

      // creating some errors
      errormaker(seqTemp1, 1);
      errormaker(seqTemp2, 2);
      errormaker(seqTemp3, 3);

      // answer keys
      let key1 = Array(4).fill(false);
      key1[k1] = true;
      let key2 = [...Array(4)].map((e, i) => {
        return distance(seqTemp2, encoding[i]) === 2;
      });
      let key3 = [...Array(4)].map((e, i) => {
        return distance(seqTemp3, encoding[i]) === 3;
      });

      // gather them all together
      sol.push([k1, seqTemp1.join(""), key1]);
      sol.push([k2, seqTemp2.join(""), key2]);
      sol.push([k3, seqTemp3.join(""), key3]);
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
        <p>Nachricht: {element1[1]}</p>
        <div className="smallSpace"></div>
        <MC
          key={i}
          callerFunction={() => setAnswersA(answersA + 1)}
          options={words}
          answerKey={element1[2]}
          textOnWrong={<p>Die richtige Antwort lautet {element1[0]}.</p>}
          textOnCorrect={<p></p>}
        />
      </>
    );

    mc4B.push(
      <>
        <div className="space"></div>
        <p>Nachricht: {element2[1]}</p>
        <div className="smallSpace"></div>
        <MC
          key={i + 1}
          callerFunction={() => setAnswersB(answersB + 1)}
          options={words}
          answerKey={element2[2]}
          textOnWrong={<p>Die richtige Antwort lautet {element2[0]}.</p>}
          textOnCorrect={<p></p>}
        />
      </>
    );

    mc4C.push(
      <>
        <div className="space"></div>
        <p>Nachricht: {element3[1]}</p>
        <div className="smallSpace"></div>
        <MC
          key={i + 2}
          callerFunction={() => setAnswersC(answersC + 1)}
          options={words}
          answerKey={element3[2]}
          textOnWrong={<p>Die richtige Antwort lautet {element3[0]}.</p>}
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
            Gegeben sind 4 Wörter, welche wir einer binären Darstellung
            zuordnen. Weiter kodieren wir die binären Darstellungen, in dem wir
            diese jeweils 3-mal wiederholen. Beispielsweise wird {binaryRep[1]}{" "}
            mit
            {" " + binaryRep[1]}
            <span style={{ color: "red" }}>{binaryRep[1]}</span>
            <span style={{ color: "green" }}>{binaryRep[1] + " "}</span>{" "}
            kodiert.
          </p>
          <div className="space"></div>
          <p>TOD Task A</p>
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
              <p>TOD Task B</p>
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
              <p>TOD Task C</p>
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
                Wenn die Prüfziffer nicht korrekt ist, dann muss die Zahlenfolge
                einen Fehler beinhalten.
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Ein Übertragungsfehler kann auch in der Prüfziffer selbst
                auftreten, auch wenn die Zahlenfolge fehlerfrei übertragen
                worden ist. Man muss dennoch von einer Fehlübertragung ausgehen.
              </p>
            }
            textOnWrong={
              <p>
                Ein Übertragungsfehler kann auch in der Prüfziffer selbst
                auftreten, auch wenn die Zahlenfolge fehlerfrei übertragen
                worden ist. Man muss dennoch von einer Fehlübertragung ausgehen.
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
                Häufig geschehen auch Tippfehler beim Mensch, z.B. dass man zwei
                Ziffern vertauscht (z.B. 73 statt 37). Kann die Prüfsu,e solche
                fehler erkennen?
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Die Summe der folge bleibt gleich. Es spielt keine Rolle, in
                welcher Reihenfolge man die Zahlen addiert (7 + 3 = 3 + 7).
                Solche Fehler bleiben desswegen unerkannt.
              </p>
            }
            textOnWrong={
              <p>
                Die Summe der folge bleibt gleich. Es spielt keine Rolle, in
                welcher Reihenfolge man die Zahlen addiert (7 + 3 = 3 + 7).
                Solche Fehler bleiben desswegen unerkannt.
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
                Sollte eine Ziffer wegen einer Fehlübertragung falsch sein, dann
                erkennen wir mit der Prüfziffer, welche Ziffer das ist.
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Die Prüfziffer kann nur erkennen, ob ein Fehler in der
                Übertragung vorgefallen ist, allerdings nicht bei welcher
                Ziffer.
              </p>
            }
            textOnWrong={
              <p>
                Die Prüfziffer kann nur erkennen, ob ein Fehler in der
                Übertragung vorgefallen ist, allerdings nicht bei welcher
                Ziffer.
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
                Angenommen bei der Übertragung treten zwei Fehler auf, so dass
                nun 2 Ziffern falsch sind. Erkennt man das mit der Prüfziffer?
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Eine Ziffer könnte um den Betrag x höher sein und eine andere
                Ziffer um den gleichen Betrag x tiefer. Die Summe der Ziffern
                bleibt dennoch gleich, und somit auch die Prüfziffer.
              </p>
            }
            textOnWrong={
              <p>
                Eine Ziffer könnte um den Betrag x höher sein und eine andere
                Ziffer um den gleichen Betrag x tiefer. Die Summe der Ziffern
                bleibt dennoch gleich, und somit auch die Prüfziffer. Angenommen
                die ursprüungliche Zahlenfolge wäre 142 und die Prüfziffer 3.
                Zwei Fehler in der Folge könnte uns 232 geben, wobei dessen
                Prüfziffer auch 3 ist. Das würden wir fälschlicherweise als
                fehlerfreie Übertragung betrachten.
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
                Wenn durch ein Fehler in der Übertragung eine Ziffer in der
                Folge ausgelassen wird, kann man das mit der Prüfziffer
                erkennen?
              </p>
            }
            solution={1}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Die Ziffern liegen zwischen 1 und 9. Würde eine ausgelassen
                werden, so stimmt die Summe der erhaltenen Folge nicht mit der
                Prüfziffer überein.
              </p>
            }
            textOnWrong={
              <p>
                Die Ziffern liegen zwischen 1 und 9. Würde eine ausgelassen
                werden, so stimmt die Summe der erhaltenen Folge nicht mit der
                Prüfziffer überein. Sollte 0 auch eine mögliche Ziffer sein,
                dann haben Sie recht. Die Folgen 24104 und 2414 haben die
                gleiche Prüfziffer. Das Entfallen der 0 würde nicht als
                Übertragungsfehler aufgefasst werden.
              </p>
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
              <p>Welche der beiden Methoden zur Fehlererkennung ist besser?</p>
            }
            solution={0}
            optionYes={<span>Prüfsumme</span>}
            optionNo={<span>Prüfziffer</span>}
            textOnCorrect={
              <p>
                Beide Methoden haben die gleichen Eigenschaften. Sie
                unterscheiden sich nur in der Länge.
              </p>
            }
            textOnWrong={
              <p>
                Beide Methoden haben die gleichen Eigenschaften. Sie
                unterscheiden sich nur in der Länge. Die Prüfziffer ist besser,
                da diese, egal wie lange die Zahlenfolge ist, immer genau eine
                Ziffer gross ist. Die Prüfsumme kann, je nach Länge der
                Zahlenfolge, beliebig lang werden. Das benötigt mehr
                Speicherplatz gegenüber der Prüfziffer.
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
