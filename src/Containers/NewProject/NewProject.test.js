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

  describe("on load", () => {
    it("should match the snapshot with all data passed in", () => {
      expect(wrapper).toMatchSnapshot();
    })
  
    it("should have default state", () => {
      expect(wrapper.state()).toEqual({
        name: "",
        error: ""
      });
    })
  })

  it("should call handleChange when keyed up", () => {
    const mockEvent = {
      target: "JIM"
    };
    jest.spyOn(wrapper.instance(), "handleChange");
    wrapper.instance().forceUpdate();
    wrapper.find(".new-project-input").simulate("keyUp", mockEvent);
    expect(wrapper.instance().handleChange).toHaveBeenCalled();
  })

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

  it("should check for repeated names", () => {
    wrapper.setState({ name: "Tom" });
    wrapper.instance().checkForRepeatName();
    expect(wrapper.state().name).toEqual("Tom1");
  })

  it("should keep the same name if name is not repeated", () => {
    wrapper.setState({ name: "UniqueName" });
    wrapper.instance().checkForRepeatName();
    expect(wrapper.state().name).toEqual("UniqueName");
  })

  it.skip("should add a new project", () => {
    let fetchOptions = jest.fn();
    wrapper.setState({ name: "hello" });
    wrapper.instance().addNewProject();
    expect(fetchOptions).toHaveBeenCalled();
    // expect(wrapper.state.error).toEqual("Projects must have a name!")
  })

  it.skip("should show an error message if a user adds a project with no name", () => {
    wrapper.setState({ name: "", error: "" })
    wrapper.instance().addNewProject()
    expect(wrapper.state.error).toEqual("Projects must have a name!")
  })

  it("should mapStateToProps", () => {
    const mockState = {
      projects: [{ name: "Tom" }],
      palettes: [{ name: "Mason", projectId: 4 }],
      currentProject: 4
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(mockState);
  })

  it("should map dispatch to props", () => {
    const mockProject = { name: "Tommy" };
    const mockDispatch = jest.fn();
    const actionToDispatch = addProject(mockProject);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addProject(mockProject);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })
})

describe("handleChange", () => {

})

describe("handleClick", () => {
  
})

describe("addNewProject", () => {
  
})

describe("selectAddedProject", () => {
  
})

describe("clearInput", () => {
  
})

describe("mapStateToProps", () => {
  
})

describe("mapDispatchToProps", () => {
  
})