/*
*/

import React, { Component } from 'react';

import Track from '../Track/Track';

import './TrackList.css';

class TrackList extends Component {
  render() {
    return(
      <div className="TrackList">
        <Track />
      </div>
    )
  }
}

export default TrackList;
