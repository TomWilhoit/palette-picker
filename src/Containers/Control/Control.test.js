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

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default state", () => {
    expect(wrapper.state()).toEqual({
      name: ""
    });
  });

  it("should call randomizeColors when clicked", () => {
    const mockEvent = {
      target: 'JIM'
    }
    wrapper.setProps({ randomizeColors: jest.fn() });
    wrapper.find(".randomizeButton").simulate("click", mockEvent);
    expect(wrapper.instance().props.randomizeColors).toHaveBeenCalled();
  });

  it("should call handleChange when clicked", () => {
    const mockEvent = {
      target: 'JIM',
      preventDefault: jest.fn()
    }
    jest.spyOn(wrapper.instance(), "handleChange");
    wrapper.instance().forceUpdate();
    wrapper.find(".palette-input").simulate("change", mockEvent);
    expect(wrapper.instance().handleChange).toHaveBeenCalled();
  });

  it("should call handleChange when clicked", () => {
    const mockEvent = {
      target: 'JIM',
      preventDefault: jest.fn()
    }
    wrapper.setProps({ updateName: jest.fn(), findPalette : jest.fn(), savePalette : jest.fn() });
    jest.spyOn(wrapper.instance(), "handleSubmit");
    wrapper.instance().forceUpdate();
    wrapper.find(".submit-button").simulate("click", mockEvent);
    expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
  });

  it("should mapStateToProps", () => {
    const mockState = {
      projects: [{ name: "Tom" }],
      palettes: [{ name: "Mason", projectId: 4 }],
      currentProject: 4
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(mockState);
  });
});
