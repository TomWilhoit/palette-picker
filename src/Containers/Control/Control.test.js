import React from "react";
import { Control } from "./Control";
import { mapStateToProps } from "./Control";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

describe("Control", () => {
  let wrapper;
  let mockProjects = [{ name: "Tom", id: 5 }];
  let mockPalettes = [{ name: "Mason", id: 3 }];

  beforeEach(() => {
    wrapper = shallow(<Control projects={mockProjects} palettes={mockPalettes} />);
  })

  describe("on load", () => {
    it("should match the snapshot with all data passed in", () => {
      const findName = jest.fn(() => "Sample Name")
      expect(wrapper).toMatchSnapshot();
    })
  
    it("should have default state", () => {
      expect(wrapper.state()).toEqual({ name: "" });
    })
  })

  it("should call randomizeColors when mix button is clicked", () => {
    const mockEvent = { target: "JIM" };
    wrapper.setProps({ randomizeColors: jest.fn() });
    wrapper.find(".randomize-btn").simulate("click", mockEvent);
    expect(wrapper.instance().props.randomizeColors).toHaveBeenCalled();
  })

  describe("findName", () => {
    it("should return a default message with correct type if no name is found", () => {
      wrapper.setProps({ palettes: [] });
      let result = wrapper.instance().findName("palette");
      expect(result).toBe("Select or create a palette");
    })
    it("should return a name if one is found", () => {
      wrapper.setProps({ currproject: 5 });
      let result = wrapper.instance().findName("project");
      expect(result).toBe("Tom");
    })
  })
  describe("clearName", () => {
    it("should set state name to be empty", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
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
      wrapper.setProps({ savePalette: jest.fn() });
      wrapper.instance().sendPaletteName(mockName);
      expect(wrapper.instance().props.savePalette).toHaveBeenCalledWith(mockName);
    })
    it("should call clearName", () => {
      const mockName = "Mason";
      wrapper.setProps({ savePalette: jest.fn() });
      wrapper.instance().clearName = jest.fn();
      wrapper.instance().sendPaletteName(mockName);
      expect(wrapper.instance().clearName).toHaveBeenCalled();
    })
  })

  describe("handleChange", () => {
    it("should call handleChange when input is changed", () => {
      const mockEvent = {
        target: "JIM",
        preventDefault: jest.fn()
      };
      jest.spyOn(wrapper.instance(), "handleChange");
      wrapper.instance().forceUpdate();
      wrapper.find(".palette-input").simulate("change", mockEvent);
      expect(wrapper.instance().handleChange).toHaveBeenCalled();
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
      const mockEvent = {
        target: "JIM",
        preventDefault: jest.fn()
      };
      wrapper.setProps({ updateName: jest.fn(), findPalette : jest.fn(), savePalette : jest.fn(), currPaletteCheck: jest.fn(() => ({id:5})), currpalette: 5 });
      jest.spyOn(wrapper.instance(), "handleSubmit");
      wrapper.instance().forceUpdate();
      wrapper.find(".submit-btn").simulate("click", mockEvent);
      expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
    })
    it("should call checkForSameName if name is entered", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      wrapper.setProps({ checkForSameName: jest.fn(() => "Mason"), currPaletteCheck: jest.fn(() => ({id:5})), savePalette : jest.fn(), currpalette: 5 });
      wrapper.setState({ name: "Mason" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.checkForSameName).toHaveBeenCalled();
    })
    it("should call sendPaletteName with correct name if name is entered", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      const name = "Mason";
      wrapper.instance.sendPaletteName = jest.fn();
      wrapper.setProps({ checkForSameName: jest.fn(() => name), currPaletteCheck: jest.fn(() => ({id:5})), savePalette : jest.fn(), currpalette: 5 });
      wrapper.setState({ name: name });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.savePalette).toBeCalledWith(name);
    })
    it("should call currPaletteCheck if there is no name entered", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      wrapper.setProps({ checkForSameName: jest.fn(() => "Mason"), currPaletteCheck: jest.fn(() => ({id:5})), savePalette : jest.fn(), currpalette: 5 });
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.currPaletteCheck).toHaveBeenCalled();
    })
    it("should call sendPaletteName with selected Palette name if there is no name entered", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      wrapper.instance.sendPaletteName = jest.fn();
      wrapper.setProps({ checkForSameName: jest.fn(() => "Mason"), currPaletteCheck: jest.fn(() => ({id:5, name: "Mason"})), savePalette : jest.fn(), currpalette: 5 });
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.savePalette).toHaveBeenCalledWith("Mason");
    })
    it("should call checkForSameName with 'unnamed' if there is no name entered and id=0", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      wrapper.setProps({ checkForSameName: jest.fn(() => "unnamed"), currPaletteCheck: jest.fn(() => ({id:0})), savePalette : jest.fn(), currpalette: 0 });
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.checkForSameName).toHaveBeenCalledWith("unnamed", "palettes");
    })
    it("should call sendPaletteName with 'unnamed' if there is no name entered and id=0", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      wrapper.instance.sendPaletteName = jest.fn();
      wrapper.setProps({ checkForSameName: jest.fn(() => "unnamed"), currPaletteCheck: jest.fn(() => ({id:0})), savePalette : jest.fn(), currpalette: 0 });
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.savePalette).toHaveBeenCalledWith("unnamed");
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