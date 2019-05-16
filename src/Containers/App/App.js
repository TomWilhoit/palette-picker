import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions";
import { addPalettes } from "../../Actions";
import { fetchData } from "../../Utils/API";
import PropTypes from "prop-types";
import { Loading } from "../../Components/Loading/Loading";
import { Header } from "../../Components/Header/Header";
import PalettePicker from "../PalettePicker/PalettePicker";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      isLoading: false
    };
  }

  componentDidMount = async () => {
    this.toggleLoading();
    console.log(process)
    // console.log(process.env.REACT_APP_BACKEND_URL)
    try {
      const projects = await fetchData("https://palette-api-tm.herokuapp.com/" + "api/v1/projects");
      const palettes = await fetchData("https://palette-api-tm.herokuapp.com/" + "api/v1/palettes");
      await this.storeData(projects, palettes);
    } catch (error) {
      this.setState({ error: error.message });
    }
    this.toggleLoading();
  }

  storeData = (projects, palettes) => {
    this.updateProjects(projects);
    this.updatePalettes(palettes);
  }

  updateProjects = projects => {
    this.props.addProjects(projects);
  };

  updatePalettes = palettes => {
    this.props.addPalettes(palettes);
  };

  toggleLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  render() {
    return (
      <div className="App">
        <div className="head">
          <Header />
          {this.state.error && this.state.error}
          {this.state.isLoading && <Loading />}
        </div>
        <div className="main">
          <PalettePicker />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  locations: PropTypes.array,
  palettes: PropTypes.array
};

export const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes
});

export const mapDispatchToProps = dispatch => ({
  addProjects: projects => dispatch(addProjects(projects)),
  addPalettes: palettes => dispatch(addPalettes(palettes))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);