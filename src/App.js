import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';  
import MainBar from './MainBar';
import BottomBar from './BottomBar';

function App() {
  return (
    <div className = "App">
      <Header />
      <MainBar />
      <BottomBar />
    </div>
  );
}

export default App;
