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
  // value is the state of the Yes or No question
  const [value, setValue] = useState(1);

  // this state is used to see, if the given answer is correct or not.
  const [correct, setCorrect] = useState("");

  /* logic for checking the user's answer to the solution
  and displaying the rest*/
  const checkResult = () => {
    setCorrect(value === solution);
    callerFunction();
  };

  return (
    <div className="YN">
      <p>{question}</p>
      <div>
        <input
          type="radio"
          checked={value === 1}
          disabled={correct === true || correct === false}
          onChange={() => setValue(1)}
        />
        {optionYes}
      </div>
      <div>
        <input
          type="radio"
          checked={value === 0}
          disabled={correct === true || correct === false}
          onChange={() => setValue(0)}
        />
        {optionNo}
      </div>
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

export default YN;
