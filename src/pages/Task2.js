import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import MC from "../components/MC";
import YN from "../components/YN";
import randomDigits from "../functions/randomDigits";
import nextTenChecksum from "../functions/nextTenChecksum";
import errormaker from "../functions/errormaker";
import Info from "../components/Info";

/*
Task 2: Different checksum

Subtask A: Given some examples of a checksum method,
calculate the checksum of other examples.

Subtask B: Given some number sequences and some checksums,
that can be wrong, the user must identify the wrong ones.

Subtask C: Some yes and no questions about the properties
of the given checksum.
*/

function Task2() {
  // number of examples displayed in the exercise
  const numOfExamples = 5;

  // number of wrong answers, before solution is revealed
  const minWrongAnswers = 3;

  // number of questions for subtasks to solve
  const numberOfTasksA = 3;
  const numberOfTasksB = 5;

  /* 
  Keeping track of number of correct solutions or wrong answers
  for subtask A. If correctAnswersA === numberOfTasks, then
  subtask A is solved and the next subtask is revealed.
  If wrongAnswersA === minWrongAnswers, then solution for subtask
  A is revealed.
  */
  const [wrongAnswersA, setWrongAnswersA] = useState(0);
  const [correctAnswersA, setCorrectAnswersA] = useState(0);

  // if answeredB === true, then task C is revealed.
  const [taskStateB, setTaskStateB] = useState(false);

  // mc questions and answer keys for task B
  const [BTemp] = useState(
    Array.from({ length: numberOfTasksB }, () => {
      let seq1 = randomDigits();
      let cs1 = nextTenChecksum(seq1);
      errormaker(seq1, 0);
      let cs2 = nextTenChecksum(seq1);
      return [seq1.join(""), cs1, cs1 !== cs2];
    })
  );

  let mcOptionsTaskB = [];
  let mcAKTaskB = [];

  for (let i = 0; i < numberOfTasksB; ++i) {
    let elemet = BTemp[i];
    mcOptionsTaskB[i] = (
      <>
        <span>{elemet[0]}</span>
        <span style={{ color: "red" }}>{elemet[1]}</span>
      </>
    );
    mcAKTaskB[i] = elemet[2];
  }

  // if true, next task is revealed
  const [taskStateC, setTaskStateC] = useState(Array(6).fill(false));

  // revealing next part of task C
  const handleTaskStateC = (index) => {
    let temp = [...taskStateC];
    temp[index] = true;
    setTaskStateC(temp);
  };

  return (
    <div className="main">
      <h1>Aufgabe 2: Prüfziffer und Fehlererkennung 2</h1>

      <div className="space"></div>

      <div className="task">
        <div className="taskLeft">
          <p>
            Gegeben sind Zahlenfolgen, bestehend aus den Ziffern 1 bis 9, und
            deren <span style={{ color: "red" }}>{"Prüfziffern"}</span>. Egänzen
            Sie anhand der gegebenen Beipielen die fehlenden Prüfziffern.
          </p>
        </div>
        <div className="taskRight">
          {[...Array(numOfExamples)].map((e, i) => (
            <ChecksumExample
              key={i}
              checksumFunction={nextTenChecksum}
              sequence={randomDigits}
            />
          ))}
          <div className="space"></div>
          {[...Array(numberOfTasksA)].map((e, i) => (
            <ChecksumExercise
              key={i}
              checksumFunction={nextTenChecksum}
              sequence={randomDigits}
              onWorong={() => setWrongAnswersA(wrongAnswersA + 1)}
              onCorrect={() => setCorrectAnswersA(correctAnswersA + 1)}
            />
          ))}
        </div>
      </div>

      {wrongAnswersA >= minWrongAnswers && (
        <div className="task">
          <div className="space"></div>
          <Info
            text={
              <p>
                Die Prüfziffer ergänzt die Summe der Zahlenfolge auf den
                nächsten 10er. Betraägt die Summe der Folge beispielsweise 67,
                so ist die Prüfziffer 3, denn 67 + 3 = 70.
              </p>
            }
          />
        </div>
      )}

      <div className="space"></div>
      <div className="task">
        <button
          onClick={() => {
            setCorrectAnswersA(numberOfTasksA);
          }}
        >
          <p>Aufgabe überspringen</p>
        </button>
      </div>

      {correctAnswersA >= numberOfTasksA && (
        <div className="task">
          <div className="space"></div>
          <div className="taskLeft">
            <p>
              Gegeben sind Folgen und deren Prüfziffern. Bestimmen sie
              diejenigen Folgen, bei denen die Prüfziffer fehlerhaft ist.
            </p>
          </div>
          <div className="taskRight">
            <MC
              options={mcOptionsTaskB}
              answerKey={mcAKTaskB}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Die Prüfziffer ergänzt die Summe der Zahlenfolge auf den
                  nächsten 10er.
                </p>
              }
              callerFunction={() => {
                setTaskStateB(true);
              }}
            />
          </div>
          <button
            onClick={() => {
              setTaskStateB(true);
            }}
          >
            <p>Aufgabe überspringen</p>
          </button>
        </div>
      )}

      {taskStateB && (
        <div className="task">
          <div className="space"></div>
          <YN
            question={
              <p>
                Wenn genau eine Ziffer in der Folge falsch übertragen worden
                ist, dann erkennt man das an der Prüfziffer.
              </p>
            }
            solution={1}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Wenn eine Ziffer in der Folge falsch übertragen worden ist, dann
                ist die Summe der Folge anders. Somit ergänzt die Prüfiffer die
                Summe nicht mehr auf den nächsten Zehner.
              </p>
            }
            textOnWrong={
              <p>
                Wenn eine Ziffer in der Folge falsch übertragen worden ist, dann
                ist die Summe der Folge anders. Somit ergänzt die Prüfziffer die
                Summe nicht mehr auf den nächsten Zehner.
              </p>
            }
            callerFunction={() => handleTaskStateC(0)}
          />
        </div>
      )}

      {taskStateC[0] && (
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
            callerFunction={() => handleTaskStateC(1)}
          />
        </div>
      )}

      {taskStateC[1] && (
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
            callerFunction={() => handleTaskStateC(2)}
          />
        </div>
      )}

      {taskStateC[2] && (
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
            callerFunction={() => handleTaskStateC(3)}
          />
        </div>
      )}

      {taskStateC[3] && (
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
            callerFunction={() => handleTaskStateC(4)}
          />
        </div>
      )}

      {taskStateC[4] && (
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
            callerFunction={() => handleTaskStateC(5)}
          />
        </div>
      )}

      {taskStateC[5] && (
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
            callerFunction={() => handleTaskStateC(5)}
          />
        </div>
      )}
    </div>
  );
}

export default Task2;
