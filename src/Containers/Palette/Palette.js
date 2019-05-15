import React, { Component } from "react";
import { connect } from "react-redux";
import { addCurrentPalette, removePalette } from "../../Actions/index";
import { deletePalette } from "../../Utils/API";

export class Palette extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = async () => {
    await this.props.addCurrentPalette(this.props.id);
    this.props.setPaletteDisplay();
    this.props.showPaletteName();
  };

  erasePalette = id => {
    this.props.removePalette(id);
    deletePalette(id);
  };

  handleDelete = e => {
    e.preventDefault();
    const id = this.props.id;
    this.erasePalette(id);
  };

  choosePaletteClass = () => {
    if (this.props.currentPalette === this.props.id) {
      return "palette active-palette";
    } else {
      return "palette";
    }
  }

  makePreviewPalette = () => {
    return Object.keys(this.props).map(key => {
      if (key.includes("color")) {
        const hex = "#" + this.props[key];
        const background = { backgroundColor: hex };
        return(
          <div className="color-preview" 
               style={background}
               key={key + hex}
          >
          </div>
        );
      }
    });
  };

  render() {
    const { name } = this.props;
    const renderPalette = this.makePreviewPalette();

    return(
      <div className={this.choosePaletteClass()}>
        <div className="click-container" onClick={() => this.handleClick()}>
          <div className="palette-name">
            <h4>{name}</h4>
          </div>
          <div className="palette-preview">
            {renderPalette}
          </div>
        </div>
        {this.props.id != 0 &&
        <button onClick={this.handleDelete}><i className="fas fa-times"></i></button> 
        }
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  currentPalette: state.currentPalette
});

export const mapDispatchToProps = dispatch => ({
  addCurrentPalette: palette => dispatch(addCurrentPalette(palette)),
  removePalette: palette => dispatch(removePalette(palette))
});

export default connect(mapStateToProps, mapDispatchToProps)(Palette);