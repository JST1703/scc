import React, { useState } from "react";
import randomDigits from "../functions/randomDigits";

/*
This component always goes with the component ChecksumExercise.
The ChecksumExample takes any checksum method, i.e. sum of all digits,
and displays a sequence of numbers and their checksum as an example.
The ChecksumExercise displays questions in the form of a sequence of
numbers, where one needs to calculate the checksum according to the examples.
*/

/*
checksumFuncition is the chosen method for a checksum.
*/
function ChecksumExample({ checksumFunction }) {
  // random generated sequence of numbers and their checksum
  const [data] = useState(randomDigits);
  const checksum = checksumFunction(data);

  return (
    <div>
      <div className="example">
        {data.map(function (digit, index) {
          return <span key={index}>{digit}</span>;
        })}
        <span style={{ color: "red" }}>{checksum}</span>
      </div>
    </div>
  );
}

export default ChecksumExample;
