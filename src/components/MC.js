import React, { useState } from "react";
/*
This component displays a multiple choice question.
*/

/*
question is the mc question text being displayed.

options are the possible answers.

answerKey is the solution givin in an array of booleans. 
answerKey[i] === true if and only if option i is correct.

textOnWrong is the text being displayed, if the answer of the user is wrong.

textOnCorrect is the text being displayed, if the answer of the user is correct.

callerFunction is a function the caller component uses, if this question gets answered.
*/
function MC({
  callerFunction,
  question,
  options,
  answerKey,
  textOnWrong,
  textOnCorrect,
}) {
  // values are the state of the Yes or No question logged by the user
  const [values, setValues] = useState(Array(answerKey.length).fill(false));

  // question in useState, to avoid undesired Behavior
  const [statedQuestion] = useState(question);

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
    let temp = true;
    for (let i = 0; i < answerKey.length; ++i) {
      if (!temp) {
        break;
      }
      temp = answerKey[i] === values[i];
    }
    setTaskState(temp);
    callerFunction();
  };

  // logic to handle checkbox clicking
  const handleValues = (i) => {
    let temp = values;
    temp[i] = !temp[i];
    setValues(temp);
  };

  return (
    <div className="MC">
      <p>{statedQuestion}</p>
      {options.map(function (element, index) {
        return (
          <div className="mc" key={index}>
            <input
              type="checkbox"
              disabled={taskState === true || taskState === false}
              onChange={() => handleValues(index)}
            />
            <span key={index}>{element}</span>
          </div>
        );
      })}
      <button
        onClick={checkResult}
        disabled={taskState === true || taskState === false}
      >
        überprüfen
      </button>
      {taskState === false && (
        <p>
          <span style={{ color: "red" }}>Falsch</span>. {textOnWrong}.
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

export default MC;
