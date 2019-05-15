import React, { Component } from "react";
import { connect } from "react-redux";

export class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  findProjectName = () => {
    let currProject = this.props.projects.find(project => {
      return project.id === this.props.currentProject
    });
    if (currProject) {
      return currProject.name;
    } else {
      return "Select a Project";
    }
  }

  clearName = () => {
    this.setState({ name: "" });
  }

  sendPaletteName = name => {
    this.props.updateName(name);
    this.props.savePalette(name);
    this.clearName();
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    if (name) {
      this.sendPaletteName(name);
    } else {
      const palette = this.props.findPalette();
      if (palette) {
        const originalName = palette.name;
        this.sendPaletteName(originalName);
      } else {
        this.sendPaletteName("(unnamed)")
      }
    }
  }

  render() {
    let currProject = this.findProjectName() || "You must select or create a project to begin";
    let currName = this.props.paletteName || "Name new palette...";
    return (
      <div className="control-container">
        <div className="selected-project">
          <p>Selected Project</p>
          {currProject}
        </div>
        <div className="palette-mix">
          <button onClick={this.props.randomizeColors}>Mix up palette</button>
        </div>
        <div className="palette-submit">
          <input placeholder={currName} 
                 value={this.state.name} 
                 onChange={this.handleChange} 
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export const  mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
  currentProject: state.currentProject
});

export default connect(
  mapStateToProps,
  null
)(Control);
