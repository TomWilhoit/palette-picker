import React from "react";
import { NewProject } from "./NewProject";
import { mapStateToProps, mapDispatchToProps } from "./NewProject";
import { apiCall, createOptions } from "../../Utils/API";
import { shallow } from "enzyme";
import { addProject, updateCurrentProject } from "../../Actions";
// mock fucntions from API
jest.mock("../../Utils/API");

describe("NewProject", () => {
  let wrapper;
  let mockProjects;
  let mockPalettes;
  let mockProject;
  let e;
  let mockOptions;
  let props;
  
  beforeEach(() => {
    e = { preventDefault: jest.fn(), target: { value: "H" }};
    mockOptions = {
      method: "POST",
      body: JSON.stringify({ name: "Tommy"}),
      headers: {
        "Content-Type": "application/json"
      }
    };
    mockProject = { name: "Tom<1>", id: 5 };
    mockPalettes = [
      { name: "Tom", id: 2, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
      { name: "Mason", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" }
    ];
    mockProjects = [
      { name: "mockproj1", id: 7 },
      { name: "mockproj2", id: 8 }
    ];
    props = {
      projects: mockProjects,
      palettes: mockPalettes,
      addProject: jest.fn(),
      updateCurrentProject: jest.fn(),
      setError: jest.fn(),
      clearError: jest.fn(),
      checkForSameName: jest.fn(() => "Tom<1>")
    };
    wrapper = shallow(<NewProject {...props} />);
  })

  describe("on load", () => {
    it("should match the snapshot with all data passed in", () => {
      expect(wrapper).toMatchSnapshot();
    })
  
    it("should have default state", () => {
      expect(wrapper.state()).toEqual({ name: "" });
    })
  })

  describe("handleChange", () => {
    it("should call handleChange when keyed up", () => {
      jest.spyOn(wrapper.instance(), "handleChange");
      wrapper.instance().forceUpdate();
      wrapper.find(".new-project-input").simulate("keyUp", e);
      expect(wrapper.instance().handleChange).toBeCalled();
    })

    it("should update state name", () => {
      const mockEmptyState = { name: "" };
      const expectedState = { name: "H"};
      wrapper.setState(mockEmptyState);
      wrapper.instance().handleChange(e);
      expect(wrapper.state()).toEqual(expectedState);
    })
  })

  describe("handleClick", () => {
    it("should call handleClick when submitted", () => {
      jest.spyOn(wrapper.instance(), "handleClick");
      wrapper.instance().forceUpdate();
      wrapper.find(".form").simulate("submit", e);
      expect(wrapper.instance().handleClick).toBeCalled();
    })

    it("should prevent Default", () => {
      jest.spyOn(e, "preventDefault");
      wrapper.instance().handleClick(e);
      expect(e.preventDefault).toBeCalled();
    })

    it("should call addNewProject", () => {
      wrapper.instance().addNewProject = jest.fn();
      wrapper.instance().handleClick(e);
      expect(wrapper.instance().addNewProject).toBeCalled();
    })
  })

  describe("addNewProject", () => {
    it("should show an error message if a user adds a project with no name", () => {
      const message = "Projects must be given a name!";
      wrapper.setState({ name: "" });
      wrapper.instance().addNewProject();
      expect(wrapper.instance().props.setError).toBeCalledWith(message);
    })
    
    it("should check for repeated names if name is entered", () => {
      wrapper.setState({ name: "Tom" });
      wrapper.instance().addNewProject();
      expect(wrapper.instance().props.checkForSameName).toBeCalledWith("Tom", "projects");
    })

    it("should call createOptions with the name to send", () => {
      wrapper.setState({ name: "Tom" });
      wrapper.instance().addNewProject();
      expect(wrapper.instance().props.checkForSameName).toBeCalledWith("Tom", "projects");
      expect(createOptions).toBeCalledWith("POST", { name: "Tom<1>"});
    })

    it("should call apiCall with the correct info to send", () => {
      createOptions.mockImplementation(() => mockOptions);
      wrapper.setState({ name: "Tom" });
      wrapper.instance().addNewProject();
      expect(apiCall).toBeCalledWith("projects", mockOptions);
    })

    it("should call addProject with the correct info", async () => {
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockProject);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setState({ name: "Tom" });
      await wrapper.instance().addNewProject();
      expect(wrapper.instance().props.addProject).toBeCalledWith(mockProject);
    })

    it("should select the added project", async () => {
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockProject);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setState({ name: "Tom" });
      await wrapper.instance().addNewProject();
      expect(wrapper.instance().selectAddedProject).toBeCalledWith(mockProject.id);
    })

    it("should catch an error", async () => {
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => {
        throw new Error();
      });
      try {
        await wrapper.instance().addNewProject();
      } catch {
        expect(wrapper.instance().props.setError).toBeCalled();
      }
    })

    it("should call clearInput", async () => {
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockProject);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setState({ name: "Tom" });
      await wrapper.instance().addNewProject();
      expect(wrapper.instance().clearInput).toBeCalled();
    })

    it("should clear Error", async () => {
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockProject);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setState({ name: "Tom" });
      await wrapper.instance().addNewProject();
      expect(wrapper.instance().props.clearError).toBeCalled();
    })
  })
    
  describe("selectAddedProject", () => {
    it("should call updateCurrentProject with an id", () => {
      const id = 5;
      wrapper.instance().selectAddedProject(id);
      expect(wrapper.instance().props.updateCurrentProject).toBeCalledWith(id);
    })
  })

  describe("mapStateToProps", () => {
    it("should mapStateToProps", () => {
      const mockState = {
        projects: [],
        palettes: [],
        currentProject: "",
        currentPalette: ""
      };
      const expected = {
        projects: [],
        palettes: []
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })

  describe("mapDispatchToProps", () => {
    it("should add a project", () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addProject(mockProject);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addProject(mockProject);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })

    it("should update a saved project", () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = updateCurrentProject(mockProject);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateCurrentProject(mockProject);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })
  })

  // Skipped Dom manipulation tests

  describe("clearInput", () => {
    it.skip("should clear the input", () => {
      // const wrapper = mount(<NewProject />);
      wrapper.setState({ name: "hello" });
      wrapper.find(".new-project-input").simulate("change", e);
      wrapper.instance().forceUpdate();
      wrapper.instance().clearInput;
      const input = wrapper.find(".new-project-input");
      expect(input).toEqual("");
    })
   
    it.skip("should set state name to be empty", () => {
      // const wrapper = mount(<NewProject  />);
      const input = wrapper.find("#newProjectInput").get(0);
      const mockEmptyState = { name: "" };
      wrapper.setState({ name: "Tom" });
      wrapper.instance().clearInput();
      expect(wrapper.state()).toEqual(mockEmptyState);
    })
  })
})