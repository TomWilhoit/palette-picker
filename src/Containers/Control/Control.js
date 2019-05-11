import React, { Component } from 'react';

export class Control extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {


    // We may consider having more components in here for purposes of 
    // keeping functionality clean, what is held in state, etc
    return(
      <div>
        <button>Mix up palette</button>
        <input />
        <button>Submit</button>
      </div>
    )
  }
}