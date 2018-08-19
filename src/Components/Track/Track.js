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
  }

  renderAction() {
    return this.state.isRemovable ?
      <div>-</div> :
      <div onClick={this.addTrack}>+</div> ;
  }

  addTrack() {
    console.log(`addtrack: ${this.props.track.id}`)
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    )
  }
}

export default Track;
