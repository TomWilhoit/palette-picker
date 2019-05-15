import React from "react";
import { NewProject } from "./NewProject";
import { mapStateToProps } from "./NewProject";
import { mapDispatchToProps } from "./NewProject";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { addProject } from "../../Actions";

describe("NewProject", () => {
  let wrapper;
  let mockProjects = [{ name: "Tom" }];
  beforeEach(() => {
    wrapper = shallow(<NewProject projects={mockProjects} />);
  });

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default state", () => {
    expect(wrapper.state()).toEqual({
      name: "",
      error: ""
    });
  });

  it("should call handleChange when keyed up", () => {
    const mockEvent = {
      target: 'JIM'
    }
    jest.spyOn(wrapper.instance(), "handleChange");
    wrapper.instance().forceUpdate();
    wrapper.find(".new-project-input").simulate("keyUp", mockEvent);
    expect(wrapper.instance().handleChange).toHaveBeenCalled();
  });

  it("should call handleClick when submitted", () => {
    const mockEvent = {
      target: 'JIM',
      preventDefault: jest.fn()
    }
    jest.spyOn(wrapper.instance(), "handleClick");
    wrapper.instance().forceUpdate();
    wrapper.find(".form").simulate("submit", mockEvent);
    expect(wrapper.instance().handleClick).toHaveBeenCalled();
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

  it("should map dispatch to props", () => {
    const mockProject = { name: "Tommy" };
    const mockDispatch = jest.fn();
    const actionToDispatch = addProject(mockProject);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addProject(mockProject);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
