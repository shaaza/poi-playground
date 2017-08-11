import React from 'react';
import SearchResult from '../SearchResult/index.js';

function SearchResultList(props) {
    let list;
    if (props.locations) {
         list = props.locations.map((l) => (
        <SearchResult location={l} />
        ))
    }
    else { 
        list = "nothing" 
    }

    return (
        <div>{list}</div>
    )
}

export default SearchResultList;
