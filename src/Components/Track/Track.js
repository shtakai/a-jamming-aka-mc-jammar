import React, { Component } from 'react';

import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRemovable: this.props.isRemovable,
    };

    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    return this.state.isRemovable ?
      <div onClick={this.removeTrack}>-</div> :
      <div onClick={this.addTrack}>+</div> ;
  }

  addTrack() {
    this.props.onAdd(this.props.track.id);
  }

  removeTrack() {
    this.props.onRemove(this.props.track.id);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name.substr(0, 20)}</h3>
          <p>{this.props.track.artist.substr(0, 15)} | {this.props.track.album.substr(0, 15)}</p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    )
  }
}

export default Track;
