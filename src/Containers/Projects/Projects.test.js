import React from "react";
import { Projects } from "./Projects";
import { mapStateToProps } from "./Projects";
import { shallow } from "enzyme";
import { addProjects } from "../../Actions";

describe("Projects", () => {
  let wrapper;
  let mockProjects;
  let mockPalettes;
  let props;
  
  beforeEach(() => {
    mockPalettes = [
      { name: "Tom", id: 2, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
      { name: "Mason", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" }
    ];
    mockProjects = [
      { name: "mockproj1", id: 7 },
      { name: "mockproj2", id: 8 }
    ];
    props = {
      checkForSameName: jest.fn(),
      setError: jest.fn(), 
      clearError: jest.fn(),
      projects: mockProjects,
      palettes: mockPalettes,
      currentProject: 5
    };
    wrapper = shallow(<Projects {...props} />);
  })

  describe("On Load", () => {
    it("should match the snapshot with all data passed in", () => {
      expect(wrapper).toMatchSnapshot();
    })

    it("should match the snapshot when no projects are passed in", () => {
      wrapper.setProps({ projects: [] });
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe("renderProjects", () => {
    it("should render projects", () => {
      wrapper.setProps({ projects: mockProjects });
      let result = wrapper.instance().renderProjects();
      expect(result).toHaveLength(2);
    })

    it("should not return projects if there are nore, returning undefined", () => {
      wrapper.setProps({ projects: [] });
      let result = wrapper.instance().renderProjects();
      expect(result).toBe(undefined);
    })
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