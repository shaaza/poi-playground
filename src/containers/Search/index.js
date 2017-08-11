import React, { Component } from 'react';
import AddressBar from '../../components/AddressBar/'
import fetchResults from '../../client/Fetch/'
import SearchResultList from '../../components/SearchResultList'

import './index.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      url: "",
      results: false
    } 
  }
  
  receiverFunc = (results) => {
    this.setState({results})
  }

  fetchResults = (event) => {
    fetchResults(this.state.url, this.receiverFunc)
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
        <div>
          <button onClick={this.fetchResults}>Submit</button>
        </div>
        <div>
          <SearchResultList locations={this.state.results} />
        </div>
      </div>
    );
  }
}

export default Search;
