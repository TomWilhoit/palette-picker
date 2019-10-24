import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  findName = (type) => {
    const pluralType = type + "s";
    const currType = "curr" + type;
    let output = `Select or create a ${type}`;
    if (this.props[pluralType].length) {
      const isSelectedItem = this.props[pluralType].find(item => item.id === this.props[currType])
      if (isSelectedItem) output = isSelectedItem.name;
    }
    return output;
  }

  clearName = () => {
    this.setState({ name: "" });
  }

  sendPaletteName = name => {
    this.props.savePalette(name);
    this.clearName();
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    if (name) {
      const nameToSend = this.props.checkForSameName(name, "palettes")
      this.sendPaletteName(nameToSend);
    } else {
      const isSelectedPalette = this.props.currPaletteCheck(this.props.currpalette);
      if (isSelectedPalette) {
        this.sendPaletteName(isSelectedPalette.name);
      } else {
        const unnamedNameCheck = this.props.checkForSameName("unnamed", "palettes");
        this.sendPaletteName(unnamedNameCheck);
      }
    }
  }

  render() {
    const paletteName = this.findName("palette");
    return (
      <div className="control-container">
        <div className="selected-project">
          <p>
            <span>Selected Project</span>: {this.findName("project")}
          </p>
          <p>
            <span>Selected Palette</span>: {paletteName}
          </p>
        </div>
        <div className="palette-mix">
          <button 
            className="randomize-btn" 
            onClick={this.props.randomizeColors}
          >
            Mix palette!
          </button>
        </div>
        <div className="palette-submit">
          <input 
            className="palette-input"
            placeholder={paletteName} 
            value={this.state.name} 
            onChange={this.handleChange} 
          />
          <button 
            className="submit-btn" 
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

Control.propTypes = {
  checkForSameName: PropTypes.func,
  randomizeColors: PropTypes.func,
  savePalette: PropTypes.func,
  currPaletteCheck: PropTypes.func
};

export const  mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes,
  currproject: state.currentProject,
  currpalette: state.currentPalette
});

export default connect(
  mapStateToProps,
  null
)(Control);
