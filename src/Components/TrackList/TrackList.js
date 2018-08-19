import React, { Component } from 'react';

import Track from '../Track/Track';

import './TrackList.css';

class TrackList extends Component {
  render() {
    console.log(this.props)
    return(
      <div className="TrackList">
        {
          this.props.tracks.map(track => (
            <Track
              key={track.id}
              track={track}
            />
          ))
        }
      </div>
    )
  }
}

export default TrackList;
