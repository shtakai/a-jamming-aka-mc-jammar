import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';


import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          id: 123,
          name: 'name',
          artist: 'test',
          album: 'testalbum',
        },
      ],
    };
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <PlayList />
          </div>
        </div>
      </div>
    )
  }

}

export default App;
