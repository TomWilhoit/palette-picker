import React, { Component } from "react";
import { InstructionBox } from "../InstructionBox/InstructionBox"

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
      this.props.hideInfo(e);
    }
    if (className.includes("instruction-step")) {
      let infoType = className.split(" ").find(word => !word.includes("instruction-box"));
      this.toggleInfoBox(infoType);
    }
  }

  toggleInfoBox = (infoType) => {
    this.setState({ [infoType]: !this.state[infoType] });
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
                className="showProjectInstruction instruction-step"
                onClick={(e) => this.handleClick(e)}
              >
                1. Create/Select Project 
                {this.state.showProjectInstruction &&
                  <InstructionBox
                    message="On the top right hand side of the screen, you can make a new project by entering a name and clicking the green + next to the input. You also select an existing project by clicking and highlighting it in the scroll box below the input."
                  />
                }
              </div>
              <div 
                className="showPaletteInstruction instruction-step"
                onClick={(e) => this.handleClick(e)}
              >
                2. Create/Select Palette
                {this.state.showPaletteInstruction &&                
                  <InstructionBox
                    message="On the lower right hand side, please either select an existing palette, or click and highlight the bar that says 'Create New Palette', which is highlighted by default. The palette you selected should appear on the center console." 
                />
                }
              </div>
              <div 
                className="showMixInstruction instruction-step"
                onClick={(e) => this.handleClick(e)}
              >
                3. Make a Color Palette!
                {this.state.showMixInstruction &&
                  <InstructionBox
                    message="On the bottom of the screen, you can check which project and Palette you have selected, then click the 'Mix Palette!' button to randomize colors. Only unlocked colors will change. You can toggle the lock on individual colors by clicking the lock icon on the color. By default, new palettes start with all colors unlocked, whereas saved palettes start with all colors locked. For new palettes, give it a name in the input on the bottom of the screen and hit submit to save it. For saved palettes, clicking submit will save any updates made to colors and will rename the palette if you type a new name in the input."
                />
                }
              </div>
            </main>
          </section>
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