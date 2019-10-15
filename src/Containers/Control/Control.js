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
    if (this.props.projects.length) {
      let currProject = this.props.projects.find(project => {
        return project.id === this.props.currentProject
      });
      if (currProject) {
        return currProject.name;
      } else {
        return "Select or create a project to begin";
      }
    }
  }

  findPaletteName = () => {
    if (this.props.palettes.length) {
      let currPalette = this.props.palettes.find(palette => {
        return palette.id === this.props.currentPalette
      });
      if (currPalette) {
        return currPalette.name;
      } else {
        return "Select or create a Palette"
      }
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
    let paletteName = this.findPaletteName();
    return (
      <div className="control-container">
        <div className="selected-project">
          <p><span>Selected Project</span>: {this.findProjectName()}</p>
          <p><span>Selected Palette</span>: {paletteName}</p>
        </div>
        <div className="palette-mix">
          <button className="randomize-btn" onClick={this.props.randomizeColors}>Mix palette!</button>
        </div>
        <div className="palette-submit">
          <input className="palette-input"
                 placeholder={paletteName} 
                 value={this.state.name} 
                 onChange={this.handleChange} 
          />
          <button className="submit-btn" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export const  mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
  currentProject: state.currentProject,
  currentPalette: state.currentPalette
});

export default connect(
  mapStateToProps,
  null
)(Control);
