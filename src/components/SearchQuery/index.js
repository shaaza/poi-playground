import React from 'react';
import TextInput from '../TextInput/'

function SearchQuery(props) {
    return (
      <div className="search-container">
        <div>
          <TextInput label="Query:" value={props.query} onChange={props.onQueryChange} />
        </div>
        <div>
          <TextInput label="Current LatLng:" value={props.latLng} onChange={props.onLatLngChange} />    
        </div>
        <div>
          <TextInput label="Radius:" value={props.radius} onChange={props.onRadiusChange} />    
        </div>
        <div>
          <TextInput label="# of Results:" value={props.limit} onChange={props.onLimitChange} />    
        </div>
      </div>
    );
  }


export default SearchQuery;
