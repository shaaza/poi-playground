import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import googleMapLoader from '../../client/Google/map_loader';
import Marker from '../../components/Marker';

class Map extends Component {
  defaultProps = {
    zoom: 12
  };

  render() {
    const markers = this.props.markers.filter((m) => (typeof m.lat !== "undefined" && typeof m.lng !== "undefined"))
                                      .map((m, i) => (
      <Marker
        key={"marker-" + i}
        lat={m.lat}
        lng={m.lng}
        color={m.color}
        rank={m.rank}
      />
      ))
    return (
       <GoogleMapReact
        bootstrapURLKeys={ {key: window.localStorage.getItem('gmapsKey')} }
        googleMapLoader={googleMapLoader}
        defaultZoom={this.defaultProps.zoom}
        center={this.props.center}
      >
        {markers}
      </GoogleMapReact>
    );
  }
}


export default Map;
