import React, { Component } from "react";
import { InstructionBox } from "../../Components/InstructionBox/InstructionBox"
import PropTypes from "prop-types";

export class Info extends Component { 

  handleClick = e => {
    const { className } = e.target;
    if (className.includes("closable")) {
      this.props.hideInfo();
    }
    if (className.includes("instruction-step")) {
      this.toggleDetail(className); 
    }
    if (className.includes("instruction-box")) {
      const selectedElement = e.target.parentElement.parentElement.className;
      this.closeDetail(selectedElement);
    }
  }

  toggleDetail = className => {
    const infoType = className.split(" ").find(word => !word.includes("instruction-step"));
    document.querySelector(`#${infoType}`)
      .classList.toggle("show-info");
    document.querySelector(`.${infoType}`).children[0]
      .classList.toggle("arrow-down");
  }

  closeDetail = selectedElement => {
    const infoType = selectedElement.split(" ").find(word => !word.includes("instruction-step"));
    document.querySelector(`#${infoType}`)
      .classList.remove("show-info");
    document.querySelector(`.${infoType}`).children[0]
      .classList.remove("arrow-down");
  }

  render() {
    return (
      <div className="info-container">
        <header>
          <h1>Instructions</h1>
          <div 
            className="close-info-btn closable" 
            onClick={e => this.handleClick(e)}
          >
            <i className="fas fa-times closable" />
          </div>
          <h4>
            Thank you for checking out Palette Picker!
          </h4>
        </header>
        <main>
          <p>
            Create or select Projects and Palettes on the right.
            Mix, name, or save Palettes on the bottom.
            Detailed instructions below:
          </p>
          <div 
            className="instruction-step project-step"
            onClick={e => this.handleClick(e)}
          >
            1. Create/Select Project 
            <div className="arrow">
              <i className="fa fa-chevron-right" aria-hidden="true" />
            </div>
            <div 
              className="project-info detail-box" 
              id="project-step" 
              onClick={e => this.handleClick(e)}
            >
              <InstructionBox
                message="First, select a project. To create a new project, type a project name in the input under 'Create New Project...' and click the adjacent plus button to save. Saved projects are listed, in a scroll box below. Click a saved project to select it."
              />
            </div>
          </div>
          <div 
            className="instruction-step palette-step"
            onClick={e => this.handleClick(e)}
          >
            2. Create/Select Palette 
            <div className="arrow">
              <i className="fa fa-chevron-right" aria-hidden="true" />
            </div>
            <div 
              className="palette-info detail-box" 
              id="palette-step" 
              onClick={e => this.handleClick(e)}
            >
              <InstructionBox
                message="Next, create a palette or select a saved palette. Below Projects, click either the 'Create New Palette' box, highlighted by default, or a previously saved palette in the scroll box below. The selected palette will appear in the main area." 
              />
            </div>
          </div>
          <div 
            className="instruction-step mix-step"
            onClick={e => this.handleClick(e)}
          >
            3. Make a Color Palette! 
            <div className="arrow">
              <i className="fa fa-chevron-right" aria-hidden="true" />
            </div>
            <div 
              className="mix-info detail-box" 
              id="mix-step" 
              onClick={e => this.handleClick(e)}
            >
              <InstructionBox
                message="Verify selected Project and Palette in the lower console. Next, choose colors to replace by clicking the locks on each color to toggle between unlocked and locked. New palettes start unlocked; Saved palettes start locked. Now, randomize unlocked colors by clicking 'Mix Palette!' button. To save palette, type a name in the lower console input and click submit. If working on a previously saved palette, no need to type a name before submitting color edits, but typing a name in the input before submission will rename."
              />
            </div>
          </div>
        </main>
      </div>
    );  
  }
}

Info.propTypes = {
  hideInfo: PropTypes.func
};