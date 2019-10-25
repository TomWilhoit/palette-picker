import  { projectsReducer }  from "./projectsReducer";
import { addProjects, addProject, removeProject } from "../Actions/index";

describe("projectsReducer", () => {
  it("should return the initial state", () => {
    const expected = [];
    const result = projectsReducer(undefined, []);
    expect(result).toEqual(expected);
  })

  it("should return the updated state", () => {
    const projects = { name: "jim" };
    const result = projectsReducer(projects, addProjects(projects));
    expect(result).toEqual(projects);
  })

  it("should return the updated state", () => {
    const project = [{ name: "jim" }];
    const newProject = { name: "hank" };
    const expected = [{ name: "jim" }, { name: "hank" }];
    const result = projectsReducer(project, addProject(newProject));
    expect(result).toEqual(expected);
  })

  it("should return the updated state", () => {
    const project = [{ name: "jim", id: 4 }];
    const id = 4;
    const result = projectsReducer(project, removeProject(id));
    expect(result).toEqual([]);
  })
})
