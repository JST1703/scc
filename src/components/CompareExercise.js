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
  // random generated sequence of numbers and their checksum
  const [data] = useState(sequence);
  const checksum = checksumFunction(data);

  // this state is used to see, if the given answer is correct or not.
  const [correct, setCorrect] = useState("");

  // value of the input field
  const [value, setValue] = useState("");

  // logic for comparing the given answer by the user and the correct answer
  const checkResult = () => {
    let data2 = stringToArray(value);

    console.log(data2);

    if (comparer(data, data2, checksum, checksumFunction(data2))) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }

    callerFunction();
  };

  return (
    <div>
      <div className="example">
        {data.map(function (digit, index) {
          return <span key={index}>{digit}</span>;
        })}
        <span style={{ color: "red" }}>{checksum}</span>
      </div>

      <div className="example">
        <input
          type="text"
          value={value}
          disabled={correct === true || correct === false}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <button
          onClick={checkResult}
          disabled={correct === true || correct === false}
        >
          überprüfen
        </button>

        {correct === true && <p>{textOnCorrect}</p>}
        {correct === false && <p>{textOnWrong}</p>}
      </div>
    </div>
  );
}

export default CompareExercise;
