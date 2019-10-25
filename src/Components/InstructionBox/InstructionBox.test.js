import React from "react";
import { InstructionBox } from "./InstructionBox";
import { shallow } from "enzyme";

describe("InstructionBox", () => {
  let wrapper;
  let mockInstructionMessage = "1. Always pass mock props when testing";
  beforeEach(() => {
    wrapper = shallow(<InstructionBox message={mockInstructionMessage} />);
  })

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })
})