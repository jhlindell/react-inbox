import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h2>Welcome to React</h2>
          <Toolbar />
          
      </div>
    );
  }
}

export default App;
