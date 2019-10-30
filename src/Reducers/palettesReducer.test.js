import { palettesReducer }  from "./palettesReducer";
import { addPalettes, addPalette, changePalette, removePalette, removeProjectPalettes } from "../Actions/index";

// mock data
const palette = { name: "Mason", project_id: 1, id: 1 };
const palettes = [{ name: "Tom", project_id: 2, id: 2 }, { name: "Jim", project_id: 3, id: 3 }];
const allPalettes = [{ name: "Tom", project_id: 2, id: 2 }, { name: "Jim", project_id: 3, id: 3 }, { name: "Mason", project_id: 1, id: 1 }];

describe("palettesReducer", () => {
  it("should return the initial state by default", () => {
    const result = palettesReducer(undefined, []);
    expect(result).toEqual([]);
  })

  it("should return the updated state", () => {
    const result = palettesReducer(palettes, addPalettes(palettes));
    expect(result).toEqual(palettes);
  })

  it("should return the updated state", () => {
    const result = palettesReducer(palettes, addPalette(palette));
    expect(result).toEqual(allPalettes);
  })

  it("should return the updated state", () => {
    const updatedPal = { name: "new", project_id: 2, id: 2 };
    const expected = [{ name: "new", project_id: 2, id: 2 }, { name: "Jim", project_id: 3, id: 3 }, { name: "Mason", project_id: 1, id: 1 }];
    const result = palettesReducer(allPalettes, changePalette(updatedPal));
    expect(result).toEqual(expected);
  })

  it("should return the updated state", () => {
    const result = palettesReducer(allPalettes, removePalette(1));
    expect(result).toEqual(palettes);
  })

  it("should return the updated state", () => {
    const result = palettesReducer(allPalettes, removeProjectPalettes(1));
    expect(result).toEqual(palettes);
  })
})