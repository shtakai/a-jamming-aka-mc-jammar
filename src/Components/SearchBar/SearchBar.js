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
  }

  handleSearch() {
    this.props.onSearch(this.state.searchTerm);
  }

  handleChange(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleChange}
        />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
