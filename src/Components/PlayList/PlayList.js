import React, { Component } from 'react';

import TrackList from '../TrackList/TrackList';

import './PlayList.css';

class PlayList extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(e) {
    console.log(`event:${e.target.value}`)
    this.props.onNameChange(e.target.value)

  }

  render() {
    // const playListName = this.props.playListName === undefined ?
    //   this.defaultValue :
    //   this.props.playListName

    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={`New PlayList`}/>
        <TrackList tracks={this.props.playListTracks} isRemovable={true} onRemove={this.props.onRemove} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default PlayList;
