import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { MenuData } from "./MenuData";
import { useNavigate } from "react-router-dom";

/*
menu component used for switching between tasks
it is a simple prev and next button.
*/

function NextPrevButton() {
  // the page number X of the application, corresponding with the path name /taskX
  const [pageNumber, setPageNumber] = useState(0);

  // logic for going to previous page
  const prevPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  // logic for going to next page
  const nextPage = () => {
    if (pageNumber < MenuData.length - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  // if the page number changes, then so must the link of the window
  let navigate = useNavigate();
  useEffect(() => {
    let tempLink = "/";
    if (pageNumber !== 0) {
      tempLink += "task" + pageNumber.toString();
    }
    navigate(tempLink);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pageNumber]);

  /*
  if we use the scroll down menu to jump to another page, then the page number here must also change to that
  we simply extract the last digits of the path name, which is always a number.
  */
  useEffect(() => {
    let tempPathName = window.location.pathname;
    let tempPathChar1 = tempPathName[tempPathName.length - 1];

    // this is the case of the home page with its path name only being "/"
    if (tempPathChar1 === "/") {
      setPageNumber(0);
    } else {
      /* 
    either the path name has a two digit number (else case) or a single digit number
    (if case). In the later case, the second last character must be a k. This logic here only
    works, as long as the naming schema fot path only has two digit numbers.
    */
      let tempPathChar2 = tempPathName[tempPathName.length - 2];
      if (tempPathChar2 === "k") {
        setPageNumber(parseInt(tempPathChar1));
      } else {
        setPageNumber(parseInt(tempPathChar2 + tempPathChar1));
      }
    }
  }, [window.location.pathname]);

  return (
    <div className="arrowPN">
      <FaIcons.FaArrowAltCircleLeft
        className="opacity-100"
        onClick={prevPage}
      />
      <FaIcons.FaArrowAltCircleRight
        className="opacity-100"
        onClick={nextPage}
      />
      <h4>previous | next</h4>
    </div>
  );
}

export default NextPrevButton;
