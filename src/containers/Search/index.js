import React, { Component } from 'react';
import AddressBar from '../../components/AddressBar/'
import './index.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title
    } 
  }
  render() {
    return (
      <div className="search-container">
        <div>
          <h3>{this.state.title}</h3>
        </div>
        <p>
            <AddressBar props={this.url}/>
        </p>
        <p>
            Search results
        </p>
      </div>
    );
  }
}

export default Search;
