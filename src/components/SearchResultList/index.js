import React from 'react';
import SearchResult from '../SearchResult/index.js';

function SearchResultList(props) {
    let list;
    if (props.locations) {
         list = props.locations.map((l, i) => (
        <SearchResult location={l} key={i} />
        ))
    }
    else { 
        list = "No results." 
    }

    return (
        <div>{list}</div>
    )
}

export default SearchResultList;
