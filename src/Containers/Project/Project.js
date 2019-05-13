import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions/index";
import { addCurrentProject } from "../../Actions/index";
import PropTypes from "prop-types";
import { deleteProject } from "../../Utils/API";

export class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { id: 0 };
  }

  changeCurrentProject = id => {
    this.props.addCurrentProject(id);
  };

  removeProject = async () => {
    const id = this.props.id;
    const response = await deleteProject(id);
    console.log(response);
  };

  render() {
    return (
      <div className="project">
        <h3
          className="project-title"
          onClick={() => this.changeCurrentProject(this.props.id)}
        >
          {this.props.name}{" "}
        </h3>
        <button onClick={this.removeProject}>X</button>
      </div>
    );
  }
}

Project.propTypes = {
  projects: PropTypes.array,
  palettes: PropTypes.array,
  currentProject: PropTypes.number
};

export const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
  currentProject: state.currentProject
});

export const mapDispatchToProps = dispatch => ({
  addProjects: project => dispatch(addProjects(project)),
  addCurrentProject: project => dispatch(addCurrentProject(project))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
