import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions";
import { addPalettes } from "../../Actions";
import { apiCall } from "../../Utils/API";
import { Loading } from "../../Components/Loading/Loading";
import { Error } from "../../Components/Error/Error";
import { Header } from "../../Components/Header/Header";
import { Info } from "../../Components/Info/Info";
import PalettePicker from "../PalettePicker/PalettePicker";
import PropTypes from "prop-types";

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
    await this.getSavedProjects();
    await this.getSavedPalettes();
    this.toggleLoading();
  }

  getSavedProjects = async () => {
    try {
      const projects = await apiCall("projects", {method: "GET"});
      await this.updateProjects(projects);
    } catch (error) {
      this.setError(error.message);
    }
  }

  getSavedPalettes = async () => {
    try {
      const palettes = await apiCall("palettes", {method: "GET"});
      await this.updatePalettes(palettes);
    } catch (error) {
      this.setError(error.message);
    }
  }

  updateProjects = projects => {
    this.props.addProjects(projects);
  }

  updatePalettes = palettes => {
    this.props.addPalettes(palettes);
  }

  toggleLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  }

  setError = message => {
    this.setState({ error: message });
  }

  clearError = () => {
    this.setState({ error: "" });
  }

  showInfo = () => {
    document.querySelector(".info-pop-up")
      .classList.add("show-pop-up");
    document.querySelector(".modal-overlay")
      .classList.add("show-overlay");
  }

  hideInfo = () => {
    this.closeAllDetails();
    this.closeAllArrows();
    this.removeModal();
  }

  closeAllDetails = () => {
    document.querySelectorAll(".detail-box")
      .forEach(box => {
        box.classList.remove("show-info");
      });
  }
  
  closeAllArrows = () => {
    document.querySelectorAll(".arrow")
      .forEach(arrow => {
        arrow.classList.remove("arrow-down");
      });
  }

  removeModal = () => {
    document.querySelector(".info-pop-up")
      .classList.remove("show-pop-up");
    document.querySelector(".modal-overlay")
      .classList.remove("show-overlay");
  }

  render() {
    return (
      <div className="app">
        <div className="head">
          <div className="left-head"></div>
          <div className="center-head">
            <Header />
            <div 
              className="info-btn" 
              onClick={this.showInfo}
            >
              <i className="fa fa-info" aria-hidden="true"></i>
            </div>
          </div>
          <div className="right-head">
            {this.state.error && 
              <Error 
                message={this.state.error} 
              />
            }
            {this.state.isLoading && 
              <Loading />
            }
          </div>
        </div>
        <div className="main">
          <PalettePicker 
            clearError={this.clearError}
            setError={this.setError} 
          />
        </div>
        <div 
          className="info-pop-up closable" 
        >
          <Info 
            hideInfo={this.hideInfo} 
          />
        </div>
        <div 
          className="modal-overlay" 
          onClick={ () => this.hideInfo() }
        >
        </div>
      </div>
    );
  }
}

App.propTypes = {
  projects: PropTypes.array,
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