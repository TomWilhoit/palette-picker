import React from "react";
import { Info } from "./Info";
import { shallow, mount } from "enzyme";

describe("Info", () => {
  let wrapper;
  let props;
  
  beforeEach(() => {
    props = { hideInfo: jest.fn() };
    wrapper = shallow(<Info {...props} />);
  })

  describe("on load", () => {
    it("should match the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe("handleClick", () => {
    it("should activate when close-info-btn is pressed", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.instance().handleClick = jest.fn();
      wrapper.find(".close-info-btn").first().simulate("click", e);
      expect(wrapper.instance().handleClick).toBeCalled();
    })

    it("should activate when an instruction-step is pressed", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.instance().handleClick = jest.fn();
      wrapper.find(".instruction-step").first().simulate("click", e);
      expect(wrapper.instance().handleClick).toBeCalled();
    })

    it("should activate when a detail-box is pressed", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.instance().handleClick = jest.fn();
      wrapper.find(".detail-box").first().simulate("click", e);
      expect(wrapper.instance().handleClick).toBeCalled();
    })

    it("should run hideInfo if 'closable' is in included the className", () => {
      const e = { preventDefault: jest.fn(), target: { className: "closable" }};
      wrapper.instance().handleClick(e);
      expect(wrapper.instance().props.hideInfo).toBeCalled();
    })

    it("should run toggleDetail if 'instruction-step' is included in the className", () => {
      const e = { preventDefault: jest.fn(), target: { className: "instruction-step" }};
      wrapper.instance().toggleDetail = jest.fn();
      wrapper.instance().handleClick(e);
      expect(wrapper.instance().toggleDetail).toBeCalled();
    })

    it("should run closeDetail if 'instruction-box' is included in the className", () => {
      const e = { preventDefault: jest.fn(), target: { className: "instruction-box", parentElement: { parentElement: { className: "instruction-step project-step" }}}};
      const selectedElement = jest.fn();
      wrapper.instance().closeDetail = jest.fn();
      wrapper.instance().handleClick(e);
      expect(wrapper.instance().closeDetail).toBeCalled();
    })
  })

  describe("toggleDetail", () => {
    //testing dom selectors/ class manipulation
    it.skip("should add 'show-info' to a class list if it is not there", () => {
      let mockClassName = "instruction-step project-step";
      expect(wrapper.find(".project-info").hasClass("show-info")).toEqual(false);
      wrapper.instance().toggleDetail(mockClassName);
      wrapper.instance().forceUpdate();
      expect(wrapper.find(".project-info").hasClass("show-info")).toEqual(true);
    })

    it.skip("should add 'arrow-down' to a class list if it is not there", () => {
      let mockClassName = "instruction-step project-step";
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(false);
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(true);
    })

    it.skip("should remove 'show-info' to a class list if it is there already", () => {
      let mockClassName = "instruction-step project-step";
      wrapper.instßance().toggleDetail(mockClassName);
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(true);
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(false);
    })

    it.skip("should remove 'arrow-down' to a class list if it is there already", () => {
      let mockClassName = "instruction-step project-step";
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(true);
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(false);
    })
  })

  describe("closeDetail", () => {
    //testing dom selectors/ class manipulation
    it.skip("should remove 'show-info' from a detail", () => {
      let mockClassName = "instruction-step project-step";
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(true);
      wrapper.instance().closeDetail(mockClassName);
      expect(wrapper.find("#project-step").hasClass("show-info")).toEqual(false);
    })
    
    it.skip("should remove 'arrow-down' from a detail", () => {
      let mockClassName = "instruction-step project-step";
      wrapper.instance().toggleDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(true);
      wrapper.instance().closeDetail(mockClassName);
      expect(wrapper.find(".project-step").hasClass("arrow-down")).toEqual(false);
    })
  })
})