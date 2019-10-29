import React from "react";
import { Palette } from "./Palette";
import { mapDispatchToProps, mapStateToProps } from "./Palette";
import { shallow } from "enzyme";
import { apiCall, createOptions } from "../../Utils/API";
import { updateCurrentPalette, removePalette } from "../../Actions";

jest.mock("../../Utils/API");

describe("Palette", () => {
  let wrapper;
  let props;
  
  beforeEach(() => {
    props = {
      color1: "FEFEFE",
      color2: "FEFEFE", 
      color3: "FEFEFE", 
      color4: "FEFEFE", 
      color5: "FEFEFE",
      id: 4,
      name: "MockPal",
      currentPalette: 5,
      updateCurrentPalette: jest.fn(), 
      setPaletteDisplay: jest.fn(),
      removePalette: jest.fn(),
      setError: jest.fn()
    };
    wrapper = shallow(<Palette {...props} />);
  })

  describe("on load", () => {
    it("should match the snapshot with all data passed in", () => {
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe("handleClick", () => {
    it("should be called when a click-container is clicked", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.instance().handleClick = jest.fn();
      wrapper.find(".click-container").first().simulate("click", e);
      expect(wrapper.instance().handleClick).toBeCalled();
    })
    
    it("should call updateCurrentPalette with correct id", async () => {
      await wrapper.instance().handleClick();
      expect(wrapper.instance().props.updateCurrentPalette).toBeCalledWith(4);
    })   
    
    it("should call setPaletteDisplay", async () => {
      await wrapper.instance().handleClick();
      expect(wrapper.instance().props.setPaletteDisplay).toBeCalled();
    })  
  })

  describe("erasePalette", () => {
    it("should call removePalette with correct id", () => {
      const mockId = 4;
      wrapper.instance().erasePalette(mockId);
      expect(wrapper.instance().props.removePalette).toBeCalledWith(4);
    }) 

    it("should call deletePalette with correct id", () => {
      const mockId = 4;
      wrapper.instance().deletePalette = jest.fn();
      wrapper.instance().erasePalette(4);
      expect(wrapper.instance().deletePalette).toBeCalledWith(4);
    }) 
  })

  describe("deletePalette", () => {
    it("should call createOptions with correct info", () => {
      wrapper.instance().deletePalette(4);
      expect(createOptions).toBeCalledWith("DELETE", {id: 4});
    }) 

    it("should call apiCall with correct info", async () => {
      const mockOptions = {
        method: "DELETE",
        body: JSON.stringify({ id: 4 }),
        headers: { "Content-Type": "application/json" }
      };
      createOptions.mockImplementation(() => mockOptions);
      wrapper.instance().deletePalette(4);
      expect(apiCall).toBeCalledWith("palettes/4", mockOptions);
    }) 

    it.skip("should catch error and call setError", () => {
      const t = () => {
        throw new Error("Error!");
      };
      const mockOptions = {
        method: "DELETE",
        body: JSON.stringify({ id: 4 }),
        headers: { "Content-Type": "application/json" }
      }
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => t);
      expect(wrapper.instance().props.setError).toBeCalled();
    }) 
  })

  describe("handleDelete", () => {
    it("should be called when .pal-del-btn button is clicked", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.instance().handleDelete = jest.fn();
      wrapper.setProps({ id: 4, removePalette: jest.fn() });
      wrapper.find(".pal-del-btn").simulate("click", e);
      expect(wrapper.instance().handleDelete).toBeCalled();
    })

    it("should prevent Default", () => {
      const e = { preventDefault: jest.fn() };
      jest.spyOn(e, "preventDefault");
      wrapper.instance().handleDelete(e);
      expect(e.preventDefault).toBeCalled();
    })

    it("should call erasePalette with correct id", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.instance().erasePalette = jest.fn();
      wrapper.instance().handleDelete(e);
      expect(wrapper.instance().erasePalette).toBeCalledWith(4);
    })
  })

  describe("choosePaletteClass", () => {
    it("should return a className", () => {
      const expected = "palette";
      let result = wrapper.instance().choosePaletteClass();
      expect(result).toEqual(expected);
    })

    it("should add to returned className if its the current palette", () => {
      const expected = "palette active-palette";
      wrapper.setProps({ id: 5 });
      let result = wrapper.instance().choosePaletteClass();
      expect(result).toEqual(expected);
    })

    it("should add to returned className if its the new palette button", () => {
      const expected = "palette new-palette";
      wrapper.setProps({ id: 0 });
      let result = wrapper.instance().choosePaletteClass();
      expect(result).toEqual(expected);
    })

    it("should add to returned className if its the new palette button and active", () => {
      const expected = "palette active-palette new-palette";
      wrapper.setProps({ currentPalette: 0, id: 0 });
      let result = wrapper.instance().choosePaletteClass();
      expect(result).toEqual(expected);
    })
  })

  describe("makePreviewPalette", () => {
    it("should return a div for each color", () => {
      const bkgd = { backgroundColor: "#FEFEFE" };
      let result = wrapper.instance().makePreviewPalette();
      expect(result).toHaveLength(5);
    })
  })

  describe("mapDispatchToProps", () => {
    it("should update the current palette", () => {
      const mockPalette = { name: "Tommy", projectId: 4 };
      const mockDispatch = jest.fn();
      const actionToDispatch = updateCurrentPalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateCurrentPalette(mockPalette);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })

    it("should remove a palette", () => {
      const mockPalette = { name: "Tommy", projectId: 4 };
      const mockDispatch = jest.fn();
      const actionToDispatch = removePalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removePalette(mockPalette);
      expect(mockDispatch).toBeCalledWith(actionToDispatch);
    })
  })

  describe("mapStateToProps", () => {
    it("should return a state object", () => {
      const mockState = {
        projects: [{ name: "Tom" }],
        palettes: [{ name: "Mason", projectId: 4 }],
        currentProject: 4,
        currentPalette: 5
      };
      const expected = { currentPalette: 5 };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })
})