import React from "react";
import { Error } from "./Error";
import { shallow } from "enzyme";

describe("Error", () => {
  let wrapper;
  let mockErrMessage = "Hello"
  beforeEach(() => {
    wrapper = shallow(<Error message={mockErrMessage} />);
  })

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })
})