import React, { Component } from "react";
import { connect } from "react-redux";


export class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paletteName: ''
    };
  }

  findProjectName = () => {
    if (this.props.currentProject) {
      let currProject = this.props.projects.find(project => project.id === this.props.currentProject)
      return currProject.name
    }
  }

  handleChange = (e) => {
    this.props.updateName(e.target.value)
  }

  // findPaletteName = () => {
  //   if (this.props.currentPalette) {
  //     let currPalette = this.props.palettes.find(palette => palette.id === this.props.currentPalette)
  //   } else {
  //     return 'Select of Create Palette'
  //   }
  // }

  render() {
    let currProject = this.findProjectName() || 'Select a project'
    let currName = this.props.paletteName || 'Select or Create Palette'
    console.log(currName)
    return (
      <div className='control-container'>
          {currProject}
        <button onClick={this.props.randomizeColors}>Mix up palette</button>
        <input 
          placeholder={currName} 
          onKeyUp={this.handleChange}
        />
        <button>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
  currentProject: state.currentProject,
  currentPalette: state.currentPalette
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Control)