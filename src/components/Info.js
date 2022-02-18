import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
/*
Component is used to show tips, info or theory that might be of help to the student. 
*/

/*
text is the text that is showing by the info box.
*/
function Info({ text }) {
  // variable used for either showing or hiding the information by the info box
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={isVisible ? "infoBox active" : "infoBox"}>
      <div className="infoIcon" onClick={() => setIsVisible(!isVisible)}>
        <FaIcons.FaInfoCircle />
      </div>
      {text}
    </div>
  );
}

export default Info;
