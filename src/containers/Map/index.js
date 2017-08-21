import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import googleMapLoader from '../../client/Google/map_loader';
import Marker from '../../components/Marker';

class Map extends Component {
  defaultProps = {
    center: {lat: -6.2615, lng: 106.8106},
    zoom: 12
  };

  render() {
    return (
       <GoogleMapReact
        bootstrapURLKeys={ {key: window.localStorage.getItem('gmapsKey')} }
        googleMapLoader={googleMapLoader}
        defaultCenter={this.defaultProps.center}
        defaultZoom={this.defaultProps.zoom}
      >
        <Marker
          lat={-6.2556} 
          lng={106.8108} 
          color={'#00cae9'}
        />
      </GoogleMapReact>
    );
  }
}


export default Map;