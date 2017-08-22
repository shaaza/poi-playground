import React from 'react';
import './index.css';

function Marker(props) {
    return (
      <div className="pin bounce" style={{background: props.color}}><div className="pin-after">{props.rank}</div></div>
    );
}

export default Marker;

