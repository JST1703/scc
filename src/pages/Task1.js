import React from "react";
import ChecksumExample from "../components/ChecksumExample";
import nextTenChecksum from "../functions/nextTenChecksum";

function Task1() {
  return (
    <div className="task1">
      <h1>Aufgabe 1: Prüfsymbole</h1>
      <p>Todo Aufgabenstellung</p>
      <ChecksumExample checksumFunction={nextTenChecksum} />
    </div>
  );
}

export default Task1;
