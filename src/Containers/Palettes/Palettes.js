import React, { Component } from "react";
import Palette from "../Palette/Palette";
import { connect } from "react-redux";
import { updateCurrentPalette } from "../../Actions";
import PropTypes from "prop-types";

export class Palettes extends Component {

  renderPalettes = currProject => {
    if (this.props.palettes.length) {
      const palettes = this.props.palettes.filter(palette => palette.project_id === currProject);
      return palettes.map(palette => (
        <Palette
          color1={palette.color1}
          color2={palette.color2}
          color3={palette.color3}
          color4={palette.color4}
          color5={palette.color5}
          id={palette.id}
          key={palette.id}
          name={palette.name}
          setError={this.props.setError} 
          setPaletteDisplay={this.props.setPaletteDisplay}
          showPaletteName={this.props.showPaletteName}
        />
      ));
    }
  }

  render() {
    return (
      <div className="palettes-console">
        <div className="create-new-palette">
          <Palette
            color1="FEFEFE"
            color2="FEFEFE"
            color3="FEFEFE"
            color4="FEFEFE"
            color5="FEFEFE" 
            id={0}
            key={0}
            name="Create New Palette"
            setError={this.props.setError} 
            setPaletteDisplay={this.props.setPaletteDisplay}
            showPaletteName={this.props.showPaletteName}
          />
        </div>
        <div className="saved-palettes scroll">
          {!this.props.palettes.length &&
            <div className="no-palettes">
              <p>No saved palettes.</p>
              <p>Select a project <i className="fas fa-arrow-up" /></p>
              <p>Mix/Submit palette <i className="fas fa-arrow-down" /></p>
            </div>
          }
          {this.renderPalettes(this.props.currentProject)}
        </div>
      </div>
    );
  }
}

Palettes.propTypes = {
  setPaletteDisplay: PropTypes.func,
  setError: PropTypes.func,
};

export const mapStateToProps = state => ({
  currentProject: state.currentProject,
  palettes: state.palettes,
});

export const mapDispatchToProps = dispatch => ({
  updateCurrentPalette: palette => dispatch(updateCurrentPalette(palette)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Palettes);