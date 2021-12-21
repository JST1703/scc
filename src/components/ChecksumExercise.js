import React, { useState } from "react";

function ChecksumExercise({ onWrongAnswer, checksumFn, data }) {
  const checksum = checksumFn(data);

  const [value, setValue] = useState(0);

  const [correctState, setCorrectState] = useState("");

  const checkResult = () => {
    if (value.toString() === checksum) {
      setCorrectState("correct");
    } else {
      setCorrectState("incorrect");
      onWrongAnswer();
    }
  };

  return (
    <div>
      <div>
        {data.map(function (digit, index) {
          return <span key={index}>{digit}</span>;
        })}
        <input
          type="number"
          value={value}
          disabled={correctState === "correct"}
          onChange={(event) => setValue(event.currentTarget.valueAsNumber)}
        />
        <button onClick={checkResult}>check</button>
      </div>

      <div>{correctState === "correct" && "Correct"}</div>
    </div>
  );
}

export default ChecksumExercise;
