import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { MenuData } from './MenuData';
import './Menu.css';

function Menu() {
    const [sidebar, setSidebar] = useState(false);

    const showSdiebar = () => setSidebar(!sidebar);

    return (
        <>
          <div clasName="menu"> 
            <Link to="#" clasName='menu-bars'>
                <FaIcons.FaBars/>
            </Link>
          </div> 
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className='nav-menu-items'>
                  <li className="navbar-toggle">
                      <Link to="#" className='menu-bars'>
                          <AiIcons.AiOutlineClose/>
                      </Link>
                  </li>
                  {MenuData.map((item, index) => {
                      return (
                          <li key={index} className={item.cName}>
                              <Link to={item.path}>
                                  {item.icon}
                                  <span>{item.title}</span>
                              </Link> 
                          </li>
                      )
                  })}
              </ul>
          </nav>
        </>
    )
}

export default Menu;
