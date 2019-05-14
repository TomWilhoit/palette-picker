import React, { Component } from "react";
import { connect } from "react-redux";

export class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  findProjectName = () => {
    if (this.props.currentProject) {
      let currProject = this.props.projects.find(
        project => project.id === this.props.currentProject
      );
      if (currProject) {
        return currProject.name;
      } else {
        return "Select a Project";
      }
    };
  };

  handleChange = e => {
    this.props.updateName(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.savePalette();
  };

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
          <input placeholder={currName} onKeyUp={this.handleChange} />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
  currentProject: state.currentProject
});

export default connect(
  mapStateToProps,
  null
)(Control);
