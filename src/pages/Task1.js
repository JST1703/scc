import React, { useState } from "react";
import ChecksumExample from "../components/ChecksumExample";
import ChecksumExercise from "../components/ChecksumExercise";
import MC from "../components/MC";
import YN from "../components/YN";
import randomDigits from "../functions/randomDigits";
import sumChecksum from "../functions/sumChecksum";
import errormaker from "../functions/errormaker";
import Info from "../components/Info";

/*
Task 1: Checksums

Subtask A: Given some examples of a checksum method,
calculate the checksum of other examples.

Subtask B: Given some number sequences and some checksums,
that can be wrong, the user must identify the wrong ones.

Subtask C: Some yes and no questions about the properties
of the given checksum.
*/

function Task1() {
  // number of examples displayed in the exercise
  const numOfExamples = 3;

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

  // if taskStateB === true, then task C is revealed.
  const [taskStateB, setTaskStateB] = useState(false);

  // mc questions and answer keys for task B
  const [BTemp] = useState(
    Array.from({ length: numberOfTasksB }, () => {
      let seq1 = randomDigits();
      let cs1 = sumChecksum(seq1);
      errormaker(seq1, 0);
      let cs2 = sumChecksum(seq1);
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
  const [taskStateC, setTaskStateC] = useState(Array(5).fill(false));

  // revealing next part of task C
  const handleTaskStateC = (index) => {
    let temp = [...taskStateC];
    temp[index] = true;
    setTaskStateC(temp);
  };

  return (
    <div className="main">
      <h1>Aufgabe 1: Prüfziffer und Fehlererkennung 1</h1>

      <div className="space"></div>

      <div className="task">
        <div className="taskLeft">
          <p>
            Gegeben sind Zahlenfolgen, bestehend aus den Ziffern 1 bis 9, und
            deren <span style={{ color: "red" }}>{"Prüfziffern "}</span>.
            Egänzen Sie anhand der gegebenen Beipielen die fehlenden
            Prüfziffern. Die Lösung besteht immer aus zwei Ziffern (bsp. 09
            statt 9).
          </p>
        </div>
        <div className="taskRight">
          {[...Array(numOfExamples)].map((e, i) => (
            <ChecksumExample
              key={i}
              checksumFunction={sumChecksum}
              sequence={randomDigits}
            />
          ))}
          <div className="space"></div>
          {[...Array(numberOfTasksA)].map((e, i) => (
            <ChecksumExercise
              key={i}
              checksumFunction={sumChecksum}
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
                Eine Methode um die Prüfziffer zu bestimmen, ist es die Summe
                der Folge zu Bilden.
              </p>
            }
          />
        </div>
      )}

      <div className="space"></div>
      <div className="task">
        <button
          onClick={() => {
            setCorrectAnswersA(3);
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
                  Die Prüfziffer ist gleich der Summe der Ziffern der Folge.
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
                stimmt die Summe nicht mehr mit der Prüfziffer überein. Das ist
                die Idee der Prüfziffer.
              </p>
            }
            textOnWrong={
              <p>
                Wenn eine Ziffer in der Folge falsch übertragen worden ist, dann
                stimmt die Summe nicht mehr mit der Prüfziffer überein. Das ist
                die Idee der Prüfziffer.
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
                Die Prüfsumme ist die Summe der einzelnen Zahlen. Es spielt
                keine Rolle, in welcher Reihenfolge man die Zahlen addiert (7 +
                3 = 3 + 7). Solche Fehler bleiben desswegen unerkannt.
              </p>
            }
            textOnWrong={
              <p>
                Die Prüfsumme ist die Summe der einzelnen Zahlen. Es spielt
                keine Rolle, in welcher Reihenfolge man die Zahlen addiert (7 +
                3 = 3 + 7). Solche Fehler bleiben desswegen unerkannt.
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
                erkennen wir mit der Prüfsumme, welche Ziffer das ist.
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Die Prüfsumme kann nur erkennen, ob ein Fehler in der
                Übertragung vorgefallen ist, allerdings nicht bei welcher
                Ziffer.
              </p>
            }
            textOnWrong={
              <p>
                Die Prüfsumme kann nur erkennen, ob ein Fehler in der
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
                nun 2 Ziffern falsch sind. Erkennt man das mit der Prüfsumme?
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Eine Ziffer könnte um den Betrag x höher sein und eine andere
                Ziffer um den gleichen Betrag x tiefer. Die Summe der Ziffern
                bleibt dennoch gleich, was gleich der Prüfziffer ist.
              </p>
            }
            textOnWrong={
              <p>
                Eine Ziffer könnte um den Betrag x höher sein und eine andere
                Ziffer um den gleichen Betrag x tiefer. Die Summe der Ziffern
                bleibt dennoch gleich, was gleich der Prüfziffer ist. Angenommen
                die ursprüungliche Zahlenfolge wäre 234 und die Prüfsumme 09.
                Zwei Fehler in der Folge könnte uns 531 geben, wobei dessen
                Prüfsumme auch 09 ist. Das würden wir fälschlicherweise als
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
                gleiche Prüfsumme. Das Entfallen der 0 würde nicht als
                Übertragungsfehler aufgefasst werden.
              </p>
            }
            callerFunction={() => {}}
          />
        </div>
      )}
    </div>
  );
}

export default Task1;
