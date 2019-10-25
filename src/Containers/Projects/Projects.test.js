import React from "react";
import { Projects } from "./Projects";
import { mapDispatchToProps, mapStateToProps } from "./Projects";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { addProjects } from "../../Actions";



describe("Projects", () => {
  let wrapper;
  let mockProjects = [{ name: "Tom", id: 2},{name: "Mason", id: 3}];
  
  beforeEach(() => {
    wrapper = shallow(<Projects projects={mockProjects} />);
  });

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })

  it("should render projects", () => {
    let result = wrapper.instance().renderProjects();
    expect(result).toHaveLength(2);
  })

  it("should mapStateToProps", () => {
    const mockState = {
      currentProject: 4,
      palettes: [{ name: "Mason", projectId: 4 }],
      projects: [{name: "Tommy"}]
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(mockState);
  })

  it("should map dispatch to props", () => {
    const mockProject= {name: "Tommy"};
    const mockDispatch = jest.fn();
    const actionToDispatch = addProjects(mockProject);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addProjects(mockProject);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })
})