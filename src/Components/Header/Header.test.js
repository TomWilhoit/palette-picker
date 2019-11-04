import React from "react";
import { Header } from "./Header";
import { shallow } from "enzyme";

describe("Header", () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<Header />);
  })

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })

  it("should return an element", () => {
    const expected = (
      <h1>
        Palette Picker
      </h1>
    );
    let result = Header();
    expect(result).toEqual(expected);
  })
})
