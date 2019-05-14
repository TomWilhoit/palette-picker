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
        color2: 'white',
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
        color2: 'white',
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
        color2: 'white',
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
        color2: 'white',
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
      mockPalette = {
        name: "coolpalette",
        color1: "red",
        color2: 'white',
        color3: "orange",
        color4: "yellow",
        color5: "",
        project_id: 8, 
        id: mockId
      };
    });
    it("should return an error message", async () => {

    });
  });

  describe("deleteProject", () => {
    it("should call fetch with expected info", async () => {
      mockProject = { name: 'Toms project', id: 22 }
    });
    it("should return an error message", async () => {

    });
  });

  describe("fetchOptions", () => {
    it("", async () => {

    });
    it("", async () => {

    });
  });
});