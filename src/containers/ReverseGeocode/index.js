import React, { Component } from 'react';
import { GOOGLE_DEFAULT_KEY_PARAMS, GOOGLE_DEFAULT_URLS, MARKER_COLORS } from '../../constants';
import Search from '../Search/';
import SearchQuery from '../../components/SearchQuery/';
import Map from '../Map/';

import './index.css';

class ReverseGeocode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "-6.243763299999999,106.80288310000003",
      latLng: "-6.243763299999999,106.80288310000003",
      radius: "1",
      limit: "5",
      mapCenter: {lat: -6.243763299999999, lng: 106.80288310000003},
      shouldSubmitFormGoogleNearbyPlaces: false, 
      shouldSubmitFormGoogleReverseGeocode: false,
      resultsReceived: { 
        googleNearbyPlaces: false, 
        googleReverseGeocode: false 
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
    let [lat, lng] = this.state.query.split(',');
    let center = {lat: parseFloat(lat), lng: parseFloat(lng)};
    this.setState({
      markers: [],
      shouldSubmitFormGoogleNearbyPlaces: true, 
      shouldSubmitFormGoogleReverseGeocode: true,
      isSearching: true,
      mapCenter: center 
    });
  }

  handleEnterKeypress = (event) => {
    if (event.key === 'Enter') {
      let [lat, lng] = this.state.query.split(',');
      let center = {lat: parseFloat(lat), lng: parseFloat(lng)};
      this.setState({
        markers: [],
        shouldSubmitFormGoogleNearbyPlaces: true, 
        shouldSubmitFormGoogleReverseGeocode: true,
        isSearching: true,
        mapCenter: center  
      });
    }
  }

  handleRecenterMapButtonClick = (event) => {
    let [lat, lng] = this.state.latLng.split(",");
    this.setState({
      mapCenter: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }
    }, () => { window.scrollTo(0, document.getElementById("google-map").getBoundingClientRect().bottom); })
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
      }, () => { window.scrollTo(0, document.getElementById("google-map").getBoundingClientRect().bottom) })
    }
  }

  resetSearchIfAllSuccess = () => {
    let isAllResultsReceived = (this.state.resultsReceived.googleReverseGeocode && 
                                this.state.resultsReceived.googleNearbyPlaces)
    if (isAllResultsReceived) {
       this.setState({ 
        resultsReceived: { googleNearbyPlaces: false, googleReverseGeocode: false },
        isSearching: false
      });
    }
  }
  
  onGoogleNearbyPlacesSuccess = (markers) => {
    if (this.state.shouldSubmitFormGoogleNearbyPlaces && !this.state.resultsReceived.googleNearbyPlaces) {
      this.setState({ 
        resultsReceived: { 
          googleNearbyPlaces: true, 
          googleReverseGeocode: this.state.resultsReceived.googleReverseGeocode 
        },
        shouldSubmitFormGoogleNearbyPlaces: false, 
      }, () => {this.resetSearchIfAllSuccess()});
    this.setState({markers: this.state.markers.concat(markers)});
    };
  }

  onGoogleReverseGeocodeSuccess = (markers) => {
    if (this.state.shouldSubmitFormGoogleReverseGeocode && !this.state.resultsReceived.googleReverseGeocode) {
      this.setState({ 
        resultsReceived: { 
          googleReverseGeocode: true, 
          googleNearbyPlaces: this.state.resultsReceived.googleNearbyPlaces,
        },
        shouldSubmitFormGoogleReverseGeocode: false, 
      }, () => {this.resetSearchIfAllSuccess()});
      this.setState({markers: this.state.markers.concat(markers)});
    }
  }

  render() {
    const googleNearbyPlaces = (<Search 
              title="Nearby Places"
              defaultUrl={GOOGLE_DEFAULT_URLS['nearbyPlaces']}
              keyParams={GOOGLE_DEFAULT_KEY_PARAMS}
              shouldSubmitForm={this.state.shouldSubmitFormGoogleNearbyPlaces} 
              onResultsReceived={this.onGoogleNearbyPlacesSuccess} 
              query={this.state.query}
              latLng={this.state.latLng}
              radius={this.state.radius}
              limit={this.state.limit}
              isKeyInputDisabled={true}
              markerColor={MARKER_COLORS["googleNearbyPlaces"]}
              onClickResult={this.onClickSearchResult}
            />);
    const googleReverseGeocode = (<Search 
              title="Reverse Geocode"
              defaultUrl={GOOGLE_DEFAULT_URLS['reverseGeocode']}
              keyParams={GOOGLE_DEFAULT_KEY_PARAMS}
              shouldSubmitForm={this.state.shouldSubmitFormGoogleReverseGeocode} 
              onResultsReceived={this.onGoogleReverseGeocodeSuccess} 
              query={this.state.query}
              latLng={this.state.latLng}
              radius={this.state.radius}
              limit={this.state.limit}
              isKeyInputDisabled={true}
              markerColor={MARKER_COLORS["googleReverseGeocode"]}
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
        <div className="columns">
          <div className="column col-1"></div>
          <div className="column col-10">
            <small className="container">
              Note: Current lat/lng is irrelevant for Nearby Places. Also rankBy=DISTANCE requires type param, and rankBy=PROMINENCE requires radius param. If there's no rankBy param, the radius value must be set.
            </small>
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column col-md-0 col-xs-0 col-1"></div>
          <div className="column col-md-12 col-xs-12 col-10">
            <button className="btn" onClick={this.handleSearchButtonClick} disabled={this.state.isSearching}>Search</button>
            <button className="btn float-right" onClick={this.handleRecenterMapButtonClick}>Recenter Map</button>
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column col-md-0 col-xs-0 col-1"></div>
          <div className="column col-md-12 col-xs-12 col-5 text-center">
            {googleNearbyPlaces}
          </div>
          <div className="column col-md-12 col-xs-12 col-5 text-center">
            {googleReverseGeocode}
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

export default ReverseGeocode;
