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

function TextExercise({
  callerFunction,
  question,
  text,
  solutions,
  textOnCorrect,
  textOnWrong,
}) {
  // value of the input field of the user
  const [value, setValue] = useState("");

  /*
  variable for the task state
  "": not answered yet
  true: correctly answered
  false: answered, but wrong
  */
  const [taskState, setTaskState] = useState("");

  // checks the answer given by the user
  const checkInput = () => {
    // removing whitespace and removing caps
    let temp = value.replace(/\s/g, "");
    temp = temp.toLocaleLowerCase();
    setValue(temp);

    setTaskState(solutions.includes(temp));
    callerFunction();
  };

  return (
    <>
      {question}
      <div className="smallSpace"></div>
      {text}
      <input
        type="text"
        value={value}
        disabled={taskState === true || taskState === false}
        onChange={(event) => setValue(event.currentTarget.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            checkInput();
          }
        }}
      />
      <button
        onClick={checkInput}
        disabled={taskState === true || taskState === false}
      >
        <p>überprüfen</p>
      </button>
      {taskState === false && (
        <>
          <span style={{ color: "red" }}>Falsch</span>
          <div className="smallSpace"></div>
          {textOnWrong}
        </>
      )}
      {taskState === true && (
        <>
          <span style={{ color: "green" }}>Korrekt</span>
          <div className="smallSpace"></div>
          {textOnCorrect}
        </>
      )}
    </>
  );
}

export default TextExercise;
