import React from 'react';
import './App.css';
import { BoardPage } from './views/Board/BoardPage';

function App() {
  return (
    <div className="app">
      <header className="app-content">
        <BoardPage />
      </header>
    </div>
  );
}

export default App;
