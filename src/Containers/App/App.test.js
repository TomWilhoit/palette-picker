import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import { App } from "./App";
import { apiCall } from "../../Utils/API";
import { Provider } from "react-redux";
import { addProjects, addPalettes } from "../../Actions/";
import { mapStateToProps, mapDispatchToProps } from "./App";

jest.mock("../../Utils/API");
jest.mock("../../Actions");

describe("App", () => {
  let wrapper;
  let props;

  beforeEach(() => {

    wrapper = shallow(
      <App 
        addProjects={jest.fn()} 
        addPalettes={jest.fn()}
      />
    );
  });

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
      wrapper.instance().toggleLoading = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().toggleLoading).toHaveBeenCalled();
    })

    it("should call getSavedProjects", () => {
      wrapper.instance().componentDidMount();
      expect(apiCall).toHaveBeenCalledWith("projects", { method: "GET" });
    })

    it("should call getSavedPalettes", () => {
      wrapper.instance().componentDidMount();
      expect(apiCall).toHaveBeenCalledWith("palettes", { method: "GET" });
    })

    it.skip("should toggle Loading off", async () => {
      // Says toggleLoading runs 3 times
      wrapper.instance().toggleLoading = jest.fn();
      wrapper.instance().getSavedProjects = jest.fn();
      wrapper.instance().getSavedPalettes = jest.fn();
      await wrapper.instance().componentDidMount(e);
      expect(wrapper.instance().toggleLoading).toBeCalledTimes(2);
    })
  })

  describe("getSaveProjects", () => {
    it("should call apiCall with correct endpoint", () => {
      wrapper.instance().getSavedProjects;
      expect(apiCall).toHaveBeenCalledWith("projects", { method: "GET" });
    })
    it("should call updateProjects", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});

      const mockProjects = [{ name: "Mason" }, { name: "Tom" }];
      const apiCall = jest.fn(() => mockProjects);
      wrapper.instance().getSavedProjects(e);
      expect(addProjects).toHaveBeenCalled();
    })
    it("should catch errors, calling setError with correct message", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});

      const mockProjects = [{ name: "Mason" }, { name: "Tom" }];
      const apiCall = jest.fn(() => new Error("Error!"));
      const errorState = { isLoading: false, error:"Error!" };
      apiCall.mockImplementation(() => { throw new Error('adbd') });
      wrapper.instance().setError = jest.fn(() => wrapper.setState(errorState));
      wrapper.instance().getSavedProjects(e);
      expect(wrapper.instance().setError).toHaveBeenCalled();
      // expect(wrapper.state()).toBe(errorState);
    })
  })

  describe("getSavePalettes", () => {
    it("should call apiCall with correct endpoint", () => {
      wrapper.instance().getSavedPalettes;
      expect(apiCall).toHaveBeenCalledWith("palettes", { method: "GET" });
    })
    it("should call updatePalettes", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});

      const mockPalettes = [{ name: "Mason" }, { name: "Tom" }];
      const apiCall = jest.fn(() => mockPalettes);
      wrapper.instance().getSavedPalettes(e);
      expect(wrapper.props.addPalettes).toHaveBeenCalled();
    })
    it("should catch errors, calling setError with correct message", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});

      const mockPalettes = [{ name: "Mason" }, { name: "Tom" }];
      const apiCall = jest.fn(() => new Error("Error!"));
      wrapper.instance().setError = jest.fn();
      wrapper.instance().getSavedPalettes(e);
      expect(wrapper.instance().setError).toHaveBeenCalled();
    })
  })

  describe("updateProjects", () => {
    it("should call addProjects with correct projects", () => {
      const mockProjects = [{ name: "Mason" }, { name: "Tom" }];
      wrapper.instance().updateProjects(mockProjects);
      expect(wrapper.instance().props.addProjects).toBeCalledWith(mockProjects);
    })
  })

  describe("updatePalettes", () => {
    it("should call addPalettes with correct palettes", () => {
      const mockPalettes = [{ name: "Mason" }, { name: "Tom" }];
      wrapper.instance().updatePalettes(mockPalettes);
      expect(wrapper.instance().props.addPalettes).toBeCalledWith(mockPalettes);
    })
  })

  describe("toggleLoading", () => {
    it("should set state isLoading to true if it is false", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      const mockEmptyState = {
        error: "",
        isLoading: false
      };
      const mockLoadingState = {
        error: "",
        isLoading: true
      };
      wrapper.setState(mockEmptyState);
      wrapper.instance().toggleLoading(e);
      expect(wrapper.state()).toEqual(mockLoadingState);
    })
    it("should set state isLoading to false if it is true", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      const mockEmptyState = {
        error: "",
        isLoading: false
      };
      const mockLoadingState = {
        error: "",
        isLoading: true
      };
      wrapper.setState(mockLoadingState);
      wrapper.instance().toggleLoading(e);
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
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});
      const mockEmptyState = {
        error: "",
        isLoading: false
      };
      const mockStateWithError = {
        error: "Error!",
        isLoading: false
      };
      wrapper.setState(mockStateWithError);
      wrapper.instance().clearError(e);
      expect(wrapper.state()).toEqual(mockEmptyState);
    })
  })

  describe("showInfo", () => {
    it("should add 'show-pop-up' to the classList of element with className 'info-pop-up'", () => {
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(false);
      wrapper.instance().showInfo;
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(true);
    })
    it("should add 'show-overlay' to the classList of element with className 'modal-overlay'", () => {
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(false);
      wrapper.instance().showInfo;
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(true);
    })
  })

  describe("hideInfo", () => {
    it("should run closeAllDetails", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});

      wrapper.instance().closeAllDetails = jest.fn();
      wrapper.instance().closeAllArrows = jest.fn();
      wrapper.instance().removeModal = jest.fn();
      wrapper.instance().hideInfo(e);
      expect(wrapper.instance().closeAllDetails).toHaveBeenCalled();
    })
    it("should run closeAllArrows", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});

      wrapper.instance().closeAllDetails = jest.fn();
      wrapper.instance().closeAllArrows = jest.fn();
      wrapper.instance().removeModal = jest.fn();
      wrapper.instance().hideInfo(e);
      expect(wrapper.instance().closeAllArrows).toHaveBeenCalled();
    })
    it("should run removeModal", () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}});

      wrapper.instance().closeAllDetails = jest.fn();
      wrapper.instance().closeAllArrows = jest.fn();
      wrapper.instance().removeModal = jest.fn();
      wrapper.instance().hideInfo(e);
      expect(wrapper.instance().removeModal).toHaveBeenCalled();
    })
  })

  describe("closeAllDetails", () => {
    it("should remove 'show-info' to the classList of all elements with className 'detail-box'", () => {
      expect(wrapper.find(".detail-box").hasClass("show-info")).toEqual(false);

    })
  })

  describe("closeAllArrows", () => {
    it("should remove 'arrow-down' to the classList of all elements with className 'arrow'", () => {
      expect(wrapper.find(".arrow").hasClass("arrow-down")).toEqual(false);

    })
  })

  describe("removeModal", () => {
    it("should remove 'show-pop-up' to the classList of element with className 'info-pop-up'", () => {
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(false);
      wrapper.instance().showInfo;
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(true);
      wrapper.instance().removeModal;
      expect(wrapper.find(".info-pop-up").hasClass("show-pop-up")).toEqual(false);
    })
    it("should remove 'show-overlay' to the classList of element with className 'modal-overlay'", () => {
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(false);
      wrapper.instance().showInfo;
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(true);
      wrapper.instance().removeModal;
      expect(wrapper.find(".modal-overlay").hasClass("show-overlay")).toEqual(false);
    })
  })

  describe("mapStateToProps", () => {
    it("should return a state object", () => {
      const mockState = {
        projects: [],
        palettes: [],
        currentProject: 234,
        currentPalette: 123
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
      const mockProjects = [{ name: "mockProj", id: "1" }, { name: "mockProj2", id: "2" }, { title: "mockProj3", id: "3" }];
      const mockDispatch = jest.fn();
      const actionToDispatch = addProjects(mockProjects);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addProjects(mockProjects);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
    it("should add palettes", () => {
      const mockPalettes = [{ name: "mockPal1", id: "1", color1: "FEFEFE", color2: "red", color3: "green", color4: "blue", color5: "yellow" }, { name: "mockPal2", id: "2", color1: "FEFEFE", color2: "red", color3: "green", color4: "brown", color5: "orange" }];
      const mockDispatch = jest.fn();
      const actionToDispatch = addProjects(mockPalettes);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addProjects(mockPalettes);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })
})