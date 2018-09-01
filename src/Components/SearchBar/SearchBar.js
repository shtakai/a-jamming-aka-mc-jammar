import React, { Component } from 'react';

import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleSearch(e) {
    this.search();
  }

  handleChange(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
