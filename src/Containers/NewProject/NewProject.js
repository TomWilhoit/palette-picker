import React, { Component } from "react";
import { connect } from "react-redux";
import { addProject, updateCurrentProject } from "../../Actions/index";
import { apiCall, createOptions } from "../../Utils/API";
import PropTypes from "prop-types";

export class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: "",
    };
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  }

  handleClick = e => {
    e.preventDefault();
    this.addNewProject();
  }

  addNewProject = async () => {
    const { name } = this.state;
    if (!name) {
      this.props.setError("Projects must be given a name!");
      return;
    }
    const nameToSend = this.props.checkForSameName(name, "projects");
    const options = createOptions("POST", { name: nameToSend });
    try {
      const response = await apiCall("projects", options);
      this.props.addProject({ name: nameToSend, id: response.id });
      this.selectAddedProject(response.id);
    } catch (error) {
      this.props.setError(`Error: ${error.message}!`);
    }
    this.clearInput();
    this.props.clearError();
  }

  selectAddedProject = id => {
    this.props.updateCurrentProject(id);
  }

  clearInput = () => {
    document.getElementById("newProjectInput").value = "";
    this.setState({ name: "" });
  }

  render() {
    return (
      <div className="new-project">
        <div className="create-head hideable">
          <h3>Create New Project...</h3>
        </div>
        <div className="form-container">
          <form className="form" onSubmit={this.handleClick}>
            <input
              className="new-project-input"
              placeholder="Project Name..."
              defaultValue={this.state.name}
              onKeyUp={this.handleChange}
              id="newProjectInput"
            />
            <button className="add-project-btn">
              <i className="fas fa-plus" />
            </button>
          </form>
        </div>
        <div className="select-head hideable">
          <h3>Select Saved Project:</h3>
        </div>
      </div>
    );
  }
}

NewProject.propTypes = {
  projects: PropTypes.array,
  palettes: PropTypes.array,
  checkForSameName: PropTypes.func,
  clearError: PropTypes.func,
  setError: PropTypes.func,
};

export const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
});

export const mapDispatchToProps = dispatch => ({
  addProject: project => dispatch(addProject(project)),
  updateCurrentProject: project => dispatch(updateCurrentProject(project)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);