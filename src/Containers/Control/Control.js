import React, { Component } from "react";

export class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // We may consider having more components in here for purposes of
    // keeping functionality clean, what is held in state, etc
    return (
      <div className='control-container'>
        <button onClick={this.props.randomizeColors}>Mix up palette</button>
        <input />
        <button>Submit</button>
      </div>
    );
  }
}
