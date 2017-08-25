import React, { Component } from 'react';
import Geocoding from './containers/Geocoding';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {} 
  }

  render() {
    return (
      <div className="container">
       <Geocoding />
      </div>

    );
  }
}

export default App;
