import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

class Map extends Component {
  defaultProps = {
    center: {lat: -6.2615, lng: 106.8106},
    zoom: 12
  };

  render() {
    const DummyMarker = ({ text }) => (
      <div style={{
        position: 'relative', color: 'black',
        height: 40, width: 60, top: -20, left: -30,    
      }}>
        {text}
      </div>
    );
    return (
       <GoogleMapReact
        defaultCenter={this.defaultProps.center}
        defaultZoom={this.defaultProps.zoom}
      >
        <DummyMarker
          lat={-6.2556} 
          lng={106.8108} 
          text={'<I\'m here!>'} 
        />
      </GoogleMapReact>
    );
  }
}


export default Map;