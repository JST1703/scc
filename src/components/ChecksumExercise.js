import React, { useState } from "react";
/*
This component always goes with the component ChecksumExample.
The ChecksumExample takes any checksum method, i.e. sum of all digits,
and displays a sequence of numbers and their checksum as an example.
The ChecksumExercise displays questions in the form of a sequence of
numbers, where one needs to calculate the checksum according to the examples.
*/

/*
checksumFuncition is the chosen method for a checksum.

sequence is the string of numbers being used. This can either be a binary string or a integer string.

onWorng and onCorrect are methods of the caller Component. These are used to
reveal certain parts of the Task, i.e. the solution, if to many wrong answers
have been given, or the next subtask, if all answers are correct.
*/
function ChecksumExercise({ checksumFunction, onWorong, onCorrect, sequence }) {
  // value of the input field
  const [value, setValue] = useState("");
  // variable for showing if the answer is correct or not
  const [correctState, setCorrectState] = useState("");
  // random generated sequence of numbers and their checksum
  const [data] = useState(sequence);
  const [checksum] = useState(() => {
    return checksumFunction(data);
  });

  // logic for comparing the given answer by the user and the correct answer
  const checkResult = () => {
    if (value === checksum) {
      setCorrectState(true);
      onCorrect();
    } else {
      setCorrectState(false);
      onWorong();
    }
  };

  return (
    <div className="example">
      {data.map(function (digit, index) {
        return <span key={index}>{digit}</span>;
      })}
      <input
        type="text"
        value={value}
        disabled={correctState === true}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <button onClick={checkResult} disabled={correctState === true}>
        überprüfen
      </button>
      {correctState === false && <span style={{ color: "red" }}> Falsch</span>}
      {correctState && <span style={{ color: "green" }}> Korrekt</span>}
    </div>
  );
}

export default ChecksumExercise;
