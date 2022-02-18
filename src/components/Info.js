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
    <div className="infobox">
      <FaIcons.FaInfoCircle onClick={() => setIsVisible(!isVisible)} />
      {isVisible && text}
    </div>
  );
}

export default Info;
