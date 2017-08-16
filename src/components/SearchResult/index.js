import React from 'react';
import './index.css';
function SearchResult(props) {
    return (
      <tr>
        <td colSpan="1">
            {props.location.name}
            <br/>
            <span className="text-overflow-ellipsis"><small>{props.location.address}{'\u00A0'}</small></span>
        </td>
      </tr>
    );
}

export default SearchResult;
