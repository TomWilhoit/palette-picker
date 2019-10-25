import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCurrentPalette, removePalette } from "../../Actions/index";
import { apiCall, createOptions } from "../../Utils/API";
import PropTypes from "prop-types";

export class Palette extends Component {

  handleClick = async () => {
    await this.props.updateCurrentPalette(this.props.id);
    this.props.setPaletteDisplay();
  }

  erasePalette = id => {
    this.props.removePalette(id);
    this.deletePalette(id);
  }

  deletePalette = async id => {
    const options = createOptions("DELETE", {id: id});
    try {
      await apiCall(`palettes/${id}`, options);
    } catch (error) {
      this.props.setError(`Error: ${error.message}!`);
    }
  }

  handleDelete = e => {
    e.preventDefault();
    const { id } = this.props;
    this.erasePalette(id);
  }

  choosePaletteClass = () => {
    let paletteClass = "palette";
    if (this.props.currentPalette === this.props.id) {
      paletteClass += " active-palette";
    }
    if (this.props.id === 0) {
      paletteClass += " new-palette";
    }
    return paletteClass;
  }

  makePreviewPalette = () => {
    return Object.keys(this.props).filter(key => key.includes("color")).map(key => {
      const styleClass = key + " color-preview"; 
      const backgroundHex = { backgroundColor: `#${this.props[key]}` };
      return (
        <div
          className={styleClass} 
          key={key + backgroundHex}
          style={backgroundHex}
        >
        </div>
      );
    });
  }

  render() {
    return(
      <div className={this.choosePaletteClass()}>
        <div 
          className="click-container" 
          onClick={() => this.handleClick()}
        >
          <div className="palette-name">
            <h4>{this.props.name}</h4>
          </div>
          {this.props.id !== 0 &&
            <div className="palette-preview">
              {this.makePreviewPalette()}
            </div>
          }
        </div>
        {this.props.id !== 0 &&
          <div className="delete-palette">
            <button onClick={this.handleDelete}>
              <i className="fas fa-times" />
            </button> 
          </div>
        }
      </div>
    );
  }
}

Palette.propTypes = {
  color1: PropTypes.string,
  color2: PropTypes.string,
  color3: PropTypes.string,
  color4: PropTypes.string,
  color5: PropTypes.string,
  name: PropTypes.string,
  setError: PropTypes.func,
  setPaletteDisplay: PropTypes.func,
  showPaletteName: PropTypes.func,
};

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette,
});

export const mapDispatchToProps = dispatch => ({
  updateCurrentPalette: palette => dispatch(updateCurrentPalette(palette)),
  removePalette: palette => dispatch(removePalette(palette)),
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Palette);