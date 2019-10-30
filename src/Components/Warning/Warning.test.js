import React from "react";
import { Warning } from "./Warning";
import { shallow } from "enzyme";

describe("Warning", () => {
  let wrapper;
  let mockMessage;
  let props;
  
  beforeEach(() => {
    mockMessage = "Error or Loading message"
    props = {
      message: mockMessage
    };
    wrapper = shallow(<Warning {...props} />);
  })

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })

  it("should match the snapshot with no message", () => {
    wrapper.setProps({ message: "" });
    expect(wrapper).toMatchSnapshot();
  })

  it("should return an element", () => {
    const expected = (
      <h2 className="warning" />
    );
    let result = Warning(mockMessage);
    expect(result).toEqual(expected);
  })
})