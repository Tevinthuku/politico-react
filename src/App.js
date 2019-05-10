import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Signup from "./containers/Auth/Signup";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit src/App.js and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="learn-link"
        >
          Learn React
        </a>
      </header>
      <Signup />
    </div>
  );
}

export default App;
