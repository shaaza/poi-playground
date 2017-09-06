import React, { Component } from 'react';
import Geocoding from './containers/Geocoding';
import Navbar from './components/Navbar';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: "Autocomplete",
      navButtons: [
        {label: "Autocomplete", onClick: () => { this.setState({ active: "Autocomplete"}) }},
        {label: "Full Search", onClick: () => { this.setState({ active: "Full Search"}) }},
        {label: "Reverse Geocode", onClick: () => { this.setState({ active: "Reverse Geocode"}) }}
      ]
    } 
  }

  handleClearGMapsKeyButtonClick = (event) => {
    localStorage.removeItem('gmapsKey');
    window.location.reload();
  }

  renderBody = (activeTab) => {
    switch (activeTab) {
      case "Autocomplete":
        return (<Geocoding />)
      case "Full Search":
        return (<h1>Full text search</h1>)
      case "Reverse Geocode":
        return (<h1>Reverse Geocode</h1>)
      default:
        return (<div></div>)
    }
  }
  render() {
    return (
      <div className="container">
       <Navbar
        active={this.state.active}
        buttons={this.state.navButtons}
        onClickClearGMapsKey={this.handleClearGMapsKeyButtonClick}
       />
       {this.renderBody(this.state.active)}
      </div>

    );
  }
}

export default App;