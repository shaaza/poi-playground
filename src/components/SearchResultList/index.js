import React from 'react';
import SearchResult from '../SearchResult/index.js';
import './index.css';

function SearchResultList(props) {
    let list;
    if (props.locations) {
         list = props.locations.map((l, i) => (<SearchResult rank={i+1} location={l} key={i} />))
    }

    return (
        <table className="table fixed-layout-table">
            <thead>
                <tr>
                    <th width="20">#</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>{list}</tbody>
        </table>
    )
}

export default SearchResultList;
