import React, { Component } from 'react';

export class Palette extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  // function to get colors

  render() {
    
    return(
      <div className='palette'>
        <h4>Palette Name</h4>
        <div className='palette-preview'>
          <div className='color-box-preview color1'></div>
          <div className='color-box-preview color2'></div>
          <div className='color-box-preview color3'></div>
          <div className='color-box-preview color4'></div>
          <div className='color-box-preview color5'></div>
        </div>
      </div>
    )
  }
}