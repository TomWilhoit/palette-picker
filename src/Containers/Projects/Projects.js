import React, { Component } from 'react';
import { connect } from "react-redux";
import { addProjects } from "../../Actions/index";
import { Project } from '../Project/Project'
import PropTypes from "prop-types";

export class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: null
    }
  }

 

  render() {
    const displayProjects = this.props.projects.map((project, index) => (
      <Project key={index} {...project} />
    ));
    if (this.props.projects.length === 0) {
      return <div>Loading</div>;
    } else {
      return <div>{displayProjects}</div>;
    }
  }
}

Projects.propTypes = {
  projects: PropTypes.array,
  palettes: PropTypes.array
};

export const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes
});

export const mapDispatchToProps = dispatch => ({
  addProjects: project => dispatch(addProjects(project))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);