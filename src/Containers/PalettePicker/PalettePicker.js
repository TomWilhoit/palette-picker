import React, { Component } from "react";

export class PalettePicker extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const color = "2ab0fb";
    const backgroundColor = { backgroundColor: `#${color}` };

    return (
      <main className="palette-picker">
        <div className="color-box color1" style={backgroundColor} />
        <div className="color-box color2" style={backgroundColor} />
        <div className="color-box color3" style={backgroundColor} />
        <div className="color-box color4" style={backgroundColor} />
        <div className="color-box color5" style={backgroundColor} />
      </main>
    );
  }
}
