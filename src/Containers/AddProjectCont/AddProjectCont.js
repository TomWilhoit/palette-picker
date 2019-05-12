import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions/index";
import { Projects } from "../Projects/Projects";
import PropTypes from "prop-types";
import { fetchData } from "../../Utils/API";
import { fetchOptions } from "../../Utils/fetchOptions.js"

export class AddProjectCont extends Component {
  constructor(props) {
    super(props);
    this.state = {name:''};
  }

  handleChange = e => {
    this.setState({
      name : e.target.value
    });
  };

  addNewProject =  async ()  => { 
    const options = await fetchOptions('POST', this.state )
    const response = await fetchData('http://localhost:3000/api/v1/projects', options)
    console.log(response)
  };

  render() {
    return (
      <div className="add-project">
        <input
          className="new-project-input"
          placeholder="Add New Project"
          defaultValue={this.state.name}
          onKeyUp={this.handleChange}
        />
        <button
          className="add-project-btn"
          onClick={this.addNewProject}
        >
          <i className="fas fa-plus" />
        </button>
      </div>
    );
  }
}

AddProjectCont.propTypes = {
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
)(AddProjectCont);
