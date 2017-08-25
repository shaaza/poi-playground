import React from 'react';
import './index.css';
function SearchResult(props) {
    return (
      <tr>
        <td className="small-width-column">{props.rank}</td>
        <td colSpan="5">
            <a onClick={props.onClickResult} value={props.location.lat + ',' + props.location.lng}>{props.location.name}</a>
            <br/>
            <span className="text-overflow-ellipsis"><small>{props.location.address}{'\u00A0'}</small></span>
        </td>
      </tr>
    );
}

export default SearchResult;
