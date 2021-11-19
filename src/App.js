import React from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Menu/>
      <Routes>
        <Route path='/' />
      </Routes>
    </Router>
    </>
  );
}

export default App;
