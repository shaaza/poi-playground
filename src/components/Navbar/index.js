import React from 'react';

function Navbar(props) {
    const buttons = props.buttons.map((btn, i) => (
        <btn 
          className={"btn " + (props.active === btn.label ? "active" : "")}
          onClick={btn.onClick}
          key={"nav-btn-" + i}
        >
            {btn.label}
        </btn>
    ))
    return (
        <header className="navbar">
            <section className="navbar-section">
            {buttons}
            </section>
            <section className="navbar-section">
            <div className="input-group input-inline">
                <button className="btn float-right" onClick={props.onClickClearGMapsKey}>Clear Google Maps Key</button>
            </div>
            </section>
        </header>
    );
}

export default Navbar;