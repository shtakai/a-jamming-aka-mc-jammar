import React, { Component } from 'react';

import TrackList from '../TrackList/TrackList';

import './PlayList.css';

class PlayList extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          value={this.props.playListName}
        />
        <TrackList
          tracks={this.props.playListTracks}
          isRemovable={true}
          onRemove={this.props.onRemove}
        />
        <a
          onClick={this.props.onSave}
          className={
            this.props.isSavingPlayList ?
              'Playlist-save-disable' :
              "Playlist-save"
          }
        >
          {this.props.saveButtonContent}
        </a>
      </div>
    )
  }
}

export default PlayList;
