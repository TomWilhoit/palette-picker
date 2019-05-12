import React, { Component } from 'react'
import { connect } from "react-redux"
import { updatePalette, addPalette } from "../../Utils/API"
import Projects from '../Projects/Projects'
import Palettes from '../Palettes/Palettes'
import Control from '../Control/Control'

export class PalettePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color1: { color: '', isLocked: false },
      color2: { color: '', isLocked: false },
      color3: { color: '', isLocked: false },
      color4: { color: '', isLocked: false },
      color5: { color: '', isLocked: false },
      paletteName: ''
    }
  }

  componentDidMount = () => {
    this.randomizeColors()
  }

  randomizeColors = () => {
    Object.keys(this.state).forEach(color => {
      if (color.includes('color')) {
        if (!this.state[color].isLocked) {
          this.setState({ [color]: { color: this.randomizeHexCode(), isLocked: false } })
        }
      }
    })
  }

  setColors = async () => {
    let palette = await this.findPalette()
    console.log(palette)
    this.setState({
      color1: { color: `${palette.color1}`, isLocked: false },
      color2: { color: `${palette.color2}`, isLocked: false },
      color3: { color: `${palette.color3}`, isLocked: false },
      color4: { color: `${palette.color4}`, isLocked: false },
      color5: { color: `${palette.color5}`, isLocked: false }
     })
  }

  randomizeHexCode = () => {
    return '23ed33'
    //logic for getting random hexcode
  }

  findPalette = () => {
    return this.props.palettes.find(palette => (palette.id === this.props.currentPalette))
  }

  showPaletteName = async () => {
    let currPalette = await this.findPalette()
    let paletteName = currPalette.name
    this.updateName(paletteName)
  }

  updateName = (name) => {
    this.setState({ paletteName: name })
  }

  toggleLock = (color) => {
    this.setState({ [color]: {color: this.state[color].color, isLocked: !this.state[color].isLocked }})
  }

  backgroundSelect = (color) => {
    return { backgroundColor: `#${this.state[color].color}` }
  }

  lockSelect = (color) => {
    if (this.state[color].isLocked) {
      return <i class="fas fa-lock" onClick={() => this.toggleLock(color)}></i>
    } else {
      return <i class="fas fa-lock-open" onClick={() => this.toggleLock(color)}></i>
    } 
  }

  savePalette = () => {
    let newPalette = true
    console.log(this.state.color1.color)
    const newPaletteBody = {
      color1: `${this.state.color1.color}`,
      color2: `${this.state.color2.color}`,
      color3: `${this.state.color3.color}`,
      color4: `${this.state.color4.color}`,
      color5: `${this.state.color5.color}`,
      name: this.state.paletteName
    }
    this.props.palettes.forEach(palette => {
      if (palette.id === this.props.currPalette) {
        newPalette = false
      }
    })
    if (newPalette) {
      // POST palette to DB if new palette
      const projectId = this.props.currentProject
      addPalette(newPaletteBody, projectId)
    } else {
      // PUT current palette
      const id = this.props.currentPalette
      updatePalette(newPaletteBody, id)
    }
  }

  render() {
    let renderColors = Object.keys(this.state).map(color => {
      if (color.includes('color')) {
        return(
          <div className='color-box' name={color} key={color} style={this.backgroundSelect(color)}>
            {this.lockSelect(color)}
          </div>
        )
      }
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
          <Control randomizeColors={this.randomizeColors} 
                   paletteName={this.state.paletteName}
                   updateName={this.updateName}
                   savePalette={this.savePalette}         
          />
        </div>
        <div className='palettes-display'>
          <Palettes setColors={this.setColors} 
                    showPaletteName={this.showPaletteName}
          />
        </div>
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette,
  currentProject: state.currentProject,
  palettes: state.palettes
})

export default connect(mapStateToProps, null)(PalettePicker)