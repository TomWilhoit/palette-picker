import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions";
import { addPalettes } from "../../Actions";
import { fetchData } from "../../Utils/API";
import PropTypes from "prop-types";
import { Loading } from "../../Components/Loading/Loading";
import { Header } from "../../Components/Header/Header";
import { Info } from "../../Components/Info/Info";
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
    try {
      const projects = await fetchData(process.env.REACT_APP_BACKEND_URL + "api/v1/projects");
      const palettes = await fetchData(process.env.REACT_APP_BACKEND_URL + "api/v1/palettes");
      await this.storeData(projects, palettes);
    } catch (error) {
      this.setState({ error: error.message });
    }
    this.toggleLoading();
  }

  hideInfo = (e) => {
    var { className } = e.target;
    if (className.includes("close")) {

      let infoModal = document.querySelector('.info-modal');
      let modalOver = document.querySelector('.overlay');

      infoModal.classList.remove('show-modal');
      modalOver.classList.remove('show-overlay');
    }

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

  showInfo = () => {
    let infoModal = document.querySelector('.info-modal');
    let modalOver = document.querySelector('.overlay');

    infoModal.classList.add('show-modal');
    modalOver.classList.add('show-overlay');
  }

  render() {
    return (
      <div className="App">
        <div className="head">
          <div className="left-head"></div>
          <div className="center-head">
            <Header />
            <div className="info-btn" onClick={this.showInfo}>
              <i className="fa fa-info" aria-hidden="true"></i>
            </div>
          </div>
          <div className="right-head">
            {this.state.error && 
              <h2 className="errer-display">{this.state.error}</h2>
            }
            {this.state.isLoading && <Loading />}
          </div>
        </div>
        <div className="main">
          <PalettePicker />
        </div>
        <div className="info-modal close" onClick={(e) => this.hideInfo(e)}>
          <Info 
            hideInfo={this.hideInfo} 
          />
        </div>
        <div className="modal overlay"></div>
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