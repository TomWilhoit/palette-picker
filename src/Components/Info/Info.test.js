import React from "react";
import { Info} from "./Info";
import { shallow } from "enzyme";

describe("Info", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Info />);
  })

  it("should match the snapshot with all data passed in", () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe("handleClick", () => {
    it("should activate when close-info-btn is pressed", () => {

    })

    it("should activate when an instruction-step is pressed", () => {

    })

    it("should activate when a detail-box is pressed", () => {

    })

    it("should run hideInfo if 'closable' is in included the className", () => {

    })

    it("should run toggleDetail if 'instruction-step' is included in the className", () => {

    })

    it("should run closeDetail if 'instruction-btep' is included in the className", () => {

    })
  })

  describe("toggleDetails", () => {
    it("should add 'show-info' to a class list if it is not there", () => {

    })

    it("should add 'arrow-down' to a class list if it is not there", () => {

    })

    it("should remove 'show-info' to a class list if it is there already", () => {

    })

    it("should remove 'arrow-down' to a class list if it is there already", () => {

    })
  })

  describe("closeDetails", () => {
    it("should remove 'show-info' to a class list if it is there already", () => {

    })
    
    it("should remove 'arrow-down' to a class list if it is there already", () => {

    })
  })
})