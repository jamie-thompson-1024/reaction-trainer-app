import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GameDetails from './GameDetails';
import GameList from './GameList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" children={GameList} />
          <Route path="/game" children={GameDetails} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
