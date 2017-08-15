import React from 'react';

function SearchResult(props) {
    return (
      <tr>
        <td>
            {props.location.name}
            <br/>
            <small>{props.location.address}</small>
        </td>
      </tr>
    );
}

export default SearchResult;
