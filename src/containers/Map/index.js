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
    const markers = this.props.markers.map((m, i) => (
      <Marker
        key={"marker-" + i}
        lat={m.lat}
        lng={m.lng}
        color={m.color}
      />
      ))
    return (
       <GoogleMapReact
        bootstrapURLKeys={ {key: window.localStorage.getItem('gmapsKey')} }
        googleMapLoader={googleMapLoader}
        defaultCenter={this.defaultProps.center}
        defaultZoom={this.defaultProps.zoom}
      >
        {markers}
      </GoogleMapReact>
    );
  }
}


export default Map;
