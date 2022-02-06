import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { MenuData } from "./MenuData";
import { IconContext } from "react-icons";
import ScrollButton from "./ScorllButton";
import NextPrevButton from "./NextPrevButton";
import "./Menu.css";

function Menu() {
  // on and off state for either showing the menu is visible or not
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="menuBox">
      {/* Next-, prev- and back to top button */}
      <div className="arrows">
        <ScrollButton />
        <NextPrevButton />
      </div>

      {/* for changing the color of the icons in the menu bar */}
      <IconContext.Provider value={{ color: "#FFFFFF" }}>
        {/* the hamburger sign from the menu */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={() => setIsVisible(!isVisible)} />
          </Link>
        </div>

        {/* 
          Listing the menu items, if isVisible is true.
          the hiding logic is implemented in the Menu.css by setting the position value
          and the attribute "active".
          */}
        <nav className={isVisible ? "nav-menu active" : "nav-menu"}>
          <ul
            className="nav-menu-items"
            onClick={() => setIsVisible(!isVisible)}
          >
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {/* menu items from MenuData.js*/}
            {MenuData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Menu;
