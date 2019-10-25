import React from "react";
import { Palette } from "./Palette";
import { mapDispatchToProps, mapStateToProps } from "./Palette";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { updateCurrentPalette, removePalette } from "../../Actions";

describe("Palette", () => {
  let wrapper;
  let mockProjects = [{ name: "Tom" }];
  
  beforeEach(() => {
    wrapper = shallow(<Palette projects={mockProjects} />);
  });
  describe("on load", () => {
    it("should match the snapshot with all data passed in", () => {
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe("handleClick", () => {

  })

  describe("erasePalette", () => {

  })

  describe("deletePalette", () => {

  })

  describe("handleDelete", () => {

  })

  describe("choosePaletteClass", () => {

  })

  describe("makePreviewPalette", () => {

  })

  it("should map dispatch to props", () => {
    const mockPalette = {name: "Tommy", projectId: 4};
    const mockDispatch = jest.fn();
    const actionToDispatch = updateCurrentPalette(mockPalette);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.updateCurrentPalette(mockPalette);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })

  describe("mapDispatchToProps", () => {
    it("should map dispatch to props", () => {
      const mockPalette = {name: "Tommy", projectId: 4};
      const mockDispatch = jest.fn();
      const actionToDispatch = removePalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removePalette(mockPalette);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })

  describe("mapStateToProps", () => {

  })
})