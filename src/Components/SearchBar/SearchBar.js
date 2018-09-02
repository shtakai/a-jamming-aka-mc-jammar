import React, { Component } from 'react';

import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleSearch(e) {
    this.search();
  }

  handleChange(e) {
    this.props.updateSearchTerm(e.target.value);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }

  search() {
    this.props.onSearch(this.props.searchTerm);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          value={this.props.searchTerm}
        />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
