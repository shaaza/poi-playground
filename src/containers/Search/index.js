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
      baseUrl: "",
      query: this.props.query,
      latLng: this.props.latLng,
      results: false,
    } 
  }
  
  componentWillReceiveProps(nextProps) {
     this.setState({
       query: nextProps.query,
       latLng: nextProps.latLng
     }, () => {
       this.submitFormIfRequired(nextProps.shouldSubmitForm)
     })
  }

  submitFormIfRequired(shouldSubmitForm) {
    if (shouldSubmitForm === true) {
      let queryDetails = {
        baseUrl: this.state.baseUrl,
        latLng: this.state.latLng,
        query: this.state.query
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

  render() {
    return (
      <div className="search-container">
        <div>
          <h3>{this.state.title}</h3>
        </div>
        <div>
          <TextInput label="Base URL:" value={this.state.baseUrl} onChange={this.handleURLChange} />
        </div>
        <div>
          <SearchResultList locations={this.state.results} />
        </div>
      </div>
    );
  }
}

export default Search;
