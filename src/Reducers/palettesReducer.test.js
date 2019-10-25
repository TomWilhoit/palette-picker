import { palettesReducer }  from "./palettesReducer";
import { addPalettes} from "../Actions/index";
import { addPalette } from "../Actions/index";
import { changePalette } from "../Actions/index";
import { removePalette } from "../Actions/index";
import { removeProjectPalettes } from "../Actions/index";

describe("palettesReducer", () => {
  it("should return the initial state", () => {
    const expected = []
    const result = palettesReducer(undefined, [])
    expect(result).toEqual(expected)
  })

  it("should return the updated state", () => {
    const palettes = {name: "jim", projectId: 4}
    const result = palettesReducer(palettes, addPalettes(palettes))
    expect(result).toEqual(palettes)
  })

  it("should return the updated state", () => {
    const palette = [{name: "jim", projectId: 4}]
    const newPalette = {name: "jim", projectId: 4}
    const expected = [{name: "jim", projectId: 4},{name: "jim", projectId: 4}]
    const result = palettesReducer(palette, addPalette(newPalette))
    expect(result).toEqual(expected)
  })

  it("should return the updated state", () => {
    const palette = [{name: "jim", projectId: 4}]
    const newPalette = {name: "jim", projectId: 4}
    const expected = [{"name": "jim", "projectId": 4}]
    const result = palettesReducer(palette, changePalette(newPalette))
    expect(result).toEqual(expected)
  })

  it("should return the updated state", () => {
    const palette = [{name: "jim", id: 4}];
    const id = 4;
    const result = palettesReducer(palette, removePalette(id))
    expect(result).toEqual([])
  })

  it("should return the updated state", () => {
    const palette = [{name: "jim", projectId: 4}];
    const id = 4;
    const result = palettesReducer(palette, removeProjectPalettes(id))
    expect(result).toEqual(palette)
  })
})