import React, { Component } from 'react'
import { connect } from "react-redux"
import Projects from '../Projects/Projects'
import Palettes from '../Palettes/Palettes'
import { Control } from '../Control/Control'

export class PalettePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color1: { color: '', isLocked: false },
      color2: { color: '', isLocked: false },
      color3: { color: '', isLocked: false },
      color4: { color: '', isLocked: false },
      color5: { color: '', isLocked: false }
    }
  }

  componentDidMount = () => {
    this.randomizeColors()
  }

  randomizeColors = () => {
    Object.keys(this.state).forEach(color => {
      if (!this.state[color].isLocked) {
        this.setState({ [color]: { color: this.randomizeHexCode(), isLocked: false } })
      }
    })
  }

  setColors = async () => {
    let palette = await this.findPalette()
    this.setState({
      color1: { color: `#${palette.color1}`, isLocked: false },
      color2: { color: `#${palette.color2}`, isLocked: false },
      color3: { color: `#${palette.color3}`, isLocked: false },
      color4: { color: `#${palette.color4}`, isLocked: false },
      color5: { color: `#${palette.color5}`, isLocked: false }
     })
  }

  randomizeHexCode = () => {
    return '#23ed33'
    //logic for getting random hexcode
  }

  findPalette = () => {
    return this.props.palettes.find(palette => (palette.id === this.props.currentPalette))
  }

  toggleLock = (color) => {
    this.setState({ [color]: {color: this.state[color].color, isLocked: !this.state[color].isLocked }})
  }

  backgroundSelect = (color) => {
    return { backgroundColor: `${this.state[color].color}` }
  }

  lockSelect = (color) => {
    if (this.state[color].isLocked) {
      return <i class="fas fa-lock" onClick={() => this.toggleLock(color)}></i>
    } else {
      return <i class="fas fa-lock-open" onClick={() => this.toggleLock(color)}></i>
    } 
  }

  render() {
    let renderColors = Object.keys(this.state).map(color => {
      return(
        <div className='color-box' name={color} style={this.backgroundSelect(color)}>
          {this.lockSelect(color)}
        </div>
      )
    })

    return(
      <main className='palette-picker'>
        <div className='picker-display'>
         {renderColors}
        </div>
        <div className='projects-display'>
          <Projects />
        </div>
        <div className='control-display'>
          <Control randomizeColors={this.randomizeColors} />
        </div>
        <div className='palettes-display'>
          <Palettes setColors={this.setColors} />
        </div>
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette,
  palettes: state.palettes
})

export default connect(mapStateToProps, null)(PalettePicker)