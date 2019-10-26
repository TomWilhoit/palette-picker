import React from "react";
import { Projects } from "./Projects";
import { mapStateToProps } from "./Projects";
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

  describe("mapStateToProps", () => {
    it("should return a state object", () => {
      const mockState = {
        projects: [{ name: "Tom" }],
        palettes: [{ name: "Mason", projectId: 4 }],
        currentProject: 4,
        currentPalette: 5
      };
      const expected = {
        projects: [{ name: "Tom" }],
        palettes: [{ name: "Mason", projectId: 4 }],
        currentProject: 4
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })
})