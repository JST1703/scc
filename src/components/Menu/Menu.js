import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MenuData } from './MenuData';
import { IconContext } from 'react-icons';
import './Menu.css';

function Menu() {
    const [sidebar, setSidebar] = useState(false);

    const showSdiebar = () => setSidebar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{color: "#0e0585"}}>
          <div className='navbar'> 
            <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSdiebar}/>
            </Link>
          </div> 
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items' onClick={showSdiebar}>
                  <li className='navbar-toggle'>
                      <Link to='#' className='menu-bars'>
                          <AiIcons.AiOutlineClose/>
                      </Link>
                  </li>
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
