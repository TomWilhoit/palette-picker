import React, { Component } from "react";

export class Header extends Component {

  handleClick = () => {
    this.props.toggleInfo();
  }

  render() {
    return (
      <div className="header">
        <h1>Palette Picker</h1>
        <div className="info-btn" onClick={this.handleClick}>
          <i className="fa fa-info" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}