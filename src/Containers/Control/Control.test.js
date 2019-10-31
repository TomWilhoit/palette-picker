import React from "react";
import { Control } from "./Control";
import { mapStateToProps } from "./Control";
import { shallow } from "enzyme";

describe("Control", () => {
  let wrapper;
  let mockProjects;
  let mockPalettes;
  let props;

  beforeEach(() => {
    mockPalettes = [
      { name: "Tom", id: 2, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
      { name: "Mason", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" }
    ];
    mockProjects = [
      { name: "mockproj1", id: 5 },
      { name: "mockproj2", id: 8 }
    ];
    props = {
      projects: mockProjects,
      palettes: mockPalettes,
      checkForSameName: jest.fn(() => ("Mason")),
      randomizeColors: jest.fn(),
      savePalette: jest.fn(),
      currPaletteCheck: jest.fn(() => ({id:5})),
      currproject: 5,
      currpalette: 5
    };
    wrapper = shallow(<Control {...props} />);
  })

  describe("on load", () => {
    it("should match the snapshot with all data passed in", () => {
      const findName = jest.fn(() => "Sample Name");
      expect(wrapper).toMatchSnapshot();
    })
  
    it("should have default state", () => {
      expect(wrapper.state()).toEqual({ name: "" });
    })
  })

  describe("randomizeColors trigger", () => {
    it("should call randomizeColors when mix button is clicked", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.find(".randomize-btn").simulate("click", e);
      expect(wrapper.instance().props.randomizeColors).toBeCalled();
    })
  })

  describe("findName", () => {
    it("should return a default message with correct type if no name is found", () => {
      wrapper.setProps({ palettes: [] });
      let result = wrapper.instance().findName("palette");
      expect(result).toBe("Select or create a palette");
    })

    it("should return a name if one is found", () => {
      wrapper.setProps({ palettes: mockPalettes });
      let result = wrapper.instance().findName("project");
      expect(result).toBe("mockproj1");
    })
  })

  describe("clearName", () => {
    it("should set state name to be empty", () => {
      const e = { preventDefault: jest.fn() };
      const mockEmptyState = { name: "" };
      const filledState = { name: "Hello"};
      wrapper.setState(filledState);
      wrapper.instance().clearName(e);
      expect(wrapper.state()).toEqual(mockEmptyState);
    })
  })

  describe("sendPaletteName", () => {
    it("should call savePalette", () => {
      const mockName = "Mason";
      wrapper.instance().sendPaletteName(mockName);
      expect(wrapper.instance().props.savePalette).toBeCalledWith(mockName);
    })
    
    it("should call clearName", () => {
      const mockName = "Mason";
      wrapper.instance().clearName = jest.fn();
      wrapper.instance().sendPaletteName(mockName);
      expect(wrapper.instance().clearName).toBeCalled();
    })
  })

  describe("handleChange", () => {
    it("should call handleChange when input is changed", () => {
      const e = { preventDefault: jest.fn(), target: { value: "mockE" } };
      jest.spyOn(wrapper.instance(), "handleChange");
      wrapper.instance().forceUpdate();
      wrapper.find(".palette-input").simulate("change", e);
      expect(wrapper.instance().handleChange).toBeCalled();
    })

    it("should set state name on change", () => {
      const mockEmptyState = { name: "" };
      const expectedState = { name: "Hello"};
      const e = { target: { value: "Hello" }};
      wrapper.setState(mockEmptyState);
      wrapper.instance().handleChange(e);
      expect(wrapper.state()).toEqual(expectedState);
    })
  })

  describe("handleSubmit", () => {
    it("should call handleSubmit when submit button is clicked", () => {
      const e = { preventDefault: jest.fn() };
      jest.spyOn(wrapper.instance(), "handleSubmit");
      wrapper.instance().forceUpdate();
      wrapper.find(".submit-btn").simulate("click", e);
      expect(wrapper.instance().handleSubmit).toBeCalled();
    })

    it("should prevent Default", () => {
      const e = { preventDefault: jest.fn() };
      jest.spyOn(e, "preventDefault");
      wrapper.instance().handleSubmit(e);
      expect(e.preventDefault).toBeCalled();
    })

    it("should call checkForSameName if name is entered", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.setState({ name: "Mason" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.checkForSameName).toBeCalled();
    })

    it("should call sendPaletteName with correct name if name is entered", () => {
      const e = { preventDefault: jest.fn() };
      const name = "Mason";
      wrapper.instance.sendPaletteName = jest.fn();
      wrapper.setState({ name: name });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.savePalette).toBeCalledWith(name);
    })

    it("should call currPaletteCheck if there is no name entered", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.currPaletteCheck).toBeCalled();
    })

    it("should call sendPaletteName with selected Palette name if there is no name entered", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.instance.sendPaletteName = jest.fn();
      wrapper.setProps({ checkForSameName: jest.fn(() => "Mason"), currPaletteCheck: jest.fn(() => ({id:5, name: "Mason"})), savePalette : jest.fn(), currpalette: 5 });
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.savePalette).toBeCalledWith("Mason");
    })

    it("should call checkForSameName with 'unnamed' if there is no name entered and id=0", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.setProps({ currpalette: 0, currPaletteCheck: jest.fn(() => ({ id:0 }))});
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.checkForSameName).toBeCalledWith("unnamed", "palettes");
    })

    it("should call sendPaletteName with 'unnamed' if there is no name entered and id=0", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.setProps({ currpalette: 0, checkForSameName: jest.fn(() => ("unnamed")), currPaletteCheck: jest.fn(() => ({ id:0 }))});
      wrapper.setState({ name: "" });
      wrapper.instance.sendPaletteName = jest.fn();
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.savePalette).toBeCalledWith("unnamed");
    })
  })

  describe("mapStateToProps", () => {
    it("should return a state object", () => {
      const mockState = {
        projects: [],
        palettes: [],
        currentProject: 4,
        currentPalette: 5,
        addedState: "mockState"
      };
      const expected = {
        projects: [],
        palettes: [],
        currproject: 4,
        currpalette: 5
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })
})