import React from "react";
import { Palettes } from "./Palettes";
import { mapDispatchToProps, mapStateToProps } from "./Palettes";
import { shallow } from "enzyme";
import { updateCurrentPalette } from "../../Actions";

describe("Palettes", () => {
  let wrapper;
  let mockPalettes;
  let props;
  
  beforeEach(() => {
    mockPalettes = [
      { name: "Tom", id: 2, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
      { name: "Mason", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" }
    ];
    props = {
      setPaletteDisplay: jest.fn(),
      setError: jest.fn(),
      updateCurrentPalette: jest.fn(),
      showPaletteName: jest.fn(),
      palettes: mockPalettes,
      currentProject: 5
    };
    wrapper = shallow(<Palettes {...props} />);
  })

  describe("On load", () => {
    it("should match the snapshot with all data passed in", () => {
      wrapper.setProps({ palettes: mockPalettes });
      expect(wrapper).toMatchSnapshot();
    })

    it("should match the snapshot when there are no palettes", () => {
      wrapper.setProps({ palettes: [] });
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe("renderPalettes", () => {
    it("should create a palette element if there are palettes passed as props", () => {
      wrapper.setProps({ palettes: mockPalettes });
      let result = wrapper.instance().renderPalettes(5);
      expect(result).toHaveLength(2);
    })

    it("should not create elements if there are no palettes passed and not be defined", () => {
      wrapper.setProps({ palettes: [] });
      let result = wrapper.instance().renderPalettes(5);
      expect(result).toBe(undefined);
    })
  })

  describe("mapDispatchToProps", () => {
    it("should update the current palette", () => {
      const mockPalette = { name: "Tommy", projectId: 4 };
      const mockDispatch = jest.fn();
      const actionToDispatch = updateCurrentPalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateCurrentPalette(mockPalette);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
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