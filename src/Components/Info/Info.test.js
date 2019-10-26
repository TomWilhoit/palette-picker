import React from "react";
import { Info} from "./Info";
import { shallow, mount } from "enzyme";

describe("Info", () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(<Info hideInfo={jest.fn()} />);
  })

  describe("on load", () => {
    it("should match the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe("handleClick", () => {
    it("should activate when close-info-btn is pressed", () => {
      const mockEvent = { target: { className: "JIM" }};
      wrapper.instance().handleClick = jest.fn();
      wrapper.find(".close-info-btn").first().simulate("click", mockEvent);
      expect(wrapper.instance().handleClick).toHaveBeenCalled();
    })

    it("should activate when an instruction-step is pressed", () => {
      const mockEvent = { target: { className: "JIM" }};
      wrapper.instance().handleClick = jest.fn();
      wrapper.find(".instruction-step").first().simulate("click", mockEvent);
      expect(wrapper.instance().handleClick).toHaveBeenCalled();
    })

    it.skip("should activate when a instruction-box is pressed", () => {
      const mockEvent = { target: { className: "JIM" }};
      wrapper.instance().handleClick = jest.fn();
      wrapper.find(".instruction-box").first().simulate("click", mockEvent);
      expect(wrapper.instance().handleClick).toHaveBeenCalled();
    })

    it("should run hideInfo if 'closable' is in included the className", () => {
      const mockEvent = { target: { className: "closable" }};
      wrapper.instance().handleClick(mockEvent);
      expect(wrapper.instance().props.hideInfo).toHaveBeenCalled();
    })

    it("should run toggleDetail if 'instruction-step' is included in the className", () => {
      const mockEvent = { target: { className: "instruction-step" }};
      wrapper.instance().toggleDetail = jest.fn();
      wrapper.instance().handleClick(mockEvent);
      expect(wrapper.instance().toggleDetail).toHaveBeenCalled();
    })

    it("should run closeDetail if 'instruction-box' is included in the className", () => {
      const mockEvent = { target: { className: "instruction-box", parentElement: { parentElement: { className: "instruction-step project-step" }}}};
      const selectedElement = jest.fn();
      wrapper.instance().closeDetail = jest.fn();
      wrapper.instance().handleClick(mockEvent);
      expect(wrapper.instance().closeDetail).toHaveBeenCalled();
    })
  })

  describe("toggleDetail", () => {
    it("should add 'show-info' to a class list if it is not there", () => {

      let mockClassName = "instruction-step project-step";
      document = wrapper;
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(false);
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(true);
    })

    it("should add 'arrow-down' to a class list if it is not there", () => {
      let mockClassName = "instruction-step project-step";
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(false);
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(true);
    })

    it("should remove 'show-info' to a class list if it is there already", () => {
      let mockClassName = "instruction-step project-step";
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(true);
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(false);
    })

    it("should remove 'arrow-down' to a class list if it is there already", () => {
      let mockClassName = "instruction-step project-step";
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(true);
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(false);
    })
  })

  describe("closeDetail", () => {
    it("should remove 'show-info' from a detail", () => {
      let mockClassName = "instruction-step project-step";
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(true);
      wrapper.instance().closeDetail(mockClassName);
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(false);
    })
    
    it("should remove 'arrow-down' from a detail", () => {
      let mockClassName = "instruction-step project-step";
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(true);
      wrapper.instance().closeDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(false);
    })
  })
})