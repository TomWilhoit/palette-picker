import React from "react";
import { connect } from "react-redux";
import { addProject } from "../../Actions/index";
import PropTypes from "prop-types";
import { fetchData } from "../../Utils/API";
import { fetchOptions } from "../../Utils/fetchOptions.js";

export class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: "",
      error: ""
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

  checkForRepeatName = () => {
    const { projects } = this.props;
    const { name } = this.state;
    let similarProjects = [];
    if (projects.length) {
      similarProjects = projects.filter(project => project.name.includes(name));

    }
    let newName = name;
    if (similarProjects.length) newName = name + similarProjects.length;
    this.setState({ name: newName });
  }

  addNewProject = async () => {
    const enteredName = this.state.name;
    if (!enteredName) {
      this.setState({ error: 'Projects must have a name!' });
      return;
    }
    await this.checkForRepeatName();
    const options = await fetchOptions("POST", { name: this.state.name });
    const response = await fetchData(
      ("https://palette-api-tm.herokuapp.com/" + "api/v1/projects"),
      options
    );
    this.props.addProject({ name: this.state.name, id: response.id });
    this.setState({ name: enteredName, error: "" });
  }

  render() {
    return (
      <div className="add-project">
        <form className="form" onSubmit={this.handleClick}>
          <input
            className="new-project-input"
            placeholder="Add Project..."
            defaultValue={this.state.name}
            onKeyUp={this.handleChange}
          />
          <button className="add-project-btn">
            <i className="fas fa-plus"/>
          </button>
        </form>
        {this.state.error && 
          <p className="project-error">{this.state.error}</p>}
      </div>
    );
  }
}

NewProject.propTypes = {
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
  addProject: project => dispatch(addProject(project))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);