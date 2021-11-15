import './App.scss';
import ReadingList from './ReadingList'
import React from 'react';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className="header">
          <h4> Page Mark </h4>
        </div>
      </header>
      <ReadingList />
    </div>
  );  
}

export default App;
