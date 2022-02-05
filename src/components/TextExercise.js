import React, { useState } from "react";

/*
A simple text exercise where the answer is of the form of a small input field from the user
*/

/*
callerFunction is a function used by the calling component after this question has been answered.

question is the question to be solved.

text is the small text next to the input field.

solutions is an array of possible solutions. The input will be altered such that no white space exists,
but also everything in lowercase. If the solution were to be x+y, then the user might still input y+x, which
should still result in a correct answer. Hence, multiple solutions are possible.

textOnCorrect and textOnWrong are displayed depending on the correctness of the user's answer.
*/

function TextExecise({
  callerFunction,
  question,
  text,
  solutions,
  textOnCorrect,
  textOnWrong,
}) {
  const [correctState, setCorrectState] = useState("");

  // variable for input field
  const [value, setValue] = useState("");

  // logic for evaluating input field
  const checkInput = () => {
    let temp = value.replace(/\s/g, "");
    temp = temp.toLocaleLowerCase();
    setValue(temp);

    setCorrectState(solutions.includes(temp));
    callerFunction();
  };

  return (
    <div className="example">
      <p>{question}</p>
      <span>{text}</span>
      <input
        type="text"
        value={value}
        disabled={correctState === true || correctState === false}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <button
        onClick={checkInput}
        disabled={correctState === true || correctState === false}
      >
        überprüfen
      </button>
      {correctState === false && (
        <p>
          <span style={{ color: "red" }}>Falsch</span>. {textOnWrong}.
        </p>
      )}
      {correctState === true && (
        <p>
          <span style={{ color: "green" }}>Korrekt</span>. {textOnCorrect}
        </p>
      )}
    </div>
  );
}

export default TextExecise;
