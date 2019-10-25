import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import { App } from "./App";
import { apiCall } from "../../Utils/API";
import { Provider } from "react-redux";
// import { addProjects, addPalettes, addCurrentProject, addCurrentPalette } from "../../Actions/";
import { mapStateToProps, mapDispatchToProps } from "./App";

jest.mock("../../Utils/API");
// jest.mock("../../actions");

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App addProjects={jest.fn()}
           addPalettes={jest.fn()}
      />
    );
  });

  describe("on load", () => {
    it("should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    })
    it("should match snapshot when loading", () => {
    
    })
    it("should match snapshot when error is present", () => {
    
    })
    it("should have default state", () => {
      expect(wrapper.state()).toEqual({error: "", isLoading: false});
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
      expect(wrapper.getSavedProjects()).toHaveBeenCalled();
    })

    it("should call getSavedPalettes", () => {
      wrapper.instance().componentDidMount();
      expect(wrapper.getSavedPalettes()).toHaveBeenCalled();
    })

    it.skip("should toggle Loading off", () => {
      wrapper.instance().toggleLoading = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().toggleLoading).toHaveBeenCalled();
    })


    // it("should storeData", async () => {
    //   wrapper.instance().componentDidMount();
    //   let mockProjects
    //   let mockPalettes
    //   wrapper.instance().storeData = jest.fn()
    //   let fetchData = jest.fn(() => mockProjects)

    //   expect(wrapper.instance().storeData).toHaveBeenCalled()
    // })
  })

  describe("getSaveProjects", () => {
    it("should call apiCall with correct endpoint", () => {

    })
    it("should call updateProjects", () => {

    })
    it("should catch errors, calling setError with correct message", () => {

    })
  })

  describe("getSavePalettes", () => {
    it("should call apiCall with correct endpoint", () => {

    })
    it("should call updatePalettes", () => {

    })
    it("should catch errors, calling setError with correct message", () => {

    })
  })

  describe("updateProjects", () => {
    it("should call addProjects with correct projects", () => {

    })
  })

  describe("updatePalettes", () => {
    it("should call addPalettes with correct palettes", () => {

    })
  })

  describe("toggleLoading", () => {
    it("should set state isLoading to true if it is false", () => {

    })
    it("should set state isLoading to false if it is true", () => {

    })
  })

  describe("SetError", () => {
    it("should set state error to the message passed in", () => {

    })
  })

  describe("cleanError", () => {
    it("should set state error to be empty", () => {

    })
  })

  describe("showInfo", () => {
    it("should add 'show-pop-up' to the classList of element with className 'info-pop-up'", () => {

    })
    it("should add 'show-overlay' to the classList of element with className 'modal-overlay'", () => {

    })
  })

  describe("hideInfo", () => {
    it("should run closeAllDetails", () => {

    })
    it("should run closeAllArrows", () => {

    })
    it("should run removeModal", () => {

    })
  })

  describe("closeAllDetails", () => {
    it("should remove 'show-info' to the classList of all elements with className 'detail-box'", () => {

    })
  })

  describe("closeAllArrows", () => {
    it("should remove 'arrow-down' to the classList of all elements with className 'arrow'", () => {

    })
  })

  describe("removeModal", () => {
    it("should remove 'show-pop-up' to the classList of element with className 'info-pop-up'", () => {

    })
    it("should remove 'show-overlay' to the classList of element with className 'modal-overlay'", () => {

    })
  })

  describe("mapStateToProps", () => {

  })

  describe("mapDispatchToProps", () => {
    
  })
})