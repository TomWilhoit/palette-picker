import React from "react";
import { InstructionBox } from "./InstructionBox";
import { shallow } from "enzyme";

describe("InstructionBox", () => {
  let wrapper;
  let mockInstruction;
  let props;

  beforeEach(() => {
    mockInstruction = "1. Always pass mock props when testing";
    props = {
      message: mockInstruction
    };
    wrapper = shallow(<InstructionBox {...props} />);
  })

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })

  it("should return an element", () => {
    const expected = (
      <div className="instruction-box" />
    );
    let result = InstructionBox(mockInstruction);
    expect(result).toEqual(expected);
  })
})