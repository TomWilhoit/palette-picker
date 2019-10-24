import React, { Component } from "react";
import Palette from "../Palette/Palette";
import { connect } from "react-redux";
import { updateCurrentPalette } from "../../Actions";
import PropTypes from "prop-types";

export class Palettes extends Component {
 
  refreshSelectedPalette = () => {
    this.props.updateCurrentPalette(0);
    this.props.showPaletteName();
  };

  renderProjectPalettes = currProject => {
    if (this.props.palettes.length) {
      let palettes = this.props.palettes.filter(palette => {
        return palette.project_id === currProject;
      });
      return palettes.map(palette => {
        return (
          <Palette
            key={palette.id}
            id={palette.id}
            name={palette.name}
            color1={palette.color1}
            color2={palette.color2}
            color3={palette.color3}
            color4={palette.color4}
            color5={palette.color5}
            setPaletteDisplay={this.props.setPaletteDisplay}
            showPaletteName={this.props.showPaletteName}
          />
        );
      });
    }
  };

  render() {
    return (
      <div className="palettes-console">
        <div className="create-new-palette">
          <Palette 
            id={0}
            key={0}
            name="Create New Palette"
            setPaletteDisplay={this.props.setPaletteDisplay}
            showPaletteName={this.props.showPaletteName}
          />
        </div>
        <div className="saved-palettes scroll">
          {!this.props.palettes.length &&
            <div className="no-palettes">
              <p>No saved palettes.</p>
              <p>Select a project <i className="fas fa-arrow-up"></i></p>
              <p>Mix/Submit palette <i className="fas fa-arrow-down"></i></p>
            </div>
          }
          {this.renderProjectPalettes(this.props.currentProject)}
        </div>
      </div>
    );
  }
}

Palettes.propTypes = {
  setPaletteDisplay: PropTypes.func
};

export const mapStateToProps = state => ({
  currentProject: state.currentProject,
  palettes: state.palettes
});

export const mapDispatchToProps = dispatch => ({
  updateCurrentPalette: palette => dispatch(updateCurrentPalette(palette))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Palettes);
