import React, { Component } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import './App.css';

import Spotify from '../../util/Spotify';

class App extends Component {
  saveButtonContent = {
    enable: 'SAVE TO SPOTIFY',
    disable: 'SAVING TO SPOTIFY',
  };
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playListName: 'My playlist',
      playListTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayList = this.updatePlayList.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  updatePlayList(name) {
    this.setState({
      playListName: name,
    });
  }

  savePlayList() {
    const trackUris = this.state.playListTracks.map(_track => _track.uri);
    Spotify.savePlayList(this.state.playListName, trackUris);
    this.setState({
      playListTracks: [],
    });
    this.updatePlayList('My playlist');
  }

  addTrack(track) {
    const addedTrack = this.state.searchResults.find(_track => _track.id === track);
    this.setState({
      searchResults: this.state.searchResults.filter(
        _track => _track.id !== track
      ),
    });

    this.setState({
      playListTracks: [
        ...this.state.playListTracks, addedTrack,
      ]
    });
  }

  removeTrack(track) {
    this.setState({
      playListTracks: this.state.playListTracks.filter(
        _track => _track.id !== track
      ),
    });
  }

  search(term) {
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});
    });
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <PlayList
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlayList}
              onSave={this.savePlayList}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
