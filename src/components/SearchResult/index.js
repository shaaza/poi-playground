import React from 'react';
import './index.css';
function SearchResult(props) {
    return (
      <tr>
        <td className="small-width-column">{props.rank}</td>
        <td colSpan="5">
            {props.location.name}
            <br/>
            <span className="text-overflow-ellipsis"><small>{props.location.address}{'\u00A0'}</small></span>
        </td>
      </tr>
    );
}

export default SearchResult;
