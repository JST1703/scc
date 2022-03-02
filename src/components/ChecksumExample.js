import React, { useState } from "react";
/*
This component always goes with the component ChecksumExercise.
The ChecksumExample takes any checksum method, i.e. sum of all digits,
and displays a sequence of numbers and their checksum as an example.
The ChecksumExercise displays questions in the form of a sequence of
numbers, where one needs to calculate the checksum according to the examples.
*/

/*
checksumFuncition is the chosen method for a checksum.

sequence is the string of numbers being used. This can either be a binary string or a integer string.
*/
function ChecksumExample({ checksumFunction, sequence }) {
  // random generated sequence of numbers and their checksum
  const [data] = useState(sequence);
  const [checksum] = useState(() => {
    return checksumFunction(data);
  });

  return (
    <div>
      <span>{data}</span>
      <span style={{ color: "red" }}>{checksum}</span>
    </div>
  );
}

export default ChecksumExample;
