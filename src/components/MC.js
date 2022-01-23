import React, { useState } from "react";
import arrayFiller from "../functions/arrayFiller";

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
  const [values, setValues] = useState(
    arrayFiller(answerKey.length, () => {
      return false;
    })
  );

  // question in useState, to avoid undesired Behavior
  const [stateQuestion] = useState(question);

  // this state is used to see, if the given answer is correct or not.
  const [correct, setCorrect] = useState("");

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
    setCorrect(temp);
    callerFunction();
  };

  // logic to handle checkbox clicking
  function handleChange(i) {
    let temp = values;
    temp[i] = !temp[i];
    setValues(temp);
  }

  return (
    <div className="MC">
      <p>{stateQuestion}</p>
      {options.map(function (element, index) {
        return (
          <div className="mc">
            <input
              type="checkbox"
              disabled={correct === true || correct === false}
              onChange={() => handleChange(index)}
            />
            <span key={index}>{element}</span>
          </div>
        );
      })}
      <button
        onClick={checkResult}
        disabled={correct === true || correct === false}
      >
        überprüfen
      </button>
      {correct === true && <p>{textOnCorrect}</p>}
      {correct === false && <p>{textOnWrong}</p>}
    </div>
  );
}

export default MC;
