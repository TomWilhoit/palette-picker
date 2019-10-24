import React, { Component } from "react";
import { connect } from "react-redux";
import { apiCall } from "../../Utils/API";
import { fetchOptions } from "../../Utils/fetchOptions.js";
import { addPalette, changePalette } from "../../Actions"
import Projects from "../Projects/Projects";
import Palettes from "../Palettes/Palettes";
import Control from "../Control/Control";
import PropTypes from "prop-types";

export class PalettePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color1: { color: "", isLocked: false },
      color2: { color: "", isLocked: false },
      color3: { color: "", isLocked: false },
      color4: { color: "", isLocked: false },
      color5: { color: "", isLocked: false }
    };
  }

  componentDidMount = () => {
    this.randomizeColors();
  }

  randomizeColors = () => {
    Object.keys(this.state).forEach(color => {
      if (!this.state[color].isLocked) {
        this.setState({
          [color]: { color: this.randomizeHexCode(), isLocked: false }
        });
      }
    });
  }

  setPaletteDisplay = async () => {
    let palette = await this.currPaletteCheck(this.props.currPaletteId);
    if (palette) {
      this.setColors(true);
    } else {
      this.setColors(false);
    }
  }

  setColors = (lockStatus) => {
    let lockUpdate = {};
    Object.keys(this.state).forEach (key => {
      lockUpdate[key] = { color: this.state[key].color, isLocked: lockStatus };
    });
    this.setState(lockUpdate);
  }

  randomizeHexCode = () => {
    let randomColor = "000000".replace(/0/g, function() {
      return Math.floor(Math.random() * 16).toString(16);
    });
    return randomColor;
  }

  currPaletteCheck = id => {
    if (this.props.palettes) {
      return this.props.palettes.find(palette => {
        return palette.id === id;
      });
    }
  }

  toggleLock = color => {
    this.setState({
      [color]: {
        color: this.state[color].color,
        isLocked: !this.state[color].isLocked
      }
    });
  }

  lockSelect = color => {
    let lockClass = "fas fa-lock"
    if (!this.state[color].isLocked) lockClass += "-open" 
    return (
      <i 
        className={lockClass} 
        onClick={() => this.toggleLock(color)} 
      />
    );
  }

  checkForSameName = (name, type) => {
    const itemsToCheckAgainst = this.props[type];
    let similarNamedItems = [];
    if (itemsToCheckAgainst.length) {
      itemsToCheckAgainst.forEach(item => {
        const nameWithoutRepeatNum = item.name.split("<")[0];
        if (nameWithoutRepeatNum === name.split("<")[0]) {
          similarNamedItems.push(item);
        };
      });
    }
    let nameToSend = name;
    if (similarNamedItems.length) nameToSend = name + "<" + similarNamedItems.length + ">";
    return nameToSend;     
  }

  savePalette = name => {
    const { currPaletteId, currProjectId } = this.props;
    const paletteBody = {
      color1: this.state.color1.color,
      color2: this.state.color2.color,
      color3: this.state.color3.color,
      color4: this.state.color4.color,
      color5: this.state.color5.color,
      name
    };
    const isNewPalette = this.currPaletteCheck(currPaletteId)
    if (isNewPalette) {
      this.makeNewPalette(paletteBody, currProjectId);
    } else {
      this.editPalette(paletteBody, currProjectId, currPaletteId);
    }
  }

  makeNewPalette = async (paletteBody, currProjectId) => {
    const options = fetchOptions("POST", paletteBody);
    try {
      const response = await apiCall(`projects/${currProjectId}/palettes`, options);
      await this.props.addPalette({
        ...paletteBody, 
        project_id: currProjectId, 
        id: response.id
      });
    } catch (error) {
      this.props.setError(`Error: ${error.message}!`);
    }
  }

  editPalette = async (paletteBody, currProjectId, currPaletteId) => {
    const options = fetchOptions("PUT", paletteBody);
    try {
      await apiCall(`palettes/${currPaletteId}`, options);
      await this.props.changePalette({
        ...paletteBody, 
        project_id: currProjectId, 
        id: currPaletteId 
      });
    } catch (error) {
      this.props.setError(`Error: ${error.message}!`);
    }  
  }

  hexToRgb = hex => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  evalutateLightOrDark = hex => {
    if (hex.length) {
      const rbg = this.hexToRgb(hex);
      const hsp = Math.sqrt(
        0.299 * (rbg.r * rbg.r) +
        0.587 * (rbg.g * rbg.g) +
        0.114 * (rbg.b * rbg.b)
        );
      if (hsp > 127.5) {
        return "light";
      } else {
        return "dark";
      }
    }
  }

  renderColors = () => {
    return Object.keys(this.state).map(key => {
      const backgroundHex = this.state[key].color.toUpperCase();
      const backgroundStyle = { backgroundColor: `#${backgroundHex}`}
      const brightness = this.evalutateLightOrDark(backgroundHex);
      const colorClass = "palette-color " + brightness;
      return (
        <div
          className={colorClass}
          key={key}
          style={backgroundStyle}
        >
          <div className="lock">
            {this.lockSelect(key)}
          </div>
          <div className="hex-display">
            {backgroundStyle.backgroundColor}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <main className="palette-picker">
        <div className="picker-display">
          {this.renderColors()}
        </div>
        <div className="projects-display">
          <Projects
            checkForSameName={this.checkForSameName} 
            setError={this.props.setError} 
            clearError={this.props.clearError}
            error={this.props.error}
          />
        </div>
        <div className="control-display">
          <Control
            checkForSameName={this.checkForSameName}
            randomizeColors={this.randomizeColors}
            savePalette={this.savePalette}
            currPaletteCheck={this.currPaletteCheck}
          />
        </div>
        <div className="palettes-display">
          <Palettes
            setPaletteDisplay={this.setPaletteDisplay}
          />
        </div>
      </main>
    );
  }
}

PalettePicker.propTypes = {
  error: PropTypes.string,
  setError: PropTypes.func,
  clearError: PropTypes.func
};

export const mapStateToProps = state => ({
  currPaletteId: state.currentPalette,
  currProjectId: state.currentProject,
  palettes: state.palettes,
  projects: state.projects
});

export const mapDispatchToProps = dispatch => ({
  addPalette: palette => dispatch(addPalette(palette)),
  changePalette: palette => dispatch(changePalette(palette))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PalettePicker);