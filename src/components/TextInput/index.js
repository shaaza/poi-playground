import React from 'react';

import './index.css'
function TextInput(props) {
    return (
      <div className="address-bar">
        <label>{props.label} </label>
        <input type="text" value={props.value} onChange={props.onChange}></input>
      </div>
    );
}

export default TextInput;
