import React, { Component } from "react";
import { connect } from "react-redux";
import { addPalette, changePalette } from "../../Actions"
import { apiCall, createOptions } from "../../Utils/API";
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
      color5: { color: "", isLocked: false },
    };
  }

  componentDidMount = () => {
    this.randomizeColors();
  }

  randomizeColors = () => {
    let newState = {};
    Object.keys(this.state).forEach(key => {
      if (this.state[key].isLocked) {
        newState[key] = this.state[key];
      } else {
        newState[key] = { color: this.randomizeHexCode(), isLocked: false };
      }
    });
    this.setState(newState);
  }

  setPaletteDisplay = async () => {
    const palette = await this.currPaletteCheck(this.props.currPaletteId);
    if (palette.id !== 0) {
      this.setColors(true, palette);
    } else {
      this.setColors(false, palette);
    }
  }

  setColors = (lockStatus, palette) => {
    let paletteUpdate = {};
    if (palette.id !== 0) {
      Object.keys(this.state).forEach(key => {
        paletteUpdate[key] = { 
          color: palette[key], 
          isLocked: lockStatus 
        };
      });
    } else {
      Object.keys(this.state).forEach(key => {
        paletteUpdate[key] = { 
          color: this.state[key].color, 
          isLocked: lockStatus 
        };    
      });
    }
    this.setState(paletteUpdate);
  }

  randomizeHexCode = () => {
    let randomColor = "000000".replace(/0/g, function() {
      return Math.floor(Math.random() * 16).toString(16);
    });
    return randomColor;
  }

  currPaletteCheck = id => {
    if (this.props.palettes.length && id !== 0) {
      return this.props.palettes.find(palette => palette.id === id);
    } else {
      return { id: 0 };
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
    let lockClass = "fas fa-lock";
    if (!this.state[color].isLocked) lockClass += "-open"; 
    return (
      <i 
        className={lockClass} 
        onClick={() => this.toggleLock(color)} 
      />
    );
  }

  checkForSameName = (name, type) => {
    const itemsToCheckAgainst = this.props[type];
    let nameToSend = name;
    let similarNamedItems = [];
    if (itemsToCheckAgainst.length) {
      itemsToCheckAgainst.forEach(item => {
        const nameWithoutRepeatNum = item.name.split("<")[0];
        if (nameWithoutRepeatNum === name.split("<")[0]) {
          similarNamedItems.push(item);
        }
      });
    }
    if (similarNamedItems.length) nameToSend = name + "<" + similarNamedItems.length + ">";
    return nameToSend;     
  }

  savePalette = name => {
    const paletteBody = this.buildPaletteBody(name);
    if (this.props.currPaletteId !== 0) {
      this.editPalette(paletteBody);
    } else {
      this.makeNewPalette(paletteBody);
    }
  }

  buildPaletteBody = name => {
    let bodyToSend = { name };
    Object.keys(this.state).forEach(key => {
      bodyToSend[key] = this.state[key].color;
    });
    return bodyToSend;
  }

  makeNewPalette = async (paletteBody) => {
    const { currProjectId } = this.props;
    const options = createOptions("POST", paletteBody);
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

  editPalette = async (paletteBody) => {
    const { currProjectId, currPaletteId } = this.props;
    const options = createOptions("PUT", paletteBody);
    try {
      await apiCall(`palettes/${currPaletteId}`, options);
      let paletteToSend = {
        ...paletteBody, 
        project_id: currProjectId, 
        id: currPaletteId 
      }
      await this.props.changePalette({
        ...paletteBody, 
        project_id: currProjectId, 
        id: currPaletteId 
      });
    } catch (error) {
      this.props.setError(`Error: ${error.message}!`);
    }  
  }

  hexToRbg = hex => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  evaluateLightOrDark = rbg => {
    if (rbg) {
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

  capitalize = str => {
    return str.toUpperCase();
  }

  renderColors = () => {
    return Object.keys(this.state).map(key => {
      const backgroundHex = this.capitalize(this.state[key].color);
      const rbg = this.hexToRbg(backgroundHex);
      const backgroundStyle = { backgroundColor: `#${backgroundHex}`};
      const brightness = this.evaluateLightOrDark(rbg);
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
            setError={this.props.setError} 
          />
        </div>
      </main>
    );
  }
}

PalettePicker.propTypes = {
  setError: PropTypes.func,
  clearError: PropTypes.func,
};

export const mapStateToProps = state => ({
  currPaletteId: state.currentPalette,
  currProjectId: state.currentProject,
  palettes: state.palettes,
  projects: state.projects,
});

export const mapDispatchToProps = dispatch => ({
  addPalette: palette => dispatch(addPalette(palette)),
  changePalette: palette => dispatch(changePalette(palette)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PalettePicker);