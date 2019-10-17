import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePalette, addNewPalette } from "../../Utils/API";
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
      color5: { color: "", isLocked: false },
      paletteName: ""
    };
  }

  componentDidMount = () => {
    this.randomizeColors();
  };

  randomizeColors = () => {
    Object.keys(this.state).forEach(color => {
      if (color.includes("color")) {
        if (!this.state[color].isLocked) {
          this.setState({
            [color]: { color: this.randomizeHexCode(), isLocked: false }
          });
        }
      }
    });
  };

  setPaletteDisplay = async () => {
    let palette = await this.findPalette();
    if (palette) {
      this.setState({
        color1: { color: palette.color1, isLocked: true },
        color2: { color: palette.color2, isLocked: true },
        color3: { color: palette.color3, isLocked: true },
        color4: { color: palette.color4, isLocked: true },
        color5: { color: palette.color5, isLocked: true }
      });
    } else {
      this.setState({
        color1: { color: this.state.color1.color, isLocked: false },
        color2: { color: this.state.color2.color, isLocked: false },
        color3: { color: this.state.color3.color, isLocked: false },
        color4: { color: this.state.color4.color, isLocked: false },
        color5: { color: this.state.color5.color, isLocked: false }
      });
    }
  };

  randomizeHexCode = () => {
    let randomColor = "000000".replace(/0/g, function() {
      return Math.floor(Math.random() * 16).toString(16);
    });
    return randomColor;
  };

  findPalette = () => {
    if (this.props.palettes) {
      return this.props.palettes.find(
        palette => palette.id === this.props.currentPalette
      );
    }
  };

  showPaletteName = async () => {
    let currPalette = await this.findPalette();
    if (currPalette) {
      let paletteName = currPalette.name;
      this.updateName(paletteName);
    } else {
      this.updateName("");
    }
  };

  updateName = name => {
    this.setState({ paletteName: name });
  };

  toggleLock = color => {
    this.setState({
      [color]: {
        color: this.state[color].color,
        isLocked: !this.state[color].isLocked
      }
    });
  };

  backgroundSelect = color => {
    return { backgroundColor: `#${this.state[color].color}` };
  };

  lockSelect = color => {
    if (this.state[color].isLocked) {
      return (
        <i 
          className="fas fa-lock" 
          onClick={() => this.toggleLock(color)} 
        />
      );
    } else {
      return (
        <i
          className="fas fa-lock-open"
          onClick={() => this.toggleLock(color)}
        />
      );
    }
  };

  determineIfNew = id => {
    let isNew = true;
    this.props.palettes.forEach(palette => {
      if (palette.id === id) {
        isNew = false;
      }
    });
    return isNew;
  }

  savePalette = name => {
    const projectId = this.props.currentProject;
    const newPaletteBody = {
      color1: this.state.color1.color,
      color2: this.state.color2.color,
      color3: this.state.color3.color,
      color4: this.state.color4.color,
      color5: this.state.color5.color,
      name
    };
    const isNewPalette = this.determineIfNew(this.props.currentPalette)
    if (isNewPalette) {
      this.makeNewPalette(newPaletteBody, projectId);
    } else {
      this.editPalette(newPaletteBody, projectId);
    }
  };

  makeNewPalette = async (newPaletteBody, projectId) => {
    let addedPalette = await addNewPalette(newPaletteBody, projectId);
    this.props.addPalette({...newPaletteBody, project_id: projectId, id: addedPalette.id});
  }

  editPalette = (newPaletteBody, projectId) => {
      const id = this.props.currentPalette;
      updatePalette(newPaletteBody, id);
      this.props.changePalette({...newPaletteBody, project_id: projectId, id});
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
        return 'light';
      } else {
        return 'dark';
      }
    }
  }

  renderColors = () => {
    return Object.keys(this.state).map(key => {
      if (key.includes("color")) {
        let backgroundColor = this.backgroundSelect(key);
        let printHex = backgroundColor.backgroundColor.split('').map(letter => {
          return letter.toUpperCase()
        }).join('');
        let lightOrDark = this.evalutateLightOrDark(this.state[key].color);
        let colorClass = "palette-color " + lightOrDark;
        return (
          <div
            className={colorClass}
            name={key}
            key={key}
            style={backgroundColor}
          >
            <div className="lock">
              {this.lockSelect(key)}
            </div>
            <div className="hex-display">
              {printHex}
            </div>
          </div>
        );
      }
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
            setError={this.props.setError} 
            clearError={this.props.clearError}
            error={this.props.error}
          />
        </div>
        <div className="control-display">
          <Control
            randomizeColors={this.randomizeColors}
            updateName={this.updateName}
            savePalette={this.savePalette}
            findPalette={this.findPalette}
          />
        </div>
        <div className="palettes-display">
          <Palettes
            setPaletteDisplay={this.setPaletteDisplay}
            showPaletteName={this.showPaletteName}
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
  currentPalette: state.currentPalette,
  currentProject: state.currentProject,
  palettes: state.palettes
});

export const mapDispatchToProps = dispatch => ({
  addPalette: palette => dispatch(addPalette(palette)),
  changePalette: palette => dispatch(changePalette(palette))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PalettePicker);
