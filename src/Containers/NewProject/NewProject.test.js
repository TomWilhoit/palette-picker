import React from "react";
import { NewProject } from "./NewProject";
import { mapStateToProps, mapDispatchToProps } from "./NewProject";
import { apiCall, createOptions } from "../../Utils/API";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { addProject, updateCurrentProject } from "../../Actions";

jest.mock("../../Utils/API");

describe("NewProject", () => {
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
      const e = { preventDefault: jest.fn(), target: { value: "H" }};
      jest.spyOn(wrapper.instance(), "handleChange");
      wrapper.instance().forceUpdate();
      wrapper.find(".new-project-input").simulate("keyUp", e);
      expect(wrapper.instance().handleChange).toBeCalled();
    })

    it("should update state name", () => {
      const mockEmptyState = { name: "" };
      const expectedState = { name: "Hello"};
      const e = { target: { value: "Hello" }};
      wrapper.setState(mockEmptyState);
      wrapper.instance().handleChange(e);
      expect(wrapper.state()).toEqual(expectedState);
    })
  })

  describe("handleClick", () => {
    it("should call handleClick when submitted", () => {
      const e = { target: "JIM", preventDefault: jest.fn() };
      jest.spyOn(wrapper.instance(), "handleClick");
      wrapper.instance().forceUpdate();
      wrapper.find(".form").simulate("submit", e);
      expect(wrapper.instance().handleClick).toHaveBeenCalled();
    })

    it("should prevent Default", () => {
      const e = { preventDefault: jest.fn() };
      jest.spyOn(e, "preventDefault");
      wrapper.instance().handleClick(e);
      expect(e.preventDefault).toBeCalled();
    })

    it("should call addNewProject", () => {
      const e = { preventDefault: jest.fn() };
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
      const mockOptions = {
        method: "POST",
        body: JSON.stringify({ name: "Tom<1>"}),
        headers: {
          "Content-Type": "application/json"
        }
      };
      createOptions.mockImplementation(() => mockOptions);
      wrapper.setState({ name: "Tom" });
      wrapper.instance().addNewProject();
      expect(apiCall).toBeCalledWith("projects", mockOptions);
    })

    it("should call addProject with the correct info", async () => {
      const mockOptions = {
        method: "POST",
        body: JSON.stringify({ name: "Tom<1>"}),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const mockResponse = { name: "Tom<1>", id: 10 };
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockResponse);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setState({ name: "Tom" });
      await wrapper.instance().addNewProject();
      expect(wrapper.instance().props.addProject).toBeCalledWith(mockResponse);
    })

    it("should select the added project", async () => {
      const mockOptions = {
        method: "POST",
        body: JSON.stringify({ name: "Tom<1>"}),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const mockResponse = { id: 10 };
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockResponse);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setState({ name: "Tom" });
      await wrapper.instance().addNewProject();
      expect(wrapper.instance().selectAddedProject).toBeCalledWith(mockResponse.id);
    })

    it.skip("should catch an error", () => {
      
    })

    it("should call clearInput", async () => {
      const mockOptions = {
        method: "POST",
        body: JSON.stringify({ name: "Tom<1>"}),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const mockResponse = { id: 10 };
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockResponse);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setState({ name: "Tom" });
      await wrapper.instance().addNewProject();
      expect(wrapper.instance().clearInput).toBeCalled();
    })

    it("should clear Error", async () => {
      const mockOptions = {
        method: "POST",
        body: JSON.stringify({ name: "Tom<1>"}),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const mockResponse = { id: 10 };
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockResponse);
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

  describe("clearInput", () => {
    it.skip("should clear the input", () => {
      const wrapper = mount(<NewProject />);
      const e = { target: { value: "M" }, preventDefault: jest.fn() };
      wrapper.setState({ name: "hello" });
      wrapper.find(".new-project-input").simulate("change", e);
      wrapper.instance().forceUpdate();
      wrapper.instance().clearInput;
      wrapper.instance().forceUpdate();
      const input = wrapper.find(".new-project-input");
      expect(input).toEqual("");
    })
   
    it.skip("should set state name to be empty", () => {
      const wrapper = mount(<NewProject  />);
      const input = wrapper.find("#newProjectInput").get(0);
      // document = (<input id="newProjectInfo" value="hey" />)
      // document.getElementById("newProjectInput") = input;
      // const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      const mockEmptyState = { name: "" };
      wrapper.setState({ name: "Tom" });
      wrapper.instance().clearInput();
      expect(wrapper.state()).toEqual(mockEmptyState);
    })
  })

  describe("mapStateToProps", () => {
    it("should mapStateToProps", () => {
      const mockState = {
        projects: [],
        palettes: [],
        currentProject: 4,
        currentPalette: 5
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
      const mockProject = { name: "Tommy" };
      const mockDispatch = jest.fn();
      const actionToDispatch = addProject(mockProject);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addProject(mockProject);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it("should update a saved project", () => {
      const mockProject = { name: "Tommy" };
      const mockDispatch = jest.fn();
      const actionToDispatch = updateCurrentProject(mockProject);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateCurrentProject(mockProject);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })
})