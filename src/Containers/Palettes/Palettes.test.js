import React from "react";
import { Palettes } from "./Palettes";
import { mapDispatchToProps, mapStateToProps } from "./Palettes";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { updateCurrentPalette } from "../../Actions";

describe("Palettes", () => {
  let wrapper;
  let mockPalettes = [{ name: "Tom" ,projectId: 4}];
  
  beforeEach(() => {
    wrapper = shallow(<Palettes palettes={mockPalettes} />);
  });

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })

  
  describe("mapDispatchToProps", () => {
    it("should update the current palette", () => {
      const mockPalette = { name: "Tommy", projectId: 4 };
      const mockDispatch = jest.fn();
      const actionToDispatch = updateCurrentPalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateCurrentPalette(mockPalette);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })

  describe("mapStateToProps", () => {
    it("should return a state object", () => {
      const mockState = {
        projects: [{ name: "Tom" }],
        palettes: [{ name: "Mason", projectId: 4 }],
        currentProject: 4,
        currentPalette: 5
      };
      const expected = {
        palettes: [{ name: "Mason", projectId: 4 }],
        currentProject: 4
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })
})