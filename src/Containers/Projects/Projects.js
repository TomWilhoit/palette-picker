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
    const displayProjects = this.renderProjects()
      return (
        <div className="projects-container">
          <NewProject />
          {displayProjects}
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
