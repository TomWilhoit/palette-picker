import React, { Component } from "react";
import Palette from "../Palette/Palette";
import { connect } from "react-redux";
import { addCurrentPalette } from "../../Actions"

export class Palettes extends Component {
  constructor(props) {
    super(props)
  }

  refreshSelectedPalette = () => {
    this.props.addCurrentPalette(0)
  }

  getProjectPalettes = (currProject) => {
    let palettes = this.props.palettes.filter(palette => {
      return (palette.project_id === currProject) 
    })
    return palettes.map(palette => {
      return (
        <Palette key={palette.id} 
                 id={palette.id}
                 name={palette.name}
                 color1={palette.color1}
                 color2={palette.color2}
                 color3={palette.color3}
                 color4={palette.color4}
                 color5={palette.color5}
                 setColors={this.props.setColors}
                 showPaletteName={this.props.showPaletteName}
        />
      ) 
    })
  }

  render() {
    let renderPalettes = this.getProjectPalettes(this.props.currentProject)
    return(
      <div className="palettes-container">
        <div className="palette" onClick={this.refreshSelectedPalette}>
          <div className="palette-name">
            <h4>New Palette</h4>
          </div>
        </div>
        {renderPalettes}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  currentProject: state.currentProject,
  palettes: state.palettes
})

export const mapDispatchToProps = dispatch => ({
  addCurrentPalette: palette => dispatch(addCurrentPalette(palette))
})

export default connect(mapStateToProps, mapDispatchToProps)(Palettes)