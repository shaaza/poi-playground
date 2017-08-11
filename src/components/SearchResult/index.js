import React from 'react';

function SearchResult(props) {
    return (
      <div className="search-result">
        Name: {props.location.name}
      </div>
    );
}

export default SearchResult;
