import React from 'react';
import TextInput from '../TextInput/'

function SearchQuery(props) {
    return (
      <div className="columns">
          <div className="column col-1"></div>
          <div className="column col-10">
            <TextInput id="searchQuery" label="Query:" value={props.query} onChange={props.onQueryChange} />
            <div className="columns">
                <TextInput 
                  className="column col-4"
                  id="latLng"
                  label="Current LatLng / Map Center:"
                  value={props.latLng} onChange={props.onLatLngChange}
                />    
                <TextInput
                  className="column col-4"
                  id="radius"
                  label="Radius:"
                  value={props.radius}
                  onChange={props.onRadiusChange} 
                />    
                <TextInput
                  className="column col-4"
                  id="limit"
                  label="# of Results:"
                  value={props.limit}
                  onChange={props.onLimitChange} 
                />   
            </div>
          </div>
      </div>
    );
  }


export default SearchQuery;
