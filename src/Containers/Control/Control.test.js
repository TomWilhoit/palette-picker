import React from "react";
import { Control } from "./Control";
import { mapStateToProps } from "./Control";
import { shallow } from "enzyme";

describe("Control", () => {
  let wrapper;
  let mockProjects;
  let mockPalettes;
  let mockName;
  let props;
  let e;

  beforeEach(() => {
    e = { 
      preventDefault: jest.fn(), 
      target: { value: "mockVal" }
    };
    mockPalettes = [
      { name: "Tom", id: 2, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
      { name: "Mason", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" }
    ];
    mockProjects = [
      { name: "mockproj1", id: 5 },
      { name: "mockproj2", id: 8 }
    ];
    mockName = "Mason";
    props = {
      projects: mockProjects,
      palettes: mockPalettes,
      checkForSameName: jest.fn(() => mockName),
      randomizeColors: jest.fn(),
      savePalette: jest.fn(),
      currPaletteCheck: jest.fn(() => ({ id: 5, name:"Mason" })),
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
      wrapper.find(".randomize-btn").simulate("click", e);
      expect(wrapper.instance().props.randomizeColors).toBeCalled();
    })
  })

  describe("findName", () => {
    it("should return a default message with correct type if no name is found", () => {
      wrapper.setProps({ palettes: [] });
      let result = wrapper.instance().findName("palette");
      expect(result).toBe("Creating new palette");
    })

    it("should return a name if one is found", () => {
      wrapper.setProps({ palettes: mockPalettes });
      let result = wrapper.instance().findName("project");
      expect(result).toBe("mockproj1");
    })
  })

  describe("clearName", () => {
    it("should set state name to be empty", () => {
      const mockEmptyState = { name: "" };
      const filledState = { name: "mockVal"};
      wrapper.setState(filledState);
      wrapper.instance().clearName(e);
      expect(wrapper.state()).toEqual(mockEmptyState);
    })
  })

  describe("sendPaletteName", () => {
    it("should call savePalette", () => {
      wrapper.instance().sendPaletteName(mockName);
      expect(wrapper.instance().props.savePalette).toBeCalledWith(mockName);
    })
    
    it("should call clearName", () => {
      wrapper.instance().clearName = jest.fn();
      wrapper.instance().sendPaletteName(mockName);
      expect(wrapper.instance().clearName).toBeCalled();
    })
  })

  describe("handleChange", () => {
    it("should call handleChange when input is changed", () => {
      jest.spyOn(wrapper.instance(), "handleChange");
      wrapper.instance().forceUpdate();
      wrapper.find(".palette-input").simulate("change", e);
      expect(wrapper.instance().handleChange).toBeCalled();
    })

    it("should set state name on change", () => {
      const mockEmptyState = { name: "" };
      const expectedState = { name: "mockVal"};
      wrapper.setState(mockEmptyState);
      wrapper.instance().handleChange(e);
      expect(wrapper.state()).toEqual(expectedState);
    })
  })

  describe("handleSubmit", () => {
    it("should call handleSubmit when submit button is clicked", () => {
      jest.spyOn(wrapper.instance(), "handleSubmit");
      wrapper.instance().forceUpdate();
      wrapper.find(".submit-btn").simulate("click", e);
      expect(wrapper.instance().handleSubmit).toBeCalled();
    })

    it("should prevent Default", () => {
      jest.spyOn(e, "preventDefault");
      wrapper.instance().handleSubmit(e);
      expect(e.preventDefault).toBeCalled();
    })

    it("should call checkForSameName if name is entered", () => {
      wrapper.setState({ name: "Mason" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.checkForSameName).toBeCalled();
    })

    it("should call sendPaletteName with correct name if name is entered", () => {
      wrapper.instance.sendPaletteName = jest.fn();
      wrapper.setState({ name: mockName });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.savePalette).toBeCalledWith(mockName);
    })

    it("should call currPaletteCheck if there is no name entered", () => {
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.currPaletteCheck).toBeCalled();
    })

    it("should call sendPaletteName with selected Palette name if there is no name entered", () => {
      wrapper.instance.sendPaletteName = jest.fn();
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.savePalette).toBeCalledWith(mockName);
    })

    it("should call checkForSameName with 'unnamed' if there is no name entered and id=0", () => {
      wrapper.setProps({ 
        currpalette: 0, 
        currPaletteCheck: jest.fn(() => ({ id: 0 }))
      });
      wrapper.setState({ name: "" });
      wrapper.instance().handleSubmit(e);
      expect(wrapper.instance().props.checkForSameName).toBeCalledWith("unnamed", "palettes");
    })

    it("should call sendPaletteName with 'unnamed' if there is no name entered and id=0", () => {
      wrapper.setProps({ 
        currpalette: 0, 
        checkForSameName: jest.fn(() => ("unnamed")), 
        currPaletteCheck: jest.fn(() => ({ id: 0 }))
      });
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
        currentProject: "",
        currentPalette: "",
        addedState: ""
      };
      const expected = {
        projects: [],
        palettes: [],
        currproject: "",
        currpalette: ""
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })
})