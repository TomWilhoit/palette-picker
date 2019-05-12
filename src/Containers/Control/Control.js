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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.savePalette()
  }

  render() {
    let currProject = this.findProjectName() || 'Select a project'
    let currName = this.props.paletteName || 'Select or Create Palette'
    return (
      <div className='control-container'>
          {currProject}
        <button onClick={this.props.randomizeColors}>Mix up palette</button>
        <input 
          placeholder={currName} 
          onKeyUp={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
  currentProject: state.currentProject
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Control)