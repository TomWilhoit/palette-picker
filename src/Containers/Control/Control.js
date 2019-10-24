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
      let currProject = this.props.projects.find(project => project.id === this.props.currentProject);
      if (currProject) {
        return currProject.name;
      } else {
        return "Select or create a Project";
      }
    } else {
      return "Select or create a Project";
    }
  }

  findPaletteName = () => {
    if (this.props.palettes.length) {
      let currPalette = this.props.palettes.find(palette => palette.id === this.props.currentPalette);
      if (currPalette) {
        return currPalette.name;
      } else if (this.props.currentPalette === 0 && this.props.currentProject) {
        return "Creating New Palette";
      } else {
        return "Select or create a Palette";
      }
    } else {
      return "Select or create a Palette";
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
      let nameToSend = this.props.checkForSameName(name, "palettes")
      this.sendPaletteName(nameToSend);
    } else {
      const palette = this.props.findPalette();
      if (palette) {
        const originalName = palette.name;
        this.sendPaletteName(originalName);
      } else {
        let unnamedNameCheck = this.props.checkForSameName("unnamed", "palettes");
        this.sendPaletteName(unnamedNameCheck);
      }
    }
  }

  render() {
    let paletteName = this.findPaletteName();
    return (
      <div className="control-container">
        <div className="selected-project">
          <p>
            <span>Selected Project</span>: {this.findProjectName()}
          </p>
          <p>
            <span>Selected Palette</span>: {paletteName}
          </p>
        </div>
        <div className="palette-mix">
          <button 
            className="randomize-btn" 
            onClick={this.props.randomizeColors}
          >
            Mix palette!
          </button>
        </div>
        <div className="palette-submit">
          <input 
            className="palette-input"
            placeholder={paletteName} 
            value={this.state.name} 
            onChange={this.handleChange} 
          />
          <button 
            className="submit-btn" 
            onClick={this.handleSubmit}
          >
            Submit
          </button>
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
