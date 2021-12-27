import React from "react";
import randomDigits from "../functions/randomDigits";

function ChecksumExample({ checksumFunction }) {
  const data1 = randomDigits();
  const data2 = randomDigits();
  const data3 = randomDigits();

  const checksum1 = checksumFunction(data1);
  const checksum2 = checksumFunction(data2);
  const checksum3 = checksumFunction(data3);

  return (
    <div>
      <div className="example">
        {data1.map(function (digit, index) {
          return <span key={index}>{digit}</span>;
        })}
        <span style={{ color: "red" }}>{checksum1}</span>
      </div>
      <div className="example">
        {data2.map(function (digit, index) {
          return <span key={index}>{digit}</span>;
        })}
        <span style={{ color: "red" }}>{checksum2}</span>
      </div>
      <div className="example">
        {data3.map(function (digit, index) {
          return <span key={index}>{digit}</span>;
        })}
        <span style={{ color: "red" }}>{checksum3}</span>
      </div>
    </div>
  );
}

export default ChecksumExample;
