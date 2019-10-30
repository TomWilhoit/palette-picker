import React from "react";
import { Warning } from "./Warning";
import { shallow } from "enzyme";

describe("Warning", () => {
  let wrapper;
  let props;
  
  beforeEach(() => {
    props = {
      message: "Error or Loading message"
    };
    wrapper = shallow(<Error {...props} />);
  })

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })

  it("should match the snapshot with no message", () => {
    wrapper.setProps({ message: "" });
    expect(wrapper).toMatchSnapshot();
  })

  it("should return an element", () => {
    const mess = "hey"
    const expected = (
      <h2 className="warning" />
    );
    let result = Warning(mess);
    expect(result).toEqual(expected);
  })
})