import React, { Component } from 'react';
import { FOURSQUARE_DEFAULT_URLS, FOURSQUARE_DEFAULT_KEY_PARAMS, GOOGLE_DEFAULT_KEY_PARAMS, GOOGLE_DEFAULT_URLS, MARKER_COLORS } from './constants';
import Search from './containers/Search/';
import SearchQuery from './components/SearchQuery/';
import Map from './containers/Map/';

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
      mapCenter: {lat: -6.243763299999999, lng: 106.80288310000003},
      shouldSubmitFormFoursquareSearch: false,
      shouldSubmitFormFoursquareSuggestCompletion: false, 
      shouldSubmitFormGoogle: false,
      resultsReceived: { 
        foursquareSuggestCompletion: false, 
        foursquareSearch: false,
        google: false 
      },
      isSearching: false,
      markers: []
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
    this.setState({
      markers: [],
      shouldSubmitFormFoursquareSearch: true, 
      shouldSubmitFormFoursquareSuggestCompletion: true, 
      shouldSubmitFormGoogle: true,
      isSearching: true 
    });
  }

  handleEnterKeypress = (event) => {
    if (event.key === 'Enter')
    this.setState({
      markers: [],
      shouldSubmitFormFoursquareSearch: true, 
      shouldSubmitFormFoursquareSuggestCompletion: true, 
      shouldSubmitFormGoogle: true,
      isSearching: true 
    });
  }

  handleClearGMapsKeyButtonClick = (event) => {
    localStorage.removeItem('gmapsKey');
    window.location.reload();
  }

  onClickSearchResult = (event) => {
    let [lat, lng] = event.target.getAttribute("value").split(',');
    if (lat === 'undefined' || lng === 'undefined') {
      alert("Couldn't the find the coordinates for that location.");
    } else {
      this.setState({
        mapCenter: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }
      })
    }
  }

  resetSearchIfAllSuccess = () => {
    let isAllResultsReceived = (this.state.resultsReceived.google && 
                                this.state.resultsReceived.foursquareSuggestCompletion)
    if (isAllResultsReceived) {
       this.setState({ 
        resultsReceived: { foursquareSearch: false, foursquareSuggestCompletion: false, google: false },
        isSearching: false
      });
    }
  }
  
  onFoursquareSuggestCompletionSuccess = (markers) => {
    if (this.state.shouldSubmitFormFoursquareSuggestCompletion && !this.state.resultsReceived.foursquareSuggestCompletion) {
      this.setState({ 
        resultsReceived: { 
          foursquareSuggestCompletion: true, 
          foursquareSearch: this.state.resultsReceived.foursquareSearch,
          google: this.state.resultsReceived.google 
        },
        shouldSubmitFormFoursquareSuggestCompletion: false, 
      }, () => {this.resetSearchIfAllSuccess()});
    this.setState({markers: this.state.markers.concat(markers)});
    };
  }

  onFoursquareSearchSuccess = (markers) => {
    if (this.state.shouldSubmitFormFoursquareSearch && !this.state.resultsReceived.foursquareSearch) {
      this.setState({ 
        resultsReceived: { 
          foursquareSearch: true, 
          foursquareSuggestCompletion: this.state.resultsReceived.foursquareSuggestCompletion,
          google: this.state.resultsReceived.google 
        },
        shouldSubmitFormFoursquareSearch: false, 
      }, () => {this.resetSearchIfAllSuccess()});
    this.setState({markers: this.state.markers.concat(markers)});
    };
  }

  onGoogleSuccess = (markers) => {
    if (this.state.shouldSubmitFormGoogle && !this.state.resultsReceived.google) {
      this.setState({ 
        resultsReceived: { 
          google: true, 
          foursquareSearch: this.state.resultsReceived.foursquareSearch,
          foursquareSuggestCompletion: this.state.resultsReceived.foursquareSuggestCompletion,
        },
        shouldSubmitFormGoogle: false, 
      }, () => {this.resetSearchIfAllSuccess()});
      this.setState({markers: this.state.markers.concat(markers)});
    }
  }

  render() {
    const foursquareSuggestCompletion = (<Search 
              title="Foursquare Suggest Completion"
              defaultUrl={FOURSQUARE_DEFAULT_URLS['suggestcompletion']}
              keyParams={FOURSQUARE_DEFAULT_KEY_PARAMS}
              shouldSubmitForm={this.state.shouldSubmitFormFoursquareSuggestCompletion} 
              onResultsReceived={this.onFoursquareSuggestCompletionSuccess} 
              query={this.state.query}
              latLng={this.state.latLng} 
              radius={this.state.radius}
              limit={this.state.limit}
              markerColor={MARKER_COLORS["foursquareSuggestCompletion"]}
              onClickResult={this.onClickSearchResult}
            />);
    const googlePlacesAutocomplete = (<Search 
              title="Google Places Autocomplete"
              defaultUrl={GOOGLE_DEFAULT_URLS['placesAutocomplete']}
              keyParams={GOOGLE_DEFAULT_KEY_PARAMS}
              shouldSubmitForm={this.state.shouldSubmitFormGoogle} 
              onResultsReceived={this.onGoogleSuccess} 
              query={this.state.query}
              latLng={this.state.latLng}
              radius={this.state.radius}
              limit={this.state.limit}
              isKeyInputDisabled={true}
              markerColor={MARKER_COLORS["placesAutocomplete"]}
              onClickResult={this.onClickSearchResult}
            />);
    return (
      <div className="container" onKeyPress={this.handleEnterKeypress}>
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
          <div className="column col-md-0 col-xs-0 col-1"></div>
          <div className="column col-md-12 col-xs-12 col-10">
            <button className="btn" onClick={this.handleSearchButtonClick} disabled={this.state.isSearching}>Search</button>
            <button className="btn float-right" onClick={this.handleClearGMapsKeyButtonClick}>Clear Google Maps Key</button>
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column col-md-0 col-xs-0 col-1"></div>
          <div className="column col-md-12 col-xs-12 col-5 text-center">
            {foursquareSuggestCompletion}
          </div>
          <div className="column col-md-12 col-xs-12 col-5 text-center">
            {googlePlacesAutocomplete}
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column map-container" id="google-map">
            <Map markers={this.state.markers} center={this.state.mapCenter} />
          </div>
        </div>
      </div>

    );
  }
}

export default App;
