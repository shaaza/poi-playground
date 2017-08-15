import React from 'react';

function SearchResult(props) {
    return (
      <tr className="search-result">
        <td>{props.location.name}</td>
      </tr>
    );
}

export default SearchResult;
