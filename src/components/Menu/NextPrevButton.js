import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { MenuData } from "./MenuData";
import { useNavigate } from "react-router-dom";

/* menu component used for switching between tasks */

function NextPrevButton() {
  const [menuOptions] = useState(() => {
    let sol = [];
    for (let item in MenuData) {
      sol.push(item);
    }
    return sol;
  });

  const [pageNumber, setPageNumber] = useState(0);

  const prev = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const next = () => {
    if (pageNumber < MenuData.length - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  let navigate = useNavigate();
  useEffect(() => {
    let tempLink = "/";
    if (pageNumber !== 0) {
      tempLink += "task" + pageNumber.toString();
    }
    navigate(tempLink);
  }, [pageNumber]);

  useEffect(() => {
    let tempPathName = window.location.pathname;
    let tempPathChar = tempPathName[tempPathName.length - 1];
    if (tempPathChar === "/") {
      setPageNumber(0);
    } else {
      setPageNumber(parseInt(tempPathChar));
    }
  }, [window.location.pathname]);

  return (
    <div className="arrowPN">
      <FaIcons.FaArrowAltCircleLeft className="opacity-100" onClick={prev} />
      <FaIcons.FaArrowAltCircleRight className="opacity-100" onClick={next} />
      <h3>previous | next</h3>
    </div>
  );
}

export default NextPrevButton;
