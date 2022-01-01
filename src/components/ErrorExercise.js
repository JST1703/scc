import React, { useState } from "react";
import randomDigits from "../functions/randomDigits";

/*
This component always goes with the component ChecksumExample.
The ChecksumExample takes any checksum method, i.e. sum of all digits,
and displays a sequence of numbers and their checksum as an example.
The ErrorExercise displays questions in the form of a sequence of
numbers with a checksum. The user must state, if the checksum is
correct or not
*/

/*
checksumFuncition is the chosen method for a checksum.

onWorng and onCorrect are methods of the caller Component. These are used to
reveal certain parts of the Task, i.e. the solution, if to many wrong answers
have been given, or the next subtask, if all answers are correct.
*/
function ErrorExercise({ checksumFunction, onWorong, onCorrect }) {
  // variable for showing if the answer is correct or not
  const [correctState, setCorrectState] = useState("");
  // random generated sequence of numbers and their checksum
  const [data] = useState(randomDigits);
  const checksum = checksumFunction(data);

  // logic for comparing the given answer by the user and the correct answer
  const checkResult = () => {
    if (value.toString() === checksum) {
      setCorrectState(true);
      onCorrect();
    } else {
      setCorrectState(false);
      onWorong();
    }
  };

  return (
    <div>
      <div className="example">
        {data.map(function (digit, index) {
          return <span key={index}>{digit}</span>;
        })}
        <input
          type="number"
          value={value}
          disabled={correctState === true}
          onChange={(event) => setValue(event.currentTarget.valueAsNumber)}
        />
        <button onClick={checkResult} disabled={correctState === true}>
          überprüfen
        </button>
        {correctState === false && (
          <span style={{ color: "red" }}> falsch</span>
        )}
        {correctState && <span style={{ color: "green" }}> korrekt</span>}
      </div>
      <div className="example"></div>
    </div>
  );
}

export default ErrorExercise;
