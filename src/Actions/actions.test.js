import * as actions from "../actions";

describe("actions", () => {
  it("should return a type of ADD_PROJECTS with projects", () => {
    const projects = [
      {
        name:"Jim"
      }
    ];
    const expected = {
      type: "ADD_PROJECTS",
      projects
    };
    const result = actions.addProjects(projects);
    expect(result).toEqual(expected);
  });

  it("should return a type of ADD_PROJECT with project", () => {
    const project = [
      {
        name:"Jim"
      }
    ];
    const expected = {
      type: "ADD_PROJECT",
      project
    };
    const result = actions.addProject(project);
    expect(result).toEqual(expected);
  });

  it("should return a type of REMOVE_PROJECT with id", () => {
    const id = 0
    const expected = {
      type: "REMOVE_PROJECT",
      id
    };
    const result = actions.removeProject(id);
    expect(result).toEqual(expected);
  });

  it("should return a type of ADD_PALETTES with palettes", () => {
    const palettes = {
      "id": 7,
      "name": "palette1",
      "color1": "33812B",
      "color2": "A0B09E",
      "color3": "39D8B4",
      "color4": "9D27AB",
      "color5": "652B81",
      "project_id": 4,
      "created_at": "2019-05-11T22:16:36.840Z",
      "updated_at": "2019-05-11T22:16:36.840Z"
    }
    const expected = {
      type: "ADD_PALETTES",
      palettes
    };
    const result = actions.addPalettes(palettes);
    expect(result).toEqual(expected);
  });

  it("should return a type of ADD_PALETTE with palette", () => {
    const palette = {
      "id": 7,
      "name": "palette1",
      "color1": "33812B",
      "color2": "A0B09E",
      "color3": "39D8B4",
      "color4": "9D27AB",
      "color5": "652B81",
      "project_id": 4,
      "created_at": "2019-05-11T22:16:36.840Z",
      "updated_at": "2019-05-11T22:16:36.840Z"
    }
    const expected = {
      type: "ADD_PALETTE",
      palette
    };
    const result = actions.addPalette(palette);
    expect(result).toEqual(expected);
  });

  it("should return a type of CHANGE_PALETTE with palette", () => {
    const palette = {
      "id": 7,
      "name": "palette1",
      "color1": "33812B",
      "color2": "A0B09E",
      "color3": "39D8B4",
      "color4": "9D27AB",
      "color5": "652B81",
      "project_id": 4,
      "created_at": "2019-05-11T22:16:36.840Z",
      "updated_at": "2019-05-11T22:16:36.840Z"
    }
    const expected = {
      type: "CHANGE_PALETTE",
      palette
    };
    const result = actions.changePalette(palette);
    expect(result).toEqual(expected);
  });

  it("should return a type of REMOVE_PROJECT_PALETTES with id", () => {
    const id = 0
    const expected = {
      type: "REMOVE_PROJECT_PALETTES",
      id
    };
    const result = actions.removeProjectPalettes(id);
    expect(result).toEqual(expected);
  })

  it("should return a type of REMOVE_PALETTE with id", () => {
    const id = 0
    const expected = {
      type: "REMOVE_PALETTE",
      id
    };
    const result = actions.removePalette(id);
    expect(result).toEqual(expected);
  })

  it("should return a type of UPDATE_CURRENT_PROJECT with project", () => {
    const project = [
      {
        name:"Jim"
      }
    ];
    const expected = {
      type: "UPDATE_CURRENT_PROJECT",
      project
    };
    const result = actions.updateCurrentProject(project);
    expect(result).toEqual(expected);
  })

  it("should return a type of UPDATE_CURRENT_PALETTE with palette", () => {
    const palette = {
      "id": 7,
      "name": "palette1",
      "color1": "33812B",
      "color2": "A0B09E",
      "color3": "39D8B4",
      "color4": "9D27AB",
      "color5": "652B81",
      "project_id": 4,
      "created_at": "2019-05-11T22:16:36.840Z",
      "updated_at": "2019-05-11T22:16:36.840Z"
    }
    const expected = {
      type: "UPDATE_CURRENT_PALETTE",
      palette
    };
    const result = actions.updateCurrentPalette(palette);
    expect(result).toEqual(expected);
  })
});
