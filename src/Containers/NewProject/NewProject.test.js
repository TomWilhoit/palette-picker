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
  let mockProjects = [{ name: "Tom" }];
  
  beforeEach(() => {
    wrapper = shallow(<NewProject projects={mockProjects} />);
  });

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
      const mockEvent = {
        target: "JIM"
      };
      jest.spyOn(wrapper.instance(), "handleChange");
      wrapper.instance().forceUpdate();
      wrapper.find(".new-project-input").simulate("keyUp", mockEvent);
      expect(wrapper.instance().handleChange).toHaveBeenCalled();
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
      const mockEvent = {
        target: "JIM",
        preventDefault: jest.fn()
      };
      jest.spyOn(wrapper.instance(), "handleClick");
      wrapper.instance().forceUpdate();
      wrapper.find(".form").simulate("submit", mockEvent);
      expect(wrapper.instance().handleClick).toHaveBeenCalled();
    })
    it("should prevent Default", () => {
      const e = { preventDefault: jest.fn() };
      jest.spyOn(e, "preventDefault");
      wrapper.instance().addNewProject(e);
      expect(e.preventDefault).toBeCalled();
    })
    it("should call addNewProject", () => {
      // const e = Object.assign(jest.fn(), {preventDefault: () => {}});
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
      wrapper.setProps({ updateCurrentProject: jest.fn(), setError: jest.fn() });
      wrapper.instance().addNewProject();
      expect(wrapper.instance().props.setError).toBeCalledWith(message);
    })
    
    it("should check for repeated names if name is entered", () => {
      wrapper.setProps({ checkForSameName: jest.fn() });
      wrapper.setState({ name: "Tom" });
      wrapper.instance().addNewProject();
      expect(wrapper.instance().props.checkForSameName).toBeCalledWith("Tom", "projects");
    })

    it("should call createOptions with the name to send", () => {
      wrapper.setProps({ checkForSameName: jest.fn(() => "Tom<1>") });
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
      }
      createOptions.mockImplementation(() => mockOptions);
      wrapper.setProps({ checkForSameName: jest.fn(() => "Tom<1>") });
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
      }
      const mockResponse = { name: "Tom<1>", id: 10 }
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockResponse);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setProps({ checkForSameName: jest.fn(() => "Tom<1>"), setError: jest.fn(), clearError: jest.fn(), addProject: jest.fn() });
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
      }
      const mockResponse = { id: 10 }
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockResponse);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setProps({ checkForSameName: jest.fn(() => "Tom<1>"), setError: jest.fn(), clearError: jest.fn(), addProject: jest.fn() });
      wrapper.setState({ name: "Tom" });
      await wrapper.instance().addNewProject();
      expect(wrapper.instance().selectAddedProject).toBeCalledWith(mockResponse.id);
    })

    it("should catch an error", () => {
      
    })

    it("should clear the input", async () => {
      const mockOptions = {
        method: "POST",
        body: JSON.stringify({ name: "Tom<1>"}),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const mockResponse = { id: 10 }
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockResponse);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setProps({ checkForSameName: jest.fn(() => "Tom<1>"), setError: jest.fn(), clearError: jest.fn(), addProject: jest.fn() });
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
      }
      const mockResponse = { id: 10 }
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => mockResponse);
      wrapper.instance().selectAddedProject = jest.fn();
      wrapper.instance().clearInput = jest.fn();
      wrapper.setProps({ checkForSameName: jest.fn(() => "Tom<1>"), setError: jest.fn(), clearError: jest.fn(), addProject: jest.fn() });
      wrapper.setState({ name: "Tom" });
      await wrapper.instance().addNewProject();
      expect(wrapper.instance().props.clearError).toBeCalled();
    })
  })
    
  describe("selectAddedProject", () => {
    it("should call updateCurrentProject with an id", () => {
      const id = 5;
      wrapper.setProps({ updateCurrentProject: jest.fn() });
      wrapper.instance().selectAddedProject(id);
      expect(wrapper.instance().props.updateCurrentProject).toBeCalledWith(id);
    })

    // it("should keep the same name if name is not repeated", () => {
    //   wrapper.setState({ name: "UniqueName" });
    //   wrapper.instance().checkForRepeatName();
    //   expect(wrapper.state().name).toEqual("UniqueName");
    // })

    it.skip("should add a new project", () => {
      let fetchOptions = jest.fn();
      wrapper.setState({ name: "hello" });
      wrapper.instance().addNewProject();
      expect(fetchOptions).toHaveBeenCalled();
      // expect(wrapper.state.error).toEqual("Projects must have a name!")
    })
  })

  describe("clearInput", () => {
    it("should clear the input", () => {
      const wrapper = mount(<NewProject />);
      const mockEvent = { target: { value: "JIM" }, preventDefault: jest.fn() };
      const input = wrapper.find("#newProjectInput").get(0);
      // input.simulate("change", mockEvent);
      // input.simulate("keydown", "a");
      wrapper.setState({ name: "hello" });
      expect(input.defaultValue).toEqual("hello");
      wrapper.instance().clearInput;
      expect(input.defaultValue).toEqual("");
    })
   
      it("should set state name to be empty", () => {
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