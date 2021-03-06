import React from "react";
import { Project } from "./Project";
import { mapStateToProps, mapDispatchToProps } from "./Project";
import { shallow } from "enzyme";
import { addProjects, updateCurrentProject, updateCurrentPalette, removeProject, removeProjectPalettes } from "../../Actions";
import { apiCall, createOptions } from "../../Utils/API";

jest.mock("../../Utils/API");

describe("Project", () => {
  let wrapper;
  let mockProjects;
  let mockPalettes;
  let mockOptions;
  let e;
  let props;
  
  beforeEach(() => {
    e = { preventDefault: jest.fn() };
    mockOptions = {
      method: "DELETE",
      body: JSON.stringify({ id: 4 }),
      headers: { "Content-Type": "application/json" }
    };
    mockProjects = [
      { name: "mockproj1" },
      { name: "mockproj2" }
    ];
    mockPalettes = [
      { name: "mockpal1" },
      { name: "mockpal2" }
    ];
    props = {
      id: 4,
      key: "4",
      name: "MockProj",
      setError: jest.fn(),
      currentProject: 5,
      palettes: mockPalettes,
      projects: mockProjects,
      addProjects: jest.fn(),
      updateCurrentProject: jest.fn(),
      updateCurrentPalette: jest.fn(), 
      removeProject: jest.fn(), 
      removeProjectPalettes: jest.fn()
    };     
    wrapper = shallow(<Project {...props} />);
  })
  
  describe("On Load", () => {
    it("should match the snapshot with all data passed in", () => {
      expect(wrapper).toMatchSnapshot();
    })
  })
  
  describe("changeCurrentProject", () => {
    it("should call changeCurrentProject when clicked", () => {
      wrapper.instance().changeCurrentProject = jest.fn();
      wrapper.find(".project-title").first().simulate("click", e);
      expect(wrapper.instance().changeCurrentProject).toBeCalled();
    })

    it("should updateCurrentProject", () => {
      wrapper.instance().changeCurrentProject(7);
      expect(wrapper.instance().props.updateCurrentProject).toBeCalledWith(7);
    })

    it("should updateCurrentPalette to new palette", () => {
      wrapper.instance().changeCurrentProject(7);
      expect(wrapper.instance().props.updateCurrentPalette).toBeCalledWith(0);
    })
  })

  describe("handleDelete", () => {
    it("should call handleDelete when clicked", () => {
      wrapper.instance().handleDelete = jest.fn();
      wrapper.instance().forceUpdate();
      wrapper.find(".proj-del-btn").simulate("click", e);
      expect(wrapper.instance().handleDelete).toBeCalled();
    })

    it("should preventDefault", () => {
      wrapper.instance().deleteProject = jest.fn();
      jest.spyOn(e, "preventDefault");
      wrapper.instance().handleDelete(e);
      expect(e.preventDefault).toBeCalled();
    })

    it("should removeProject", () => {
      wrapper.instance().deleteProject = jest.fn();
      wrapper.instance().handleDelete(e);
      expect(wrapper.instance().props.removeProject).toBeCalledWith(4);
    })

    it("should removeProjectPalettes", () => {
      wrapper.instance().deleteProject = jest.fn();
      wrapper.instance().handleDelete(e);
      expect(wrapper.instance().props.removeProjectPalettes).toBeCalledWith(4);
    })

    it("should deleteProject", () => {
      wrapper.instance().deleteProject = jest.fn();
      wrapper.instance().handleDelete(e);
      expect(wrapper.instance().deleteProject).toBeCalledWith(4);
    })
  })

  describe("deleteProject", () => {
    it("should createOptions with correct info", () => {
      wrapper.instance().deleteProject(6);
      expect(createOptions).toBeCalledWith("DELETE", { id: 6 });
    })

    it("should make an apiCall with correct info", () => {
      createOptions.mockImplementation(() => mockOptions);
      wrapper.instance().deleteProject(6);
      expect(apiCall).toBeCalledWith("projects/6", mockOptions);
    })

    it("should catch errors", async () => {
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => {
        throw new Error();
      });
      try {
        await wrapper.instance().deleteProject(4);
      } catch {
        expect(wrapper.instance().props.setError).toBeCalled(); 
      }
    })
  })

  describe("findProjectClass", () => {
    it("should return a particular classname if project is active", () => {
      wrapper.setProps({ currentProject: 5, id: 5 });
      let result = wrapper.instance().findProjectClass();
      expect(result).toEqual("project active-project");
    })

    it("should return a classname by default", () => {
      wrapper.setProps({ currentProject: 5, id: 4 });
      let result = wrapper.instance().findProjectClass();
      expect(result).toEqual("project");
    })
  })

  
  describe("should mapStateToProps", () => {
    it("should return a state object", () => {
      const mockState = {
        palettes: [],
        projects: [],
        currentProject: "",
        currentPalette: ""
      };
      const expected = {
        palettes: [],
        projects: [],
        currentProject: ""
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })

  describe("mapDispatchToProps", () => {
    it("should add projects", () => {
      const mockProjects = [{ name: "Tommy" }, { name: "Mason" }];
      const mockDispatch = jest.fn();
      const actionToDispatch = addProjects(mockProjects);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addProjects(mockProjects);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })

    it("should update the current project", () => {
      const mockCurrProject = 223;
      const mockDispatch = jest.fn();
      const actionToDispatch = updateCurrentProject(mockCurrProject);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateCurrentProject(mockCurrProject);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })

    it("should update the current palette", () => {
      const mockCurrPalette = 111;
      const mockDispatch = jest.fn();
      const actionToDispatch = updateCurrentPalette(mockCurrPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateCurrentPalette(mockCurrPalette);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })

    it("should remove a project", () => {
      const mockId = 4;
      const mockDispatch = jest.fn();
      const actionToDispatch = removeProject(mockId);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removeProject(mockId);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })

    it("should remove palettes of a give project id", () => {
      const mockId = 4;
      const mockDispatch = jest.fn();
      const actionToDispatch = removeProjectPalettes(mockId);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removeProjectPalettes(mockId);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })
  })
})