import React from "react";
import { PalettePicker } from "./PalettePicker";
import { mapDispatchToProps, mapStateToProps } from "./PalettePicker";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { addPalette, changePalette } from "../../Actions/index"
import * as api from "../../Utils/API"

describe("PalettePicker", () => {
  let wrapper;
  let mockPalettes = [{ id: 44, name: "Tom", projectId: 4 }];
  let mockCurrentPalette = 7
  let mockCurrentProject = 2
  
  beforeEach(() => {
    wrapper = shallow(<PalettePicker 
      palettes={mockPalettes} 
      changePalette={jest.fn()}
      currentPalette={mockCurrentPalette}
      currenProject={mockCurrentProject}
    />);
  });

  it("should have default state", () => {
    expect(wrapper.state()).toBeTruthy();
  })

  it("should call randomizeColors", () => {
    jest.spyOn(wrapper.instance(), "randomizeColors");
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().randomizeColors).toHaveBeenCalled();
})

  it("should edit a palette", () => {
    let mockBody = {
      color1: "red",
      color2: "yellow",
      color3: "blue",
      color4: "green",
      color5: "purple",
      name: "Editted"
    };
    let mockProjId = 2;
    api.updatePalette = jest.fn();
    wrapper.instance().editPalette(mockBody, mockProjId);
    expect(api.updatePalette).toHaveBeenCalled();
  })

  it("should make a new palette", () => {
    let mockBody = {
      color1: "red",
      color2: "yellow",
      color3: "blue",
      color4: "green",
      color5: "purple",
      name: "New"
    };
    let mockProjId = 2;
    api.addNewPalette = jest.fn();
    wrapper.instance().makeNewPalette(mockBody, mockProjId);
    expect(api.addNewPalette).toHaveBeenCalled();
  })

  it.skip("should save a palette", () => {
    wrapper.setState({
      color1: "red",
      color2: "yellow",
      color3: "blue",
      color4: "green",
      color5: "purple",
      name: "New"
    });
    let determineIfNew = jest.fn(() => true);
    api.addNewPalette = jest.fn(() => (
      {color1: "red",
      color2: "yellow",
      color3: "blue",
      color4: "green",
      color5: "purple",
      id: 234,
      name: "New"}
    ));

    expect(api.addNewPalette).toHaveBeenCalled();
  })

  describe("mapDispatchToProps", () => {
    it("should add a palette", () => {
      const mockPalette = { name: "Tommy", projectId: 4 };
      const mockDispatch = jest.fn();
      const actionToDispatch = addPalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addPalette(mockPalette);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it("should change palette", () => {
      const mockPalette = { name: "Tommy", projectId: 4 };
      const mockDispatch = jest.fn();
      const actionToDispatch = changePalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.changePalette(mockPalette);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })

  describe("mapStateToProps", () => {
    it("should return a state object", () => {
      const mockState = {
        projects: [{ name: "Tom" }],
        palettes: [{ name: "Mason", projectId: 4 }],
        currentProject: 4,
        currentPalette: 5,
        addedState: "mockState"
      };
      const expected = {
        projects: [{ name: "Tom" }],
        palettes: [{ name: "Mason", projectId: 4 }],
        currentProject: 4,
        currentPalette: 5
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })
})