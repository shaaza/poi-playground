import React from 'react';

import './index.css'
function TextInput(props) {
    return (
      <div className={props.className}>
        <label className="form-label" htmlFor={props.id}><small>{props.label} </small></label>
        <input className="form-input" id={props.id} type="text" value={props.value} onChange={props.onChange}></input>
      </div>
    );
}

export default TextInput;
