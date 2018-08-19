import React, { Component } from 'react';

import TrackList from '../TrackList/TrackList';

import './PlayList.css';

class PlayList extends Component {
  defaultValue = `New PlayList`;

  render() {

    return (
      <div className="Playlist">
        <input value={this.defaultValue}/>
        <TrackList tracks={[]}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default PlayList;
