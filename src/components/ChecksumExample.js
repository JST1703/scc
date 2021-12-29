import React, { useState } from "react";
import randomDigits from "../functions/randomDigits";

function ChecksumExample({ checksumFunction }) {
  const [data] = useState(randomDigits);
  const checksum = checksumFunction(data);

  return (
    <div>
      <div className="example">
        {data.map(function (digit, index) {
          return <span key={index}>{digit}</span>;
        })}
        <span style={{ color: "red" }}>{" " + checksum}</span>
      </div>
    </div>
  );
}

export default ChecksumExample;
