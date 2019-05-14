import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import { App } from "./App";
import { fetchData } from "../../Utils/API";
import { Provider } from "react-redux";
// import { addProjects, addPalettes, addCurrentProject, addCurrentPalette } from '../../Actions/';
import { mapStateToProps, mapDispatchToProps } from './App';

jest.mock('../../Utils/API');
// jest.mock('../../actions');

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App addProjects={jest.fn()}
           addPalettes={jest.fn()}
      />
    );
  });

  describe("app load", () => {
    it("should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
    it("should have default state", () => {
      expect(wrapper.state()).toEqual({error: "", isLoading: false});
    });
  });

  describe("componentDidMount", () => {
    it("should toggle Loading on", () => {
      wrapper.instance().toggleLoading = jest.fn();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().toggleLoading).toHaveBeenCalled();
    });
    it("should call fetchData with expected url for projects", () => {
      wrapper.instance().componentDidMount();
      expect(fetchData).toHaveBeenCalledWith("http://localhost:3000/api/v1/projects");
    });
    it("should call fetchData with expected palettes url", () => {
      wrapper.instance().componentDidMount();
      expect(fetchData).toHaveBeenCalledWith("http://localhost:3000/api/v1/palettes");
    });
    it.skip("should storeData", async () => {
      wrapper.instance().componentDidMount();
      let mockProjects
      let mockPalettes
      wrapper.instance().storeData = jest.fn()
      let fetchData = jest.fn(() => mockProjects)
      // fetchData = ("http://localhost:3000/api/v1/projects") => mockProjects
      // let fetchData("http://localhost:3000/api/v1/palettes") = () => mockPalettes

      expect(wrapper.instance().storeData).toHaveBeenCalled()
    });
    it.skip("should toggle Loading off", () => {
  
    });
    it("should catch error and set state error", () => {
      let fetchData = jest.fn(() => mockProjects)

    });
  });

  describe("storeData", () => {
    it("should call updateProjectss", () => {
  
    });
    it("should call updatePalettes", () => {
  
    });
  });

  describe("updateProjects", () => {
    it("should update Projects in redux store", () => {
  
    });
  });

  describe("updatePalettes", () => {
    it("should update Palettes in redux store", () => {
  
    });
  });

  describe("toggleLoading", () => {
    it("should update state isLoading to be opposite", () => {
  
    });
  });

  describe("mapStateToProps", () => {
    it("should return part of redux store", () => {
  
    });
  });

  describe("mapDispatchToProps", () => {
    it("should store projects", () => {
  
    });
    it("should store palettes", () => {
  
    });
    it("should change current project", () => {
  
    });
    it("should change current palette", () => {
  
    });
  });
});