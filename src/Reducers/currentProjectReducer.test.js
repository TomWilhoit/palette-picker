import { currentProjectReducer }  from "./currentProjectReducer";
import { updateCurrentProject} from "../Actions/index";

describe("currentProjectReducer", () => {
  it("should return the initial state", () => {
    const expected = 0;
    const result = currentProjectReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it("should return the updated state", () => {
    const project = { name: "jim" };
    const result = currentProjectReducer(project, updateCurrentProject(project));
    expect(result).toEqual(project);
  })
})