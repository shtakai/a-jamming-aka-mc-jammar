import React, { Component } from 'react';

import TrackList from '../TrackList/TrackList';

import './PlayList.css';

class PlayList extends Component {
  render() {
    // const playListName = this.props.playListName === undefined ?
    //   this.defaultValue :
    //   this.props.playListName

    return (
      <div className="Playlist">
        <input defaultValue={`New PlayList`}/>
        <TrackList tracks={this.props.playListTracks} isRemovable={true} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default PlayList;
