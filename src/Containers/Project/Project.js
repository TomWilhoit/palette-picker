import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions/index";
import { addCurrentProject } from "../../Actions/index";
import PropTypes from "prop-types";

export class Project extends Component {
  constructor(props) {
    super(props)
  }

  changeCurrentProject = (id) => {
    this.props.addCurrentProject(id)
  }

  render() {
    return(
      <div className='project' onClick={() => this.changeCurrentProject(this.props.id)}>
        <h3 className="project-title">{this.props.name}</h3>
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
  addCurrentProject: project => dispatch(addCurrentProject(project))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);