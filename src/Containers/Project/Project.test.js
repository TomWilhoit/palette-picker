import React from "react";
import { Project } from "./Project";
import { mapStateToProps, mapDispatchToProps } from "./Project";
import { shallow } from "enzyme";
import { addProjects, updateCurrentProject, removeProject, removeProjectPalettes } from "../../Actions";

describe("Project", () => {
  let wrapper;
  let mockPalettes = [{ name: "Tom", projectId: 4 }];
  
  beforeEach(() => {
    wrapper = shallow(<Project palettes={mockPalettes} />);
  });

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })

  it.skip("should have default state", () => {
    expect(wrapper.state()).toEqual({
      id: 0
    });
  })

  it("should call changeCurrentProject when clicked", () => {
    const mockEvent = {
      target: "JIM"
    };
    wrapper.setProps({ updateCurrentProject: jest.fn() });
    jest.spyOn(wrapper.instance(), "changeCurrentProject");
    wrapper.instance().forceUpdate();
    wrapper.find(".project-title").simulate("click", mockEvent);
    expect(wrapper.instance().changeCurrentProject).toHaveBeenCalled();
  })

  it("should call handleDelete when clicked", () => {
    const mockEvent = {
      target: "JIM",
      preventDefault: jest.fn()
    };
    wrapper.setProps({ removeProject: jest.fn(), removeProjectPalettes : jest.fn() });
    jest.spyOn(wrapper.instance(), "handleDelete");
    wrapper.instance().forceUpdate();
    wrapper.find(".project-delete").simulate("click", mockEvent);
    expect(wrapper.instance().handleDelete).toHaveBeenCalled();
  })
  
  it("should mapStateToProps", () => {
    const mockState = {
      currentProject: 4,
      palettes: [{ name: "Mason", projectId: 4 }],
      projects: [{ name: "Tommy" }]
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(mockState);
  })

  it("should map dispatch to props", () => {
    const mockProjects = { name: "Tommy" };
    const mockDispatch = jest.fn();
    const actionToDispatch = addProjects(mockProjects);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addProjects(mockProjects);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })

  it("should map dispatch to props", () => {
    const mockProject = { name: "Tommy" };
    const mockDispatch = jest.fn();
    const actionToDispatch = updateCurrentProject(mockProject);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.updateCurrentProject(mockProject);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })

  it("should map dispatch to props", () => {
    const mockId = 4;
    const mockDispatch = jest.fn();
    const actionToDispatch = removeProject(mockId);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.removeProject(mockId);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })

  it("should map dispatch to props", () => {
    const mockId = 4;
    const mockDispatch = jest.fn();
    const actionToDispatch = removeProjectPalettes(mockId);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.removeProjectPalettes(mockId);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })
})