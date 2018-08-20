import React, { Component } from 'react';

import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleTermSearch = this.handleTermSearch.bind(this);
  }

  search() {
    this.props.onSearch();
  }

  handleTermSearch(e) {
    console.log(`handleTermSearch: ${e.target.value}`)
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermSearch}
        />
        <a>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
