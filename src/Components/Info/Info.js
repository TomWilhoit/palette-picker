import React, { Component } from "react";
import { InstructionBox } from "../InstructionBox/InstructionBox"

export class Info extends Component { 

  handleClick = (e) => {
    var { className } = e.target
    if (className.includes("close")) {
      this.props.hideInfo(e);
    }
    if (className.includes("instruction-step")) {
        let infoType = className.split(" ").find(word => !word.includes("instruction-step"));
        let infoElement = document.querySelector(`#${infoType}`)
        infoElement.classList.toggle('show-info')
    }
  }

  render() {
    return (
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
                Create/select Projects and Palettes on the right.
                Mix/name/save Palettes on the bottom.
                Check detailed instructions by clicking the steps below:
              </p>
              <div 
                className="instruction-step project-step"
                onClick={(e) => this.handleClick(e)}
              >
                1. Create/Select Project 
                <div className="project-info detail-box" id="project-step">
                  <InstructionBox
                    message="First, create or select a project. On the top right area of the console, you can type a project name in the input and click the green plus button next to it to create a new project. Below this input in a scroll box, you can click newly created or previously saved projects to select them."
                  />
                </div>
              </div>
              <div 
                className="instruction-step palette-step"
                onClick={(e) => this.handleClick(e)}
              >
                2. Create/Select Palette
                <div className="palette-info detail-box" id="palette-step">
                  <InstructionBox
                    message="Next, choose whether to create a palette or select a saved palette. On the lower right area of the console, either click a previously saved palette in the scroll box, or the bar above that says 'Create New Palette', highlighted by default." 
                    id="palette-info"
                  />
                </div>
              </div>
              <div 
                className="instruction-step mix-step"
                onClick={(e) => this.handleClick(e)}
              >
                3. Make a Color Palette!
                <div className="mix-info detail-box" id="mix-step">
                  <InstructionBox
                    message=" Now, we are ready to make a palette! On the bottom of the screen, double check which project and Palette you have selected, unlock colors you'd like to replace and lock any colors you'd like to keep by toggling the locks each color, then click the 'Mix Palette!' button to randomize unlocked colors. New palettes start with all colors unlocked, but saved palettes start with colors locked. To save a palette, name it in the input on the bottom of the screen and click submit. Previously saved palettes do not need to be named again, but if a new name is entered in the input, the palette will be renamed upon submission."
                    id="mix-info"
                  />
                </div>
              </div>
            </main>
          </section>
        </div>
    )  
  }
}