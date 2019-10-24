import React from "react";
import { InstructionBox } from "./InstructionBox";
import { shallow } from "enzyme";

describe("InstructionBox", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<InstructionBox />);
  });

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  });
});