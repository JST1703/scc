import React from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Task1 from './components/Pages/Task1';
import Task2 from './components/Pages/Task2';

function App() {
  return (
    <>
    <Router>
      <Menu/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/task1" element={<Task1 />}/>
        <Route path="/task2" element={<Task2 />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
