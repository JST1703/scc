import React, { useState } from "react";
import stringToArray from "../functions/srtingToArray";

/*
This component is an exercise, where the user has to type in an input. This is then compared with a given string and a checksum.
A common exercise with this component is to change a given binary string such that the new string still fulfills the checksum.
*/

/*
sequence is the method of generating a sequence. This can either be a binary or an integer sequence.

checksumFuncition is the chosen method for a checksum.

comparer is the method that takes the user's input, the sequence and the checksum function and returns 0 or 1, whether some property is fulfilled or not.

textOnWong and textOnCorrect are the text displayed, if the the user's answer is wrong or right respectively.

callerFunction is a function the caller component uses, if this question gets answered.
*/
function CompareExercise({
  checksumFunction,
  sequence,
  comparer,
  textOnWrong,
  textOnCorrect,
  callerFunction,
}) {
  // value of the input field
  const [value, setValue] = useState("");

  // random generated sequence of numbers and their checksum
  const [data] = useState(sequence);
  const [checksum] = useState(() => {
    return checksumFunction(data);
  });

  /*
  variable for the task state
  "": not answered yet
  true: correctly answered
  false: answered, but wrong
  */
  const [taskState, setTaskState] = useState("");

  // logic for comparing the given answer by the user and the correct answer
  const checkResult = () => {
    // stripping away all white spaces
    let temp = value.replace(/\s/g, "");

    setValue(temp);

    // must be an array
    let data2 = stringToArray(temp);

    if (comparer(data, data2, checksum, checksumFunction(data2))) {
      setTaskState(true);
    } else {
      setTaskState(false);
    }

    callerFunction();
  };

  return (
    <>
      <span>{data}</span>
      <span style={{ color: "red" }}>{checksum}</span>
      <div className="smallSpace"></div>
      <input
        type="text"
        value={value}
        disabled={taskState === true}
        onChange={(event) => setValue(event.currentTarget.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            checkResult();
          }
        }}
      />
      <div className="smallSpace"></div>
      <button onClick={checkResult} disabled={taskState === true}>
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

export default CompareExercise;
