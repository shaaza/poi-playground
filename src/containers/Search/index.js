import React, { Component } from 'react';
import AddressBar from '../../components/AddressBar/'
import './index.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      url: ""
    } 
  }

  handleURLChange = (event) => {
    this.setState({url: event.target.value});
  }

  render() {
    return (
      <div className="search-container">
        <div>
          <h3>{this.state.title}</h3>
        </div>
        <div>
          <AddressBar url={this.state.url} onChange={this.handleURLChange} />
        </div>
        <p>
          Search results
        </p>
      </div>
    );
  }
}

export default Search;
