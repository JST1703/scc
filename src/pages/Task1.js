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
      <h1>Aufgabe 1: Pr??fziffer und Fehlererkennung 1</h1>

      <div className="space"></div>

      <div className="task">
        <div className="taskLeft">
          <p>
            <b>1.1)</b> Gegeben sind Zahlenfolgen, bestehend aus den Ziffern 1
            bis 9, und deren{" "}
            <span style={{ color: "red" }}>{"Pr??fziffern"}</span>. Erg??nzen Sie
            anhand der gegebenen Beispielen die fehlenden Pr??fziffern. Die
            L??sung besteht immer aus zwei Ziffern (Bsp. 07 statt 7).
          </p>
          <div className="space"></div>
          {wrongAnswersA >= minWrongAnswers && (
            <Info
              text={
                <p>
                  Die Pr??fziffer ist die Pr??fsumme. Die Pr??fsumme ist die Summe
                  der einzelnen Ziffern der Zahlenfolge.
                </p>
              }
            />
          )}
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

      <div className="space"></div>
      <div className="task">
        <button
          onClick={() => {
            setCorrectAnswersA(numberOfTasksA);
          }}
        >
          <p>Aufgabe ??berspringen</p>
        </button>
      </div>

      {correctAnswersA >= numberOfTasksA && (
        <div className="task">
          <div className="space"></div>
          <div className="taskLeft">
            <p>
              <b>1.2)</b> Gegeben sind Folgen und deren Pr??fziffern. Bestimmen
              Sie diejenigen Folgen, bei denen die Pr??fziffer fehlerhaft ist.
            </p>
          </div>
          <div className="taskRight">
            <MC
              options={mcOptionsTaskB}
              answerKey={mcAKTaskB}
              textOnCorrect={<p></p>}
              textOnWrong={
                <p>
                  Die Pr??fziffer ist gleich der Summe der Ziffern der Folge.
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
            <p>Aufgabe ??berspringen</p>
          </button>
        </div>
      )}

      {taskStateB && (
        <div className="task">
          <div className="space"></div>
          <YN
            question={
              <p>
                <b>1.3)</b> Wenn genau eine Ziffer in der Folge falsch
                ??bertragen worden ist, dann erkennt man das an der Pr??fsumme.
              </p>
            }
            solution={1}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Wenn eine Ziffer in der Folge falsch ??bertragen worden ist, dann
                stimmt die Summe nicht mehr mit der Pr??fziffer ??berein. Das ist
                die Idee der Pr??fsumme.
              </p>
            }
            textOnWrong={
              <p>
                Wenn eine Ziffer in der Folge falsch ??bertragen worden ist, dann
                stimmt die Summe nicht mehr mit der Pr??fziffer ??berein. Das ist
                die Idee der Pr??fsumme.
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
                <b>1.4)</b> Wenn die Pr??fsumme nicht korrekt ist, dann muss die
                Zahlenfolge einen Fehler beinhalten.
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Ein ??bertragungsfehler kann auch in der Pr??fsumme selbst
                auftreten, auch wenn die Zahlenfolge fehlerfrei ??bertragen
                worden ist. Man muss dennoch von einer Fehl??bertragung ausgehen.
              </p>
            }
            textOnWrong={
              <p>
                Ein ??bertragungsfehler kann auch in der Pr??fsumme selbst
                auftreten, auch wenn die Zahlenfolge fehlerfrei ??bertragen
                worden ist. Man muss dennoch von einer Fehl??bertragung ausgehen.
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
                <b>1.5)</b> Tippfehler von Menschen kommen h??ufig vor, z.B. dass
                man zwei Ziffern vertauscht (z.B. 73 statt 37). K??nnen Sie mit
                der Pr??fsumme solche Fehler erkennen?
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Die Pr??fsumme ist die Summe der einzelnen Zahlen. Es spielt
                keine Rolle, in welcher Reihenfolge man die Zahlen addiert (7 +
                3 = 3 + 7). Solche Fehler bleiben deswegen unerkannt.
              </p>
            }
            textOnWrong={
              <p>
                Die Pr??fsumme ist die Summe der einzelnen Zahlen. Es spielt
                keine Rolle, in welcher Reihenfolge man die Zahlen addiert (7 +
                3 = 3 + 7). Solche Fehler bleiben deswegen unerkannt.
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
                <b>1.6)</b> Sollte wegen einer Fehl??bertragung eine Ziffer in
                der Folge fehlerhaft sein, dann k??nnen wir diese fehlerhafte
                Ziffer mit der Pr??fsumme identifizieren.
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Die Pr??fsumme kann nur erkennen, ob ein Fehler in der
                ??bertragung vorgefallen ist, allerdings nicht bei welcher
                Ziffer.
              </p>
            }
            textOnWrong={
              <p>
                Die Pr??fsumme kann nur erkennen, ob ein Fehler in der
                ??bertragung vorgefallen ist, allerdings nicht bei welcher
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
                <b>1.7)</b> Angenommen bei der ??bertragung treten zwei Fehler
                auf, sodass nun 2 Ziffern falsch sind. Erkennt man das mit der
                Pr??fsumme?
              </p>
            }
            solution={0}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Eine der Ziffern k??nnte um den Betrag x h??her sein und die
                andere Ziffer um den gleichen Betrag x tiefer. Die Summe der
                Folge bleibt somit dennoch gleich und damit auch die Pr??fsumme.
                Der Fehler bleibt somit unbemerkt.
              </p>
            }
            textOnWrong={
              <p>
                Eine der Ziffern k??nnte um den Betrag x h??her sein und die
                andere Ziffer um den gleichen Betrag x tiefer. Die Summe der
                Folge bleibt somit dennoch gleich und damit auch die Pr??fsumme.
                Der Fehler bleibt somit unbemerkt. Angenommen die urspr??ngliche
                Zahlenfolge w??re 234 und die Pr??fsumme 09. Zwei Fehler in der
                Folge k??nnte 531 ergeben, wobei dessen Pr??fsumme auch 09 ist.
                Das w??rde man f??lschlicherweise als fehlerfreie ??bertragung
                betrachten.
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
                <b>1.8)</b> Wenn durch ein Fehler in der ??bertragung eine Ziffer
                in der Folge ausgelassen wird, kann man das mit der Pr??fsumme
                erkennen.
              </p>
            }
            solution={1}
            optionYes={<span>Ja</span>}
            optionNo={<span>Nein</span>}
            textOnCorrect={
              <p>
                Die Ziffern liegen zwischen 1 und 9. W??rde eine ausgelassen
                werden, so stimmt die Summe der erhaltenen Folge nicht mit der
                Pr??fziffer ??berein.
              </p>
            }
            textOnWrong={
              <p>
                Die Ziffern liegen zwischen 1 und 9. W??rde eine ausgelassen
                werden, so stimmt die Summe der erhaltenen Folge nicht mit der
                Pr??fziffer ??berein. Sollte 0 auch eine m??gliche Ziffer sein,
                dann haben Sie recht. Die Folgen 24104 und 2414 haben die
                gleiche Pr??fsumme. Das Entfallen der 0 w??rde nicht als
                ??bertragungsfehler aufgefasst werden.
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
