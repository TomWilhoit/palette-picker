import React, { Component } from 'react'
import { connect } from "react-redux"
import Projects from '../Projects/Projects'
import Palettes from '../Palettes/Palettes'
import { Control } from '../Control/Control'



export class PalettePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      color5: '',
    }
  }

  // { color: '', isLocked: false } had this for each color in state...

// idea for a function a randomize button could run
  randomizeColors = () => {
    Object.keys(this.state).forEach(color => {
      if (!this.state[color].isLocked) {
        this.setState({ [color]: { color: this.randomizeHexCode(), isLocked: this.state[color].isLocked } })
      }
    })
  }

  randomizeHexCode = () => {
    return 'FEFEFE'
    //logic for getting random hexcode
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

  setColors = (selectedPalette) => {

    this.setState({ color1: selectedPalette.color1, color2: selectedPalette.color2, color3: selectedPalette.color3, color4: selectedPalette.color4, color5: selectedPalette.color5 })
  }

  colorSelect = (colorNum, selectedPalette) => {
    if (this.state[colorNum]) {
      return `#${this.state[colorNum]}`
    } else {
      return selectedPalette[colorNum]
    }
  }

  render() {
    // let selectedPalette
    // if (this.props.currentPalette) {
    //   selectedPalette = this.findPalette()
    //   console.log(selectedPalette)
    //   // this.setColors(selectedPalette)
    // } else {
    //   // this.randomizeColors()
    // }


    // console.log(selectedPalette)
    //      { color: this.state.color3 || selectedPalette.color3, isLocked: false},

    // let colorPalette = [
    //   { color: this.colorSelect('color1', selectedPalette), isLocked: false },
    //   { color: this.colorSelect('color2', selectedPalette), isLocked: false },
    //   { color: this.colorSelect('color3', selectedPalette), isLocked: false },
    //   { color: this.colorSelect('color4', selectedPalette), isLocked: false },
    //   { color: this.colorSelect('color5', selectedPalette), isLocked: false }
    // ]

    // if (this.props.selectedPalette) {
    //   const selectedPalette = this.findPalette()
    // }

      // const color1 = { backgroundColor: `#${colorPalette[0].color}` }
      // const color2 = { backgroundColor: `#${colorPalette[1].color}` }
      // const color3 = { backgroundColor: `#${colorPalette[2].color}` }
      // const color4 = { backgroundColor: `#${colorPalette[3].color}` }
      // const color5 = { backgroundColor: `#${colorPalette[4].color}` }

    return(
      <main className='palette-picker'>
        <div className='picker-display'>
          <div className='color-box color1'></div>
          <div className='color-box color2'></div>
          <div className='color-box color3'></div>
          <div className='color-box color4'></div>
          <div className='color-box color5'></div>
          {/* <div className='color-box color1' style={color1}></div>
          <div className='color-box color2' style={color2}></div>
          <div className='color-box color3' style={color3}></div>
          <div className='color-box color4' style={color4}></div>
          <div className='color-box color5' style={color5}></div> */}
        </div>
        <div className='projects-display'>
          <Projects />
        </div>
        <div className='control-display'>
          <Control />
        </div>
        <div className='palettes-display'>
          <Palettes />
        </div>
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette,
  palettes: state.palettes
});

export default connect(mapStateToProps, null)(PalettePicker)
