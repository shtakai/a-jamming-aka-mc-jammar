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
      isSavingPlayList: false,
      saveButtonContent: this.saveButtonContent.enable,
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

  async savePlayList() {
    const trackUris = this.state.playListTracks.map(_track => _track.uri);
    this.setState({
      isSavingPlayList: true,
      saveButtonContent: this.saveButtonContent.disable,
    });
    await Spotify.savePlayList(this.state.playListName, trackUris)
    // emulates dalay on communication to Spotify API.
    await this.timeout(5000);
    this.setState({
      playListTracks: [],
      saveButtonContent: this.saveButtonContent.enable,
    });
    this.updatePlayList('My playlist');
    this.setState({
      isSavingPlayList: false,
    });
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

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
              isSavingPlayList={this.state.isSavingPlayList}
              saveButtonContent={this.state.saveButtonContent}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
