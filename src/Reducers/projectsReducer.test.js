import  { projectsReducer }  from "./projectsReducer";
import { addProjects, addProject, removeProject } from "../Actions/index";

// mock data
const project = { name: "Mason", id: 1 };
const projects = [{ name: "Tom", id: 2 }, { name: "Jim", id: 3 }];
const allProjects = [{ name: "Tom", id: 2 }, { name: "Jim", id: 3 }, { name: "Mason",id: 1 }];

describe("projectsReducer", () => {
  it("should return the initial state by default", () => {
    const result = projectsReducer(undefined, []);
    expect(result).toEqual([]);
  })

  it("should add saved projects to state", () => {
    const result = projectsReducer([], addProjects(projects));
    expect(result).toEqual(projects);
  })

  it("should return state with added project", () => {
    const result = projectsReducer(projects, addProject(project));
    expect(result).toEqual(allProjects);
  })

  it("should return state without deleted project", () => {
    const result = projectsReducer(allProjects, removeProject(1));
    expect(result).toEqual(projects);
  })
})
