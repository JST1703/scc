import React, { useState } from "react";

/*
This component displays a Yes or No question,
or an A or B question, where exactly one answer is correct.
*/

/*
question is the Yes or No question text being displayed.

optionYes is the text being displayed for the yes option.

optionNo is the text being displayed for the no option.

textOnWrong is the text being displayed, if the answer of the user is wrong.

textOnCorrect is the text being displayed, if the answer of the user is correct.

solution is either 0 or 1. It is the solution to the Yes or No question.

callerFunction is a function the caller component uses, if this question gets answered.
*/
function YN({
  callerFunction,
  question,
  optionYes,
  optionNo,
  textOnWrong,
  textOnCorrect,
  solution,
}) {
  // value is the state of the Yes or No question logged in by the user, starting with 1.
  const [value, setValue] = useState(1);

  /*
  variable for the task state
  "": not answered yet
  true: correctly answered
  false: answered, but wrong
  */
  const [taskState, setTaskState] = useState("");

  /* logic for checking the user's answer to the solution
  and displaying the rest*/
  const checkResult = () => {
    setTaskState(value === solution);
    callerFunction();
  };

  return (
    <div className="YN">
      <p>{question}</p>
      <div>
        <input
          type="radio"
          checked={value === 1}
          disabled={taskState === true || taskState === false}
          onChange={() => setValue(1)}
        />
        {optionYes}
      </div>
      <div>
        <input
          type="radio"
          checked={value === 0}
          disabled={taskState === true || taskState === false}
          onChange={() => setValue(0)}
        />
        {optionNo}
      </div>
      <button
        onClick={checkResult}
        disabled={taskState === true || taskState === false}
      >
        überprüfen
      </button>
      {taskState === false && (
        <p>
          <span style={{ color: "red" }}>Falsch</span>. {textOnWrong}
        </p>
      )}
      {taskState === true && (
        <p>
          <span style={{ color: "green" }}>Korrekt</span>. {textOnCorrect}
        </p>
      )}
    </div>
  );
}

export default YN;
