import React, { Component } from 'react';
import Search from './containers/Search/';
import SearchQuery from './components/SearchQuery/';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      latLng: "-6.473381300000001,106.8307777",
      radius: "100000",
      limit: "5",
      shouldSubmitForm: false,
      resultsReceived: { foursquare: false, google: false }
    } 
  }

  handleSearchQueryChange = (event) => {
    this.setState({query: event.target.value});
  }

  handleLatLngChange = (event) => {
    this.setState({latLng: event.target.value});
  }

  handleRadiusChange = (event) => {
    this.setState({radius: event.target.value});
  }

  handleLimitChange = (event) => {
    this.setState({limit: event.target.value});
  }

  handleSearchButtonClick = (event) => {
    this.setState({shouldSubmitForm: true})
  }

  enableSearchIfAllSuccess = () => {
    if (this.state.resultsReceived.foursquare === true && this.state.resultsReceived.google === true) {
      this.setState({shouldSubmitForm: false})
    }
  }
  
  onFoursquareSuccess = () => {
    this.setState({resultsReceived: { foursquare: true, google: this.state.resultsReceived.google }})
    this.enableSearchIfAllSuccess()
  }

  onGoogleSuccess = () => {
    this.setState({resultsReceived: { google: true, foursquare: this.state.resultsReceived.foursquare }})
    this.enableSearchIfAllSuccess()
  }

  render() {
    return (
      <div>
        <SearchQuery 
          query={this.state.query}
          latLng={this.state.latLng}
          radius={this.state.radius}
          limit={this.state.limit}
          onQueryChange={this.handleSearchQueryChange}
          onLatLngChange={this.handleLatLngChange}
          onRadiusChange={this.handleRadiusChange}
          onLimitChange={this.handleLimitChange} 
        />
        <div>
          <button onClick={this.handleSearchButtonClick} disabled={this.state.shouldSubmitForm}>Search</button>
        </div>
        <div className="app-panel">
          <Search 
            title="Foursquare" 
            shouldSubmitForm={this.state.shouldSubmitForm} 
            onResultsReceived={this.onFoursquareSuccess} 
            query={this.state.query}
            latLng={this.state.latLng} 
            radius={this.state.radius}
            limit={this.state.limit}
          />
          <Search 
            title="Google Maps" 
            shouldSubmitForm={this.state.shouldSubmitForm} 
            onResultsReceived={this.onGoogleSuccess} 
            query={this.state.query}
            latLng={this.state.latLng}
            radius={this.state.radius}
            limit={this.state.limit}
          />
        </div>
      </div>
    );
  }
}

export default App;
