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
    this.props.setColors();
    this.props.showPaletteName();
  };

  erasePalette = (id) => {
    this.props.removePalette(id);
    deletePalette(id);
  };

  handleDelete = (e) => {
    e.preventDefault();
    const id = this.props.id;
    this.erasePalette(id);
  };

  render() {
    const color1 = { backgroundColor: `#${this.props.color1}` }
    const color2 = { backgroundColor: `#${this.props.color2}` }
    const color3 = { backgroundColor: `#${this.props.color3}` }
    const color4 = { backgroundColor: `#${this.props.color4}` }
    const color5 = { backgroundColor: `#${this.props.color5}` }

    return(
      <div className="palette" onClick={() => this.handleClick()}>
        <div className="palette-name">
          <h4>{this.props.name}</h4>
        </div>
        <div className="palette-preview">
          <div className="color-box-preview color1" style={color1}></div>
          <div className="color-box-preview color2" style={color2}></div>
          <div className="color-box-preview color3" style={color3}></div>
          <div className="color-box-preview color4" style={color4}></div>
          <div className="color-box-preview color5" style={color5}></div>
        </div>
        <button onClick={this.handleDelete}>Remove Palette</button>
      </div>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  addCurrentPalette: palette => dispatch(addCurrentPalette(palette)),
  removePalette: palette => dispatch(removePalette(palette))
})

export default connect(null, mapDispatchToProps)(Palette)