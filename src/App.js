import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
/*globals chrome*/

function App() {
  const [url, setUrl] = useState();
  const urlList = [
    {
      url: 'google.com'
    },
    {
      url: 'google.com'
    },
    {
      url: 'google.com'
    }
  ];

  useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow: true}
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0].url;
      setUrl(url);
    })
  })

  const addURL = () => {
    urlList.push({url});
    console.log(urlList);
  }
 
  return (
    <div className="App">
      <header className="App-header">
        <div class="header">
          <h4>Page Mark</h4>
          <button class="save-button" onClick={addURL}>+</button>
        </div>
      </header>
      <div>
        {urlList.map(person => (<p>{person.url}</p>))}
      </div>
    </div>
  );  
}

export default App;
