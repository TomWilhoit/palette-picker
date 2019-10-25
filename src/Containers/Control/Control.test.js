import React from "react";
import { Control } from "./Control";
import { mapStateToProps } from "./Control";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

describe("Control", () => {
  let wrapper;
  let mockProjects = [{ name: "Tom" }];
  beforeEach(() => {
    wrapper = shallow(<Control projects={mockProjects} />);
  });

  describe("on load", () => {
    it("should match the snapshot with all data passed in", () => {
      expect(wrapper).toMatchSnapshot();
    })
  
    it("should have default state", () => {
      expect(wrapper.state()).toEqual({
        name: ""
      });
    })
  })

  it("should call randomizeColors when mix button is clicked", () => {
    const mockEvent = {
      target: "JIM"
    };
    wrapper.setProps({ randomizeColors: jest.fn() });
    wrapper.find(".randomize-btn").simulate("click", mockEvent);
    expect(wrapper.instance().props.randomizeColors).toHaveBeenCalled();
  })

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

  it("should call handleSubmit when submit button is clicked", () => {
    const mockEvent = {
      target: "JIM",
      preventDefault: jest.fn()
    };
    wrapper.setProps({ updateName: jest.fn(), findPalette : jest.fn(), savePalette : jest.fn() });
    jest.spyOn(wrapper.instance(), "handleSubmit");
    wrapper.instance().forceUpdate();
    wrapper.find(".submit-btn").simulate("click", mockEvent);
    expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
  })

  describe("findName", () => {
    it("should return a default message with correct type if no name is found", () => {

    })
    it("should return a name if one is found", () => {

    })
  })
  describe("clearName", () => {
    it("should set state name to be empty", () => {

    })
  })

  describe("sendPaletteName", () => {
    it("should call savePalette", () => {

    })
    it("should call clearName", () => {

    })
  })

  describe("handleChange", () => {
    it("should set state name on change", () => {

    })
  })

  describe("handleSubmit", () => {
    it("should call checkForSameName if name is entered", () => {

    })
    it("should call sendPaletteName with correct name if name is entered", () => {

    })
    it("should call currPaletteCheck if there is no name entered", () => {

    })
    it("should call sendPaletteName with selected Palette name if there is no name entered", () => {

    })
    it("should call checkForSameName with 'unnamed' if there is no name entered and id=0", () => {

    })
    it("should call sendPaletteName with 'unnamed' if there is no name entered and id=0", () => {

    })
  })

  it("should mapStateToProps", () => {
    const mockState = {
      projects: [{ name: "Tom" }],
      palettes: [{ name: "Mason", projectId: 4 }],
      currentProject: 4
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(mockState);
  })
})