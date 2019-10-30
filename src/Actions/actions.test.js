import * as actions from "../actions";

// mock data
const palettes = [
  { name: "Tom", id: 2, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
  { name: "Mason", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" }
];
const projects = [
  { name: "mockproj1", id: 7 },
  { name: "mockproj2", id: 8 }
];
const project = { name: "mockproj2", id: 8 };
const palette = { name: "Mason", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
const id = 123;

// tests
describe("actions", () => {
  it("should return a type of ADD_PROJECTS with projects", () => {
    const expected = {
      type: "ADD_PROJECTS",
      projects
    };
    const result = actions.addProjects(projects);
    expect(result).toEqual(expected);
  })

  it("should return a type of ADD_PROJECT with project", () => {
    const expected = {
      type: "ADD_PROJECT",
      project
    };
    const result = actions.addProject(project);
    expect(result).toEqual(expected);
  })

  it("should return a type of REMOVE_PROJECT with id", () => {
    const expected = {
      type: "REMOVE_PROJECT",
      id
    };
    const result = actions.removeProject(id);
    expect(result).toEqual(expected);
  })

  it("should return a type of ADD_PALETTES with palettes", () => {
    const expected = {
      type: "ADD_PALETTES",
      palettes
    };
    const result = actions.addPalettes(palettes);
    expect(result).toEqual(expected);
  })

  it("should return a type of ADD_PALETTE with palette", () => {
    const expected = {
      type: "ADD_PALETTE",
      palette
    };
    const result = actions.addPalette(palette);
    expect(result).toEqual(expected);
  })

  it("should return a type of CHANGE_PALETTE with palette", () => {
    const expected = {
      type: "CHANGE_PALETTE",
      palette
    };
    const result = actions.changePalette(palette);
    expect(result).toEqual(expected);
  })

  it("should return a type of REMOVE_PROJECT_PALETTES with id", () => {
    const expected = {
      type: "REMOVE_PROJECT_PALETTES",
      id
    };
    const result = actions.removeProjectPalettes(id);
    expect(result).toEqual(expected);
  })

  it("should return a type of REMOVE_PALETTE with id", () => {
    const expected = {
      type: "REMOVE_PALETTE",
      id
    };
    const result = actions.removePalette(id);
    expect(result).toEqual(expected);
  })

  it("should return a type of UPDATE_CURRENT_PROJECT with project", () => {
    const expected = {
      type: "UPDATE_CURRENT_PROJECT",
      project
    };
    const result = actions.updateCurrentProject(project);
    expect(result).toEqual(expected);
  })

  it("should return a type of UPDATE_CURRENT_PALETTE with palette", () => {
    const expected = {
      type: "UPDATE_CURRENT_PALETTE",
      palette
    };
    const result = actions.updateCurrentPalette(palette);
    expect(result).toEqual(expected);
  })
})