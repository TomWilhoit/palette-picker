import React, { Component } from 'react'
import { connect } from "react-redux"

export class PalettePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  selectLock = () => {
    // if(this.state.locked) {
    //   <i class="fas fa-lock"></i>
    // } else {
    //   <i class="fas fa-lock-open"></i>
    // } 
  }

  findPalette = () => {
    return this.props.palettes.find(palette => (palette.id === this.props.currentPalette))
  }

  render() {
    let selectedPalette
    if (this.props.currentPalette) {
      selectedPalette = this.findPalette()
    } else {
      selectedPalette = {color1: '33812B', color2: 'A0B09E', color3: '39D8B4', color4: '9D27AB', color5: '652B81'}
    }


    console.log(selectedPalette)
    let colorPalette = [
      { color: selectedPalette.color1, isLocked: false },
      { color: selectedPalette.color2, isLocked: false },
      { color: selectedPalette.color3, isLocked: false},
      { color: selectedPalette.color4, isLocked: false},
      { color: selectedPalette.color5, isLocked: false }
    ]

    // if (this.props.selectedPalette) {
    //   const selectedPalette = this.findPalette()
    // }

      const color1 = { backgroundColor: `#${colorPalette[0].color}` }
      const color2 = { backgroundColor: `#${colorPalette[1].color}` }
      const color3 = { backgroundColor: `#${colorPalette[2].color}` }
      const color4 = { backgroundColor: `#${colorPalette[3].color}` }
      const color5 = { backgroundColor: `#${colorPalette[4].color}` }

    return(
      <main className='palette-picker'>
        <div className='color-box color1' style={color1}></div>
        <div className='color-box color2' style={color2}></div>
        <div className='color-box color3' style={color3}></div>
        <div className='color-box color4' style={color4}></div>
        <div className='color-box color5' style={color5}></div>
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette,
  palettes: state.palettes
});

export default connect(mapStateToProps, null)(PalettePicker)