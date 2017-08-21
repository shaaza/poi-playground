import React, { Component } from 'react';
import Search from './containers/Search/';
import SearchQuery from './components/SearchQuery/';
import Map from './containers/Map/';

// import logo from './logo.svg';
import './App.css';

const FOURSQUARE_DEFAULT_URL = "https://api.foursquare.com/v2/venues/search?v=20161016&road"

const FOURSQUARE_DEFAULT_KEY_PARAMS = "&client_id=ORIOILKCING2XM2BAE4RXLPNSCDKWXC1KGIOQX3EAAUGCZ0E&client_secret=S2FTCWQ0POSIKE52AC2XMY5EI3UK3IR5ZKBLEBCQ2MB21HAN"

const GOOGLE_DEFAULT_URL = "https://maps.googleapis.com/maps/api"

const GOOGLE_DEFAULT_KEY_PARAMS = window.localStorage.getItem('gmapsKey');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      latLng: "-6.473381300000001,106.8307777",
      radius: "100000",
      limit: "5",
      shouldSubmitFormFoursquare: false, 
      shouldSubmitFormGoogle: false,
      resultsReceived: { foursquare: false, google: false },
      isSearching: false
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
    this.setState({shouldSubmitFormFoursquare: true, shouldSubmitFormGoogle: true, isSearching: true })
  }

  handleClearGMapsKeyButtonClick = (event) => {
    localStorage.removeItem('gmapsKey');
    window.location.reload();
  }

  resetSearchIfAllSuccess = () => {
    if (this.state.resultsReceived.foursquare === true && this.state.resultsReceived.google === true) {
       this.setState({ 
        resultsReceived: { foursquare: false, google: false },
        isSearching: false
      });
    }
  }
  
  onFoursquareSuccess = () => {
    if (this.state.shouldSubmitFormFoursquare === true && this.state.resultsReceived.foursquare === false) {
      this.setState({ 
        resultsReceived: { 
          foursquare: true, 
          google: this.state.resultsReceived.google 
        },
        shouldSubmitFormFoursquare: false, 
      }, () => {
          this.resetSearchIfAllSuccess()
      })
    }
  }

  onGoogleSuccess = () => {
    if (this.state.shouldSubmitFormGoogle === true && this.state.resultsReceived.google === false) {
      this.setState({ 
        resultsReceived: { 
          google: true, 
          foursquare: this.state.resultsReceived.foursquare 
        },
        shouldSubmitFormGoogle: false, 
      }, () => {
          this.resetSearchIfAllSuccess()
      })
    }
  }

  render() {
    return (
      <div className="container" >
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
        <br />
        <div className="columns">
          <div className="column col-1"></div>
          <div className="column col-10">
            <button className="btn" onClick={this.handleSearchButtonClick} disabled={this.state.isSearching}>Search</button>
            <button className="btn float-right" onClick={this.handleClearGMapsKeyButtonClick}>Clear Google Maps Key</button>
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column col-1"></div>
          <div className="column col-5 text-center">
            <Search 
              title="Foursquare"
              defaultUrl={FOURSQUARE_DEFAULT_URL}
              keyParams={FOURSQUARE_DEFAULT_KEY_PARAMS}
              shouldSubmitForm={this.state.shouldSubmitFormFoursquare} 
              onResultsReceived={this.onFoursquareSuccess} 
              query={this.state.query}
              latLng={this.state.latLng} 
              radius={this.state.radius}
              limit={this.state.limit}
            />
          </div>
          <div className="column col-5 text-center">
            <Search 
              title="Google Maps"
              defaultUrl={GOOGLE_DEFAULT_URL}
              keyParams={GOOGLE_DEFAULT_KEY_PARAMS}
              shouldSubmitForm={this.state.shouldSubmitFormGoogle} 
              onResultsReceived={this.onGoogleSuccess} 
              query={this.state.query}
              latLng={this.state.latLng}
              radius={this.state.radius}
              limit={this.state.limit}
            />
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column map-container">
            <Map />
          </div>
        </div>
      </div>

    );
  }
}

export default App;
