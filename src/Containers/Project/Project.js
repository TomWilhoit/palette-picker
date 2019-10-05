import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions/index";
import { updateCurrentProject, removeProject, removeProjectPalettes } from "../../Actions/index";
import PropTypes from "prop-types";
import { deleteProject } from "../../Utils/API";

export class Project extends Component {

  changeCurrentProject = id => {
    this.props.updateCurrentProject(id);
  }

  handleDelete = e => {
    const id = this.props.id;
    e.preventDefault();
    deleteProject(id);
    this.props.removeProject(id);
    this.props.removeProjectPalettes(id);
  }

  findProjectClass = () => {
    if (this.props.currentProject === this.props.id) {
      return "project active-project";
    } else {
      return "project";
    }
  }

  render() {
    const { name, id } = this.props;

    return (
      <div className={this.findProjectClass()}>
        <div className="project-title" onClick={() => this.changeCurrentProject(id)}>
          <h3>
            {name}
          </h3>
        </div>
        <div className="project-delete">
          <button onClick={this.handleDelete}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    )
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
  updateCurrentProject: project => dispatch(updateCurrentProject(project)),
  removeProject: id => dispatch(removeProject(id)),
  removeProjectPalettes: id => dispatch(removeProjectPalettes(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);