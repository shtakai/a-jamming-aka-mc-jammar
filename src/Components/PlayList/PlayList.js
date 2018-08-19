/*
*/

import React, { Component } from 'react';

// import TrackList from '../TrackList/TrackList';

import './PlayList.css';

class PlayList extends Component {
  render() {
    return (
      <div className="Playlist">
        <input value="New Playlist"/>
        { /* trackList */}
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default PlayList;
