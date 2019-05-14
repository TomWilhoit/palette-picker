import React from "react";
import { Control } from "./Control";
import { mapStateToProps } from "./Control";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

describe("Control", () => {
  let wrapper;
  let mockProjects = [{ name: "Tom" }];
  beforeEach(() => {
    wrapper = shallow(<Control projects={mockProjects} />);
  });

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default state", () => {
    expect(wrapper.state()).toEqual({
      name: ""
    });
  });
  it("should mapStateToProps", () => {
    const mockState = {
      projects: [{ name: "Tom" }],
      palettes: [{ name: "Mason", projectId: 4 }],
      currentProject: 4
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(mockState);
  });
});
