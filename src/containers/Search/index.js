import React, { Component } from 'react';
import TextInput from '../../components/TextInput/'
import fetchResults from '../../client/Fetch/'
import SearchResultList from '../../components/SearchResultList'


import './index.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      baseUrl: props.defaultUrl,
      keyParams: props.keyParams,
      query: props.query,
      latLng: props.latLng,
      radius: props.radius,
      limit: props.limit,
      results: false,
    } 
  }
  
  componentWillReceiveProps(nextProps) {
     this.setState({
       query: nextProps.query,
       latLng: nextProps.latLng,
       radius: nextProps.radius,
       limit: nextProps.limit
     }, () => {
       this.submitFormIfRequired(nextProps.shouldSubmitForm)
     })
  }

  submitFormIfRequired(shouldSubmitForm) {
    if (shouldSubmitForm === true) {
      let queryDetails = {
        baseUrl: this.state.baseUrl,
        keyParams: this.state.keyParams,
        latLng: this.state.latLng,
        query: this.state.query,
        radius: this.state.radius,
        limit: this.state.limit
      }
      fetchResults(queryDetails, this.receiveResults)
    }
  }

  receiveResults = (results) => {
    this.setState({ results });
    this.props.onResultsReceived();
  }

  handleURLChange = (event) => {
    this.setState({ baseUrl: event.target.value });
  }

  handleKeyParamsChange = (event) => {
    this.setState({ keyParams: event.target.value })
  }

  render() {
    let searchResults;
    if (this.state.results.length !== 0) {
      searchResults = (<SearchResultList locations={this.state.results} />);
    } else {
      searchResults = "No results."
    }
    return (
      <div className="search-container">
        <div>
          <h4>{this.state.title}</h4>
        </div>
        <div>
          <TextInput label="Base URL:" value={this.state.baseUrl} onChange={this.handleURLChange} />
          <TextInput label="Key Params:" value={this.state.keyParams} onChange={this.handleKeyParamsChange} />
        </div>
        <br />
        <div>
          {searchResults}
        </div>
      </div>
    );
  }
}

export default Search;
