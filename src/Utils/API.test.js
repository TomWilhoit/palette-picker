import { fetchData, updatePalette, addNewPalette, deletePalette, deleteProject } from "./API";
import { fetchOptions } from "./fetchOptions";

describe("API calls", () => {
  let mockData;
  let mockUrl;
  let mockProject;
  let mockPalette;

  describe("fetchData", () => {
    it("should fetch and return data from expected url", async () => {
      mockData = [{name: "Mason"}, {name: "Tom"}];
      mockUrl = "www.thegoogles.com";
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData)
      }));
      const response = await fetchData(mockUrl);
      expect(window.fetch).toHaveBeenCalled();
      expect(response).toEqual(mockData);
    });
    it("should return an error if response is not ok", async () => {
      mockUrl = "www.thegoogles.com";
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
        status: 422,
        json: () => Promise.resolve("Missing title")
      }));
      const result = await fetchData(mockUrl);
      expect(result).toEqual("Fetch Unsuccessful Missing title");
    });
  });

  describe("updatePalette", () => {
    it("should call fetch with expected info", async () => {
      const mockId = 7
      mockPalette = {
        name: "coolpalette",
        color1: "red",
        color2: "white",
        color3: "orange",
        color4: "yellow",
        color5: "blue",
        project_id: 8, 
        id: mockId
      }
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockPalette.id)
      }));
      const response = await updatePalette(mockPalette, mockId);
      expect(window.fetch).toHaveBeenCalled();
      expect(response).toEqual(mockId);
    });
    it("should return an error message", async () => {
      const mockId = 7;
      mockPalette = {
        name: "coolpalette",
        color1: "red",
        color2: "white",
        color3: "orange",
        color4: "yellow",
        color5: "",
        project_id: 8, 
        id: mockId
      };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
        status: 422,
        json: () => Promise.resolve("Missing color")
      }));
      const response = await updatePalette(mockPalette, mockId);
      expect(response).toEqual("Missing color");
    });
  });

  describe("addNewPalette", () => {
    it("should call fetch with expected info", async () => {
      const mockProjectId = 8;
      mockPalette = {
        name: "coolpalette",
        color1: "red",
        color2: "white",
        color3: "orange",
        color4: "yellow",
        color5: "blue"
      }
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({...mockPalette, id: 234, project_id: mockProjectId })
      }));
      const response = await addNewPalette(mockPalette, mockProjectId);
      expect(window.fetch).toHaveBeenCalled();
      expect(response.id).toEqual(234);
    });
    it("should return an error message", async () => {
      const mockProjectId = 8;
      mockPalette = {
        name: "coolpalette",
        color1: "red",
        color2: "white",
        color3: "orange",
        color4: "yellow",
        color5: ""
      };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
        status: 422,
        json: () => Promise.resolve("Missing color")
      }));
      const response = await updatePalette(mockPalette, mockProjectId);
      expect(response).toEqual("Missing color");
    });
  });

  describe("deletePalette", () => {
    it("should call fetch with expected info", async () => {
      const mockPaletteId = 1234;
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 202,
        json: () => Promise.resolve(`Successful deletion of ${mockPaletteId}`)
        }
      ))
      const expected = await deletePalette(mockPaletteId);
      expect(expected).toEqual(`Successful deletion of 1234`);
    });
    it("should return an error message", async () => {
      const mockEmptyPalette = {};
      window.fetch = jest.fn(() => { return Promise.reject("Error deleting palette")});
        try {
          await deletePalette(mockEmptyPalette);
        } catch (error) {
          expect(error).toEqual("Error deleting note");
        }
    });
  });

  describe("deleteProject", () => {
    it("should call fetch with expected info", async () => {
      const mockProjectId = 22;
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 202,
        json: () => Promise.resolve(`Successful deletion of ${mockProjectId}`)
        }
      ))
      const expected = await deletePalette(mockProjectId);
      expect(expected).toEqual(`Successful deletion of 22`);
    });
    it("should return an error message", async () => {
      const mockEmptyProject = {};
      window.fetch = jest.fn(() => { return Promise.reject("Error deleting project")});
        try {
          await deleteProject(mockEmptyProject);
        } catch (error) {
          expect(error).toEqual("Error deleting project");
        }
    });
  });

  describe("fetchOptions", () => {
    it("should return an object with appropriate info", async () => {
      const mockType = "PUT"
      const mockBody = {name: "Tom"}
      const response = await fetchOptions(mockType, mockBody)
      expect(response).toEqual({
        method: mockType,
        body: JSON.stringify(mockBody),
        headers:{
          "Content-Type": "application/json"
        }
      });
    });
  });
});