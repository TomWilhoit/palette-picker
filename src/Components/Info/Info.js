import React, { Component } from "react";

export class Info extends Component { 

  handleClick = (e) => {
    if (e.target.className.includes("close")) {
      this.props.toggleInfo();
    }
  }

  render() {
    return (
      <div className="modal close" id="one" onClick={(e) => this.handleClick(e)}>
        <div className="info-container">
          <h1>
            Instructions
            <div 
            className="close-info-btn close" 
            onClick={(e) => this.handleClick(e)}
            >
              <i className="fas fa-times close"></i>
            </div>
          </h1>
          <p>Thanks for checking out Palette Picker!</p>
          <p>First, look to the panel on the right side to Create a project, or select a saved project.</p>
          <p>Once you have selected a project, if it contains any saved palettes, they will show up in the box below.</p>
          <p>Either select a saved Palette to see its colors in the main console and make any adjustments you wish...</p>
          <p>Or make sure the 'Create New Palette' Button is highlighted to start a brand new palette.</p>
          <p>If a saved Palette is selected, you will need to 'unlock' colors to change them by clicking locks in the main panel.</p>
          <p>Likewise, if starting a new Palette, you may click the locks to lock in colors so that they will not change if continuing to mix the palette.</p>
          <p>Clicking the 'Mix Palette' button randomized any unlocked colors!</p>
          <p>Name your new Palette, then click Submit to save the palette and its name.</p>
          <p>If you are working with a previously saved Palette, its name will be kept by default, or you can type in a new name before you hit submit to rename a palette.</p>
        </div>
      </div>
    )  
  }
}