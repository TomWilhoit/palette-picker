import React, { Component } from 'react';
import { Palette } from '../Palette/Palette'
import { connect } from 'react-redux';
import { stat } from 'fs';

export class Palettes extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  getProjectPalettes = (currProject) => {
    return this.props.palettes.filter(palette => {
      if (palette.project_id === currProject) {
        return <Palette />
      }
    })
  }


  render() {
    // let renderPalettes = getProjectPalettes(this.props.currentProject)
    return(
      <div>
        <Palette />
        {/* {renderPalettes} */}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  // currentProject: stat.currentProject,
  palettes: state.palettes
})

// export const mapDispatchToProps = dispatch => ({

// })

export default connect(mapStateToProps, null)(Palettes)