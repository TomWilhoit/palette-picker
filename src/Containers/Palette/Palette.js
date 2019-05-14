import React, { Component } from "react";
import { connect } from "react-redux";
import { addCurrentPalette, removePalette } from "../../Actions/index";
import { deletePalette } from "../../Utils/API";

export class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
    const { name } = this.props
    const renderPalette = this.makePreviewPalette();

    return(
      <div className="palette">
        <div className="click-container" onClick={() => this.handleClick()}>
          <div className="palette-name">
            <h4>{name}</h4>
          </div>
          <div className="palette-preview">
            {renderPalette}
          </div>
        </div>
        <button onClick={this.handleDelete}><i class="fas fa-times"></i></button>
      </div>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  addCurrentPalette: palette => dispatch(addCurrentPalette(palette)),
  removePalette: palette => dispatch(removePalette(palette))
})

export default connect(null, mapDispatchToProps)(Palette)