import React from "react";
import { connect } from "react-redux";
import { addProject, updateCurrentProject } from "../../Actions/index";
import PropTypes from "prop-types";
import { fetchData } from "../../Utils/API";
import { fetchOptions } from "../../Utils/fetchOptions.js";

export class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: ""
   };
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  }

  handleClick = e => {
    e.preventDefault();
    this.addNewProject();
  }

  // checkForRepeatName = () => {
  //   // const { projects } = this.props;
  //   const { name } = this.state;
  //   // let similarProjects = [];
  //   // if (projects.length) {
  //   //   similarProjects = projects.filter(project => project.name.includes(name));
  //   // }
  //   // let newName = name;
  //   // if (similarProjects.length) newName = name + similarProjects.length;
  //   // this.setState({ name: newName });


  // }

  addNewProject = async () => {
    const { name } = this.state;
    if (!name) {
      this.props.setError('Projects must be given a name!')
      return;
    }
    let nameToSend = await this.props.checkForSameName(name, "projects");
    const options = await fetchOptions("POST", { name: nameToSend });
    const response = await fetchData(
      (process.env.REACT_APP_BACKEND_URL + "api/v1/projects"),
      options
    );
    this.props.addProject({ name: nameToSend, id: response.id });
    this.setState({ name: "" });
    this.selectAddedProject(response.id);
    this.clearInput();
    if (this.props.error) {
      this.props.clearError();
    }
  }

  selectAddedProject(id) {
    this.props.updateCurrentProject(id);
  }

  clearInput() {
    document.getElementById("newProjectInput").value = "";
  }

  render() {
    return (
      <div className="add-project">
        <form className="form" onSubmit={this.handleClick}>
          <input
            className="new-project-input"
            placeholder="Project Name..."
            defaultValue={this.state.name}
            onKeyUp={this.handleChange}
            id="newProjectInput"
          />
          <button className="add-project-btn">
            <i className="fas fa-plus"/>
          </button>
        </form>
      </div>
    );
  }
}

NewProject.propTypes = {
  projects: PropTypes.array,
  palettes: PropTypes.array,
  currentProject: PropTypes.number,
  error: PropTypes.string,
  setError: PropTypes.func,
  clearError: PropTypes.func
};

export const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
  currentProject: state.currentProject
});

export const mapDispatchToProps = dispatch => ({
  addProject: project => dispatch(addProject(project)),
  updateCurrentProject: project => dispatch(updateCurrentProject(project))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);