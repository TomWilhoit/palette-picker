import { currentPaletteReducer }  from "./currentPaletteReducer";
import { updateCurrentPalette } from "../Actions/index";

describe("currentPaletteReducer", () => {
  it("should return the initial state", () => {
    const expected = 0;
    const result = currentPaletteReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it("should return the updated state", () => {
    const palette = { name: "jim", projectId: 4 };
    const result = currentPaletteReducer(palette, updateCurrentPalette(palette));
    expect(result).toEqual(palette);
  })
})