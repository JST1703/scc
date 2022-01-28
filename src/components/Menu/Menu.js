import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { MenuData } from "./MenuData";
import { IconContext } from "react-icons";
import ScrollButton from "./ScorllButton";
import "./Menu.css";

function Menu() {
  // on and off state for either showing the menu bar or hiding it
  const [sidebar, setSidebar] = useState(false);

  // function to switch the hiding/showing state of the menu bar
  const showSdiebar = () => setSidebar(!sidebar);

  return (
    <>
      <ScrollButton />
      {/* for changing the color of the icons in the menu bar */}
      <IconContext.Provider value={{ color: "#FFFFFF" }}>
        {/* the hamburger sign from the menu */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSdiebar} />
          </Link>
        </div>

        {/* 
          Listing the menu items, if sidebar is true.
          the hiding logic is implemented in the Menu.css by setting the position value
          and the attribute "active".
          */}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSdiebar}>
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
    </>
  );
}

export default Menu;
