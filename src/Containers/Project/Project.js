import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions/index";
import { updateCurrentProject, updateCurrentPalette, removeProject, removeProjectPalettes } from "../../Actions/index";
import { apiCall, createOptions } from "../../Utils/API";
import PropTypes from "prop-types";

export class Project extends Component {

  changeCurrentProject = id => {
    this.props.updateCurrentProject(id);
    this.props.updateCurrentPalette(0);
  }

  handleDelete = e => {
    const { id } = this.props;
    e.preventDefault();
    this.props.removeProject(id);
    this.props.removeProjectPalettes(id);
    this.deleteProject(id);
  }

  deleteProject = async id => {
    const options = createOptions("DELETE", {id: id});
    try {
      await apiCall(`projects/${id}`, options);
    } catch (error) {
      this.props.setError(`Error: ${error.message}!`);
    }
  }

  findProjectClass = () => {
    if (this.props.currentProject === this.props.id) {
      return "project active-project";
    } else {
      return "project";
    }
  }

  render() {
    return (
      <div className={this.findProjectClass()}>
        <div 
          className="project-title" 
          onClick={() => this.changeCurrentProject(this.props.id)}>
          <h3>
            {this.props.name}
          </h3>
        </div>
        <div className="project-delete">
          <button onClick={this.handleDelete}>
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  projects: PropTypes.array,
  palettes: PropTypes.array,
  currentProject: PropTypes.number,
  setError: PropTypes.func,
};

export const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
  currentProject: state.currentProject,
});

export const mapDispatchToProps = dispatch => ({
  addProjects: project => dispatch(addProjects(project)),
  updateCurrentProject: project => dispatch(updateCurrentProject(project)),
  updateCurrentPalette: palette => dispatch(updateCurrentPalette(palette)),
  removeProject: id => dispatch(removeProject(id)),
  removeProjectPalettes: id => dispatch(removeProjectPalettes(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);