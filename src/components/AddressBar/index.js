import React from 'react';

import './index.css'
function AddressBar(props) {
    return (
      <div className="address-bar">
        <label>URL: </label>
        <input type="text" value={props.url} onChange={props.onChange}></input>
      </div>
    );
}

export default AddressBar;
