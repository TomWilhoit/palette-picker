import React from "react";
import { Palette } from "./Palette";
import { mapStateToProps } from "./Palette";
import { mapDispatchToProps } from "./Palette";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { addCurrentPalette } from "../../Actions"
import { removePalette } from "../../Actions"

describe("Palette", () => {
  let wrapper;
  let mockProjects = [{ name: "Tom" }];
  beforeEach(() => {
    wrapper = shallow(<Palette projects={mockProjects} />);
  });

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  });


  it("should map dispatch to props", () => {
    const mockPalette = {name: "Tommy", projectId: 4}
    const mockDispatch = jest.fn();
    const actionToDispatch = addCurrentPalette(mockPalette);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addCurrentPalette(mockPalette);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it("should map dispatch to props", () => {
    const mockPalette = {name: "Tommy", projectId: 4}
    const mockDispatch = jest.fn();
    const actionToDispatch = removePalette(mockPalette);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.removePalette(mockPalette);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});