import React from "react";
import { Info} from "./Info";
import { shallow } from "enzyme";

describe("Info", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Info />);
  });

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  });
});