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
  // value of the input field of the user
  const [value, setValue] = useState("");

  // random generated sequence of numbers and their checksum
  const [data] = useState(sequence);
  const [checksum] = useState(checksumFunction(data));

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

    if (temp === checksum) {
      setTaskState(true);
      onCorrect();
    } else {
      setTaskState(false);
      onWorong();
    }
  };

  return (
    <div className="CE">
      <span>{data}</span>
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
      <button onClick={checkResult} disabled={taskState === true}>
        <p>überprüfen</p>
      </button>
      {taskState === false && <span style={{ color: "red" }}>Falsch</span>}
      {taskState && <span style={{ color: "green" }}>Korrekt</span>}
    </div>
  );
}

export default ChecksumExercise;
