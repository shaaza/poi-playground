import React, { Component } from 'react';
import Search from './containers/Search/'

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-panel">
        <Search />
        <Search />
      </div>
    );
  }
}

export default App;
