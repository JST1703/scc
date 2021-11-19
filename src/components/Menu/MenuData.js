import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const MenuData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Task1',
        path: '/task1',
        icon: <FaIcons.FaIceCream/>,
        cName: 'nav-text'
    },
    {
        title: 'Task2',
        path: '/task2',
        icon: <FaIcons.FaJedi/>,
        cName: 'nav-text'
    },
]