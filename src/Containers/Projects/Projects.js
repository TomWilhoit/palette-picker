import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions/index";
import  Project  from "../Project/Project";
import { AddProject } from '../AddProject/AddProject';
import PropTypes from "prop-types";

export class Projects extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const displayProjects = this.props.projects.map((project, index) => (
      <Project name= {project.name} key={index} id={project.id} />
    ));
    if (this.props.projects.length === 0) {
      return <div>Loading Projects</div>;
    } else {
      return (
      <div className='projects-container'>
        <AddProject />
        {displayProjects}
      </div>);
    }
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
  addProjects: project => dispatch(addProjects(project)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
