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
      playListName: 'sample playlist',
      playListTracks: [
        {
          id: 1,
          name: 'name 1',
          artist: 'artist 1',
          album: 'album 1',
        },
        {
          id: 2,
          name: 'name 2',
          artist: 'artist 2',
          album: 'album 2',
        },
        {
          id: 3,
          name: 'name 3',
          artist: 'artist 3',
          album: 'album 3',
        },
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayList = this.updatePlayList.bind(this);
  }

  updatePlayList(name) {
    console.log(`updatePlayList:${name}`);
  }

  addTrack(track) {
    console.log(`addTrack:${track}`)
    // TODO more better way
    if (!this.state.playListTracks.find(savedTrack => (savedTrack.id === track.id))) {
      return;
    }
    this.setState({
      playListTracks: [
        ...this.state.playListTracks, track
      ]
    });
  }

  removeTrack(track) {
    console.log(`removeTrack:${track}`)
    const removeIdx =
      this.state.playListTracks.findIndex(savedTrack => (savedTrack.id === track))
    console.log(`removeIdx: ${removeIdx}`)
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlayList}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default App;
