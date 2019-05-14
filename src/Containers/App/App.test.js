import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import App from "./App";
import * as actions from '../../Actions'
import { mapStateToProps, mapDispatchToProps } from './App'


describe("App", () => {
  describe("app load", () => {
    it("should match snapshot", () => {
  
    });
    it("should have default state", () => {
  
    });
  });
  describe("componentDidMount", () => {
    it("should call fetchStoredProjectsData", () => {
  
    });
    it("should call fetchStoredPalettesData", () => {
  
    });
  });
  describe("fetchStoredProjectsData", () => {
    it("should toggle Loading", () => {
  
    });
    it("should call fetchData with correct url", () => {
  
    });
    it("should call updateProjects", () => {
  
    });
    it("should catch error", () => {
  
    });
  });
  describe("fetchStoredPalettesData", () => {
    it("should call fetchData with correct url", () => {
  
    });
    it("should call updatePalettes", () => {
  
    });
    it("should catch error", () => {
      
    });
    it("should toggle Loading", () => {
  
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