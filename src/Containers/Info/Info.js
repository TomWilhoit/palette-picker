import React, { Component } from "react";
import { InstructionBox } from "../../Components/InstructionBox/InstructionBox"

export class Info extends Component { 

  handleClick = (e) => {
    var { className } = e.target;
    if (className.includes("close")) {
      this.props.hideInfo(e);
    }
    if (className.includes("instruction-step")) {
      this.toggleDetail(className); 
    }
    if (className.includes("instruction-box")) {
      let selectedElement = e.target.parentElement.parentElement.className;
      this.closeDetail(selectedElement);
    }
  }

  toggleDetail = (className) => {
    let infoType = className.split(" ").find(word => !word.includes("instruction-step"));
    let infoElement = document.querySelector(`#${infoType}`);
    let arrow = document.querySelector(`.${infoType}`).children[0];
    arrow.classList.toggle('arrow-down');
    infoElement.classList.toggle('show-info');
  }

  closeDetail = (selectedElement) => {
    let infoType = selectedElement.split(" ").find(word => !word.includes("instruction-step"));
    let infoElement = document.querySelector(`#${infoType}`);
    let arrow = document.querySelector(`.${infoType}`).children[0];
    arrow.classList.remove('arrow-down');
    infoElement.classList.remove('show-info');
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
              Create or select Projects and Palettes on the right.
              Mix, name, or save Palettes on the bottom.
              Detailed instructions below:
            </p>
            <div 
              className="instruction-step project-step"
              onClick={(e) => this.handleClick(e)}
            >
              1. Create/Select Project <div className="arrow">></div>
              <div className="project-info detail-box" id="project-step" onClick={(e) => this.handleClick(e)}
>
                <InstructionBox
                  message="First, create or select a project. On the top right area of the console, you can type a project name in the input and click the green plus button next to it to create a new project. Below this input in a scroll box, you can click newly created or previously saved projects to select them."
                />
              </div>
            </div>
            <div 
              className="instruction-step palette-step"
              onClick={(e) => this.handleClick(e)}
            >
              2. Create/Select Palette <div className="arrow">></div>
              <div className="palette-info detail-box" id="palette-step"               onClick={(e) => this.handleClick(e)}
>
                <InstructionBox
                  message="Next, choose whether to create a palette or select a saved palette. On the lower right area of the console, either click a previously saved palette in the scroll box, or the bar above that says 'Create New Palette', highlighted by default." 
                />
              </div>
            </div>
            <div 
              className="instruction-step mix-step"
              onClick={(e) => this.handleClick(e)}
            >
              3. Make a Color Palette! <div className="arrow">></div>
              <div className="mix-info detail-box" id="mix-step"               onClick={(e) => this.handleClick(e)}
>
                <InstructionBox
                  message="Now, we are ready to make a palette! On the bottom of the screen, double check which project and Palette you have selected, unlock colors you'd like to replace and lock any colors you'd like to keep by toggling the locks each color, then click the 'Mix Palette!' button to randomize unlocked colors. New palettes start with all colors unlocked, but saved palettes start with colors locked. To save a palette, name it in the input on the bottom of the screen and click submit. Previously saved palettes do not need to be named again, but if a new name is entered in the input, the palette will be renamed upon submission."
                />
              </div>
            </div>
          </main>
        </section>
      </div>
    )  
  }
}