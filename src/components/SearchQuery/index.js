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
      </div>
    );
  }


export default SearchQuery;
