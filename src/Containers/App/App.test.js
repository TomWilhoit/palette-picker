import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import { apiCall } from "../../Utils/API";
import { Provider } from "react-redux";
import { addProjects, addPalettes } from "../../Actions/";
import { mapStateToProps, mapDispatchToProps } from "./App";
// mock fucntions from API and actions
jest.mock("../../Utils/API");

describe("App", () => {
  let wrapper;
  let mockPalettes;
  let mockProjects;
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
      palettes: mockPalettes,
      projects: mockProjects,
      addProjects: jest.fn(),
      addPalettes: jest.fn()
    };
    wrapper = shallow( <App {...props} /> );
  })

  describe("on load", () => {
    it("should have default state", () => {
      expect(wrapper.state()).toEqual({ error: "", isLoading: true });
    })

    it("should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    })

    it("should match snapshot when loading", () => {
      wrapper.setState({ isLoding: true });
      expect(wrapper).toMatchSnapshot();
    })

    it("should match snapshot when error is present", () => {
      wrapper.setState({ error: "error conditional on." });
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe("componentDidMount", () => {
    it("should toggle Loading on", () => {
      wrapper.setState({ error: "", isLoading: false });
      wrapper.instance().toggleLoading = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().toggleLoading).toBeCalled();
    })

    it("should call getSavedProjects", () => {
      wrapper.instance().componentDidMount();
      expect(apiCall).toBeCalledWith("projects", { method: "GET" });
    })

    it("should call getSavedPalettes", () => {
      wrapper.instance().componentDidMount();
      expect(apiCall).toBeCalledWith("palettes", { method: "GET" });
    })

    it("should toggle Loading off", async () => {
      wrapper.setState({ error: "", isLoading: false });
      wrapper.instance().toggleLoading = jest.fn();
      wrapper.instance().getSavedProjects = jest.fn();
      wrapper.instance().getSavedPalettes = jest.fn();
      await wrapper.instance().componentDidMount();
      expect(wrapper.state().isLoading).toBe(false);
    })
  })

  describe("getSavedProjects", () => {
    it("should call apiCall with correct endpoint", () => {
      wrapper.instance().getSavedProjects;
      expect(apiCall).toBeCalledWith("projects", { method: "GET" });
    })

    it("should call updateProjects", async () => {
      apiCall.mockImplementation(() => wrapper.props.projects);
      wrapper.instance().updateProjects = jest.fn();
      await wrapper.instance().getSavedProjects();
      expect(wrapper.instance().updateProjects).toBeCalledWith(wrapper.props.projects);
    })

    it("should catch errors, calling setError with correct message", async () => {
      wrapper.instance().setError = jest.fn();
      apiCall.mockImplementation(() => { throw new Error(); });
      try {
        await wrapper.instance().getSavedProjects();
      } catch {
        expect(wrapper.instance().setError).toBeCalled(); 
      }
    })
  })

  describe("getSavedPalettes", () => {
    it("should call apiCall with correct endpoint", () => {
      wrapper.instance().getSavedPalettes;
      expect(apiCall).toBeCalledWith("palettes", { method: "GET" });
    })

    it("should call updatePalettes", async() => {
      apiCall.mockImplementation(() => wrapper.props.palettes);
      wrapper.instance().updatePalettes = jest.fn();
      await wrapper.instance().getSavedPalettes();
      expect(wrapper.instance().updatePalettes).toBeCalledWith(wrapper.props.palettes);
    })

    it("should catch errors, calling setError with correct message", async () => {
      wrapper.instance().setError = jest.fn();
      apiCall.mockImplementation(() => { throw new Error(); });
      try {
        await wrapper.instance().getSavedPalettes();
      } catch {
        expect(wrapper.instance().setError).toBeCalled(); 
      }
    })
  })

  describe("updateProjects", () => {
    it("should call addProjects with correct projects", () => {
      wrapper.instance().updateProjects(mockProjects);
      expect(wrapper.instance().props.addProjects).toBeCalledWith(mockProjects);
    })
  })

  describe("updatePalettes", () => {
    it("should call addPalettes with correct palettes", () => {
      wrapper.instance().updatePalettes(mockPalettes);
      expect(wrapper.instance().props.addPalettes).toBeCalledWith(mockPalettes);
    })
  })

  describe("toggleLoading", () => {
    it("should set state isLoading to true if it is false", () => {
      const mockEmptyState = {
        error: "",
        isLoading: false
      };
      const mockLoadingState = {
        error: "",
        isLoading: true
      };
      wrapper.setState(mockEmptyState);
      wrapper.instance().toggleLoading();
      expect(wrapper.state()).toEqual(mockLoadingState);
    })

    it("should set state isLoading to false if it is true", () => {
      const mockEmptyState = {
        error: "",
        isLoading: false
      };
      const mockLoadingState = {
        error: "",
        isLoading: true
      };
      wrapper.setState(mockLoadingState);
      wrapper.instance().toggleLoading();
      expect(wrapper.state()).toEqual(mockEmptyState);
    })
  })

  describe("SetError", () => {
    it("should set state error to the message passed in", () => {
      const message = "Error!";
      const mockEmptyState = {
        error: "",
        isLoading: false
      };
      const mockStateWithError = {
        error: "Error!",
        isLoading: false
      };
      wrapper.setState(mockEmptyState);
      wrapper.instance().setError("Error!");
      expect(wrapper.state()).toEqual(mockStateWithError);
    })
  })

  describe("cleanError", () => {
    it("should set state error to be empty", () => {
      const mockEmptyState = {
        error: "",
        isLoading: false
      };
      const mockStateWithError = {
        error: "Error!",
        isLoading: false
      };
      wrapper.setState(mockStateWithError);
      wrapper.instance().clearError();
      expect(wrapper.state()).toEqual(mockEmptyState);
    })
  })

  describe("hideInfo", () => {
    it("should activate when .modal-overlay is pressed", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.instance().hideInfo = jest.fn();
      wrapper.find(".modal-overlay").simulate("click", e);
      expect(wrapper.instance().hideInfo).toBeCalled();
    })

    it("should run closeAllDetails", () => {
      wrapper.instance().closeAllDetails = jest.fn();
      wrapper.instance().closeAllArrows = jest.fn();
      wrapper.instance().removeModal = jest.fn();
      wrapper.instance().hideInfo();
      expect(wrapper.instance().closeAllDetails).toBeCalled();
    })

    it("should run closeAllArrows", () => {
      wrapper.instance().closeAllDetails = jest.fn();
      wrapper.instance().closeAllArrows = jest.fn();
      wrapper.instance().removeModal = jest.fn();
      wrapper.instance().hideInfo();
      expect(wrapper.instance().closeAllArrows).toBeCalled();
    })

    it("should run removeModal", () => {
      wrapper.instance().closeAllDetails = jest.fn();
      wrapper.instance().closeAllArrows = jest.fn();
      wrapper.instance().removeModal = jest.fn();
      wrapper.instance().hideInfo();
      expect(wrapper.instance().removeModal).toBeCalled();
    })
  })

  describe("mapStateToProps", () => {
    it("should return a state object", () => {
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
      const mockProps = mapStateToProps(mockState);
      expect(mockProps).toEqual(expected);
    })
  })

  describe("mapDispatchToProps", () => {
    it("should add projects", () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addProjects(mockProjects);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addProjects(mockProjects);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })

    it("should add palettes", () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addPalettes(mockPalettes);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addPalettes(mockPalettes);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })
  })

// Skipped Dom manipulation tests

  describe("removeModal", () => {
    it.skip("should remove 'show-pop-up' to the classList of element with className 'info-pop-up'", () => {
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(false);
      wrapper.instance().showInfo;
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(true);
      wrapper.instance().removeModal;
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(false);
    })

    it.skip("should remove 'show-overlay' to the classList of element with className 'modal-overlay'", () => {
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(false);
      wrapper.instance().showInfo;
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(true);
      wrapper.instance().removeModal;
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(false);
    })
  })

  describe("closeAllDetails", () => {
    it.skip("should remove 'show-info' to the classList of all elements with className 'detail-box'", () => {
      expect(wrapper.find(".detail-box").hasClass("show-info")).toEqual(false);

    })
  })

  describe("closeAllArrows", () => {
    it.skip("should remove 'arrow-down' to the classList of all elements with className 'arrow'", () => {
      expect(wrapper.find(".arrow").hasClass("arrow-down")).toEqual(false);

    })
  })

  describe("showInfo", () => {
    it.skip("should add 'show-pop-up' to the classList of element with className 'info-pop-up'", () => {
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(false);
      wrapper.instance().showInfo();
      wrapper.instance().forceUpdate();
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(true);
    })

    it.skip("should add 'show-overlay' to the classList of element with className 'modal-overlay'", () => {
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(false);
      wrapper.instance().showInfo();
      wrapper.instance().forceUpdate();
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(true);
    })
  })
})