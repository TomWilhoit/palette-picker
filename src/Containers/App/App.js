import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjects } from "../../Actions";
import { addPalettes } from "../../Actions";
import { apiCall } from "../../Utils/API";
import PropTypes from "prop-types";
import { Loading } from "../../Components/Loading/Loading";
import { Error } from "../../Components/Error/Error";
import { Header } from "../../Components/Header/Header";
import { Info } from "../Info/Info";
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
    await this.getSavedProjects();
    await this.getSavedPalettes();
    this.toggleLoading();
  }

  getSavedProjects = async () => {
    try {
      const projects = await apiCall("projects");
      console.log(projects)

      await this.updateProjects(projects);
    } catch (error) {
      this.setError(error.message);
    }
  }

  getSavedPalettes = async () => {
    try {
      const palettes = await apiCall("palettes");
      console.log(palettes)
      await this.updatePalettes(palettes);
    } catch (error) {
      this.setError(error.message);
    }
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

  setError = message => {
    this.setState({ error: message });
  }

  clearError = () => {
    this.setState({ error: "" });
  }

  showInfo = () => {
    document.querySelector('.info-modal')
      .classList.add('show-modal');
    document.querySelector('.overlay')
      .classList.add('show-overlay');
  }

  hideInfo = e => {
    var { className } = e.target;
    if (className.includes("close")) {
      this.closeAllDetails();
      this.closeAllArrows();
      this.removeModal();
    }
  }

  removeModal = () => {
    document.querySelector('.info-modal')
      .classList.remove('show-modal');
    document.querySelector('.overlay')
      .classList.remove('show-overlay');
  }

  closeAllArrows = () => {
    document.querySelectorAll('.arrow')
      .forEach(arrow => {
        arrow.classList.remove('arrow-down');
      });
  }

  closeAllDetails = () => {
    document.querySelectorAll('.detail-box')
      .forEach(box => {
        box.classList.remove('show-info');
      });
  }

  render() {
    return (
      <div className="App">
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
              <Error message={this.state.error} />
            }
            {this.state.isLoading && 
              <Loading />
            }
          </div>
        </div>
        <div className="main">
          <PalettePicker 
            setError={this.setError} 
            clearError={this.clearError}
            error={this.state.error}
          />
        </div>
        <div 
          className="info-modal close" 
          onClick={(e) => this.hideInfo(e)}
        >
          <Info hideInfo={this.hideInfo} />
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