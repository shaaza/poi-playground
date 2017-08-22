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
            <col width="20"></col>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>{list}</tbody>
        </table>
    )
}

export default SearchResultList;
