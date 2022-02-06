import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";

/* menu component used for scrolling back up */

function ScrollButton() {
  // boolean if the button is visible or not
  const [isVisible, setIsVisible] = useState(false);

  // logic for changing visibility. Only appears if the if-statement is met, by how far we scrolled down.
  const toggleVisibility = () => {
    if (window.pageYOffset > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  //logic for scrolling to top if the button is being clicked on.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // logic needed for changing visibility.
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="arrowTop">
      <FaIcons.FaArrowAltCircleUp
        onClick={scrollToTop}
        className={isVisible ? "opacity-100" : "opacity-0"}
      />
      {isVisible && <h4>back to top</h4>}
    </div>
  );
}

export default ScrollButton;
