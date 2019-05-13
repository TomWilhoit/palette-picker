import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePalette, addNewPalette } from "../../Utils/API";
import { addPalette, changePalette } from "../../Actions"
import Projects from "../Projects/Projects";
import Palettes from "../Palettes/Palettes";
import Control from "../Control/Control";

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

  setColors = async () => {
    let palette = await this.findPalette();
    if (palette) {
      this.setState({
        color1: { color: `${palette.color1}`, isLocked: false },
        color2: { color: `${palette.color2}`, isLocked: false },
        color3: { color: `${palette.color3}`, isLocked: false },
        color4: { color: `${palette.color4}`, isLocked: false },
        color5: { color: `${palette.color5}`, isLocked: false }
      });
    } else {
      this.randomizeColors()
    }
  };

  randomizeHexCode = () => {
    let randomColor = "000000".replace(/0/g, function() {
      return Math.floor(Math.random() * 16).toString(16);
    });
    return randomColor;
  };

  findPalette = () => {
    return this.props.palettes.find(
      palette => palette.id === this.props.currentPalette
    );
  };

  showPaletteName = async () => {
    let currPalette = await this.findPalette();
    if (currPalette) {
      let paletteName = currPalette.name;
      this.updateName(paletteName);
    } else {
      this.updateName("Select a Palette")
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
        <i className="fas fa-lock" onClick={() => this.toggleLock(color)} />
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

  savePalette = async () => {
    let newPalette = true;
    const projectId = this.props.currentProject;
    const newPaletteBody = {
      color1: `${this.state.color1.color}`,
      color2: `${this.state.color2.color}`,
      color3: `${this.state.color3.color}`,
      color4: `${this.state.color4.color}`,
      color5: `${this.state.color5.color}`,
      name: this.state.paletteName
    };
    this.props.palettes.forEach(palette => {
      if (palette.id === this.props.currentPalette) {
        newPalette = false;
      }
    });
    if (newPalette) {
      let addedId = await addNewPalette(newPaletteBody, projectId);
      this.props.addPalette({...newPaletteBody, project_id: projectId, id: addedId.id})
    } else {
      const id = this.props.currentPalette;
      updatePalette(newPaletteBody, id);
      this.props.changePalette({...newPaletteBody, project_id: projectId, id})
    }
  };

  render() {
    let renderColors = Object.keys(this.state).map(color => {
      if (color.includes("color")) {
        return (
          <div
            className="color-box"
            name={color}
            key={color}
            style={this.backgroundSelect(color)}
          >
            {this.lockSelect(color)}
          </div>
        );
      }
    });

    return (
      <main className="palette-picker">
        <div className="picker-display">{renderColors}</div>
        <div className="projects-display">
          <Projects />
        </div>
        <div className="control-display">
          <Control
            randomizeColors={this.randomizeColors}
            paletteName={this.state.paletteName}
            updateName={this.updateName}
            savePalette={this.savePalette}
          />
        </div>
        <div className="palettes-display">
          <Palettes
            setColors={this.setColors}
            showPaletteName={this.showPaletteName}
          />
        </div>
      </main>
    );
  }
}

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
