import React, { useState } from "react";
import randomDigits from "../functions/randomDigits";

function ChecksumExercise({ checksumFunction, onWorong, onCorrect }) {
  const [value, setValue] = useState(0);
  const [correctState, setCorrectState] = useState("");
  const [data] = useState(randomDigits);
  const checksum = checksumFunction(data);

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

export default ChecksumExercise;
