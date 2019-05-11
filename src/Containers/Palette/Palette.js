import React, { Component } from 'react';

export class Palette extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    console.log('hey', this.props)
    const color1 = { backgroundColor: `#${this.props.color1}` }
    const color2 = { backgroundColor: `#${this.props.color2}` }
    const color3 = { backgroundColor: `#${this.props.color3}` }
    const color4 = { backgroundColor: `#${this.props.color4}` }
    const color5 = { backgroundColor: `#${this.props.color5}` }

    return(
      <div className='palette'>
        <h4>Palette Name</h4>
        <div className='palette-preview'>
          <div className='color-box-preview color1' style={color1}></div>
          <div className='color-box-preview color2' style={color2}></div>
          <div className='color-box-preview color3' style={color3}></div>
          <div className='color-box-preview color4' style={color4}></div>
          <div className='color-box-preview color5' style={color5}></div>
        </div>
      </div>
    )
  }
}