import React from "react";
import { PalettePicker } from "./PalettePicker";
import { mapStateToProps } from "./PalettePicker";
import { mapDispatchToProps } from "./PalettePicker";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { addPalette } from "../../Actions/index"
import { changePalette } from "../../Actions/index"

describe("PalettePicker", () => {
  let wrapper;
  let mockPalettes = [{ name: "Tom", projectId: 4 }];
  beforeEach(() => {
    wrapper = shallow(<PalettePicker palettes={mockPalettes} />);
  });

  it("should have default state", () => {
    expect(wrapper.state()).toBeTruthy()
  });

  it("should map dispatch to props", () => {
    const mockPalette = {name: "Tommy", projectId: 4}
    const mockDispatch = jest.fn();
    const actionToDispatch = addPalette(mockPalette);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addPalette(mockPalette);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it("should map dispatch to props", () => {
    const mockPalette = {name: "Tommy", projectId: 4}
    const mockDispatch = jest.fn();
    const actionToDispatch = changePalette(mockPalette);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.changePalette(mockPalette);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});