import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions/index";
import { addCurrentProject } from "../../Actions/index";
import PropTypes from "prop-types";
import { deleteProject } from "../../Utils/API";
import { fetchOptions } from "../../Utils/fetchOptions.js";



export class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { id: 0 };
  }

  changeCurrentProject = id => {
    this.props.addCurrentProject(id);
  };

  removeProject = ()  => {
    const id = this.props.id
    deleteProject(id)
    // const options = await fetchOptions("DELETE", this.props.id);
    // const response = await fetchData(
    //   "http://localhost:3000/api/v1/projects",
    //   options
    // );
    // console.log(response);
  }

  render() {
    return (
      <div
        className="project"
        onClick={() => this.changeCurrentProject(this.props.id)}
      >
        <h3 className="project-title">
          {this.props.name}{" "}
          <button onClick={this.removeProject} >X</button>
          
        </h3>
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
