import React, { Component } from "react";
import { ProjectInstruction } from "../ProjectInstruction/ProjectInstruction"
import { PaletteInstruction } from "../PaletteInstruction/PaletteInstruction"
import { MixInstruction } from "../MixInstruction/MixInstruction"

export class Info extends Component { 
  constructor() {
    super();
    this.state = {   
      showProjectInstruction: false,
      showPaletteInstruction: false,
      showMixInstruction: false
    };
  }

  handleClick = (e) => {
    var { className } = e.target
    if (className.includes("close")) {
      this.props.toggleInfo();
    }
    if (className.includes("instruction-box")) {
      let infoType = className.split(" ").find(word => !word.includes("instruction-box"));
      this.toggleInfoBox(infoType);
    }
  }

  toggleInfoBox = (infoType) => {
    this.setState({ [infoType]: !this.state[infoType] });
  }

  render() {
    return (
      <div className="modal close" id="one" onClick={(e) => this.handleClick(e)}>
        <div className="info-container">
          <section>
            <header>
              <h1>Instructions</h1>
              <div 
                className="close-info-btn close" 
                onClick={(e) => this.handleClick(e)}
              >
                <i className="fas fa-times close"></i>
              </div>
              <h4>Thank you for checking out Palette Picker!</h4>
            </header>
            <main>
              <p>
                Create/select Projects and Palettes on the console to the right.
                Mix/name Palettes on the bottom of the screen.
                More detailed Instrutions below:
              </p>
              <div 
                className="showProjectInstruction instruction-box"
                onClick={(e) => this.handleClick(e)}
              >
                1. Create/Select Project 
              </div>
              {this.state.showProjectInstruction &&
                <ProjectInstruction />
              }
              <div 
                className="showPaletteInstruction instruction-box"
                onClick={(e) => this.handleClick(e)}
              >
                2. Create/Select Palette
              </div>
              {this.state.showPaletteInstruction &&                
                <PaletteInstruction />
              }
              <div 
                className="showMixInstruction instruction-box"
                onClick={(e) => this.handleClick(e)}
              >
                3. Make a Color Palette!
              </div>
              {this.state.showMixInstruction &&
                <MixInstruction />
              }
            </main>
          </section>
        </div>
      </div>
    )  
  }
}
  
  /* <p>To begin, find the projects and palettes panel on the right side.</p>
    <p>First, Create a project, or select a saved project.</p>
    <p>Any saved palettes the selected project contains will appear in the box below.</p>
    <p>Now, click on a saved Palette if you wish to see its colors in the main console, or click and highlight 'Create New Palette' to start a brand new one!</p>
    <p>For saved Palettes, colors will need to be unlocked before change.</p>
    <p>For a new Palette, you may lock colors in place while continuing to mix the rest of the palette.</p>
    <p>Toggle these locks by clicking on individual lock icon in each color on the console.</p>
    <p>Clicking the 'Mix Palette' button randomized any unlocked colors!</p>
    <p>To save a palette, type a name for it in the input, then click Submit.</p>
  <p>When working on a previously saved Palette, the same name will be kept by default on a submit, but you can also submit a new name.</p> */