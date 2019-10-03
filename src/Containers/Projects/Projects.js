import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions/index";
import Project from "../Project/Project";
import NewProject from "../NewProject/NewProject";
import PropTypes from "prop-types";

export class Projects extends Component {

  renderProjects = () => {
    if (this.props.projects.length) {
      return this.props.projects.map((project, index) => (
        <Project name={project.name} key={index} id={project.id} />
      ));
    }
  } 

  render() {
    return (
      <div className="projects-container">
        <h3>
          Create a new project...
        </h3>
        <div className="new-project">
          <NewProject />
        </div>
        <h3>
          Or select a saved project:
        </h3>
        <div className="projects-list">
          {this.renderProjects()}
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
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
  addProjects: project => dispatch(addProjects(project))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
