import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";

/* menu component used for scrolling back up */

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      {isVisible && <h3>back to top</h3>}
    </div>
  );
}

export default ScrollButton;
