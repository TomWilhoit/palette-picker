import React from "react";
import { PalettePicker } from "./PalettePicker";
import { mapDispatchToProps, mapStateToProps } from "./PalettePicker";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { addPalette, changePalette } from "../../Actions/index";
import { apiCall, createOptions } from "../../Utils/API";

jest.mock("../../Utils/API");

describe("PalettePicker", () => {
  let wrapper;
  let mockPalettes;
  let mockProjects;
  let props;
  
  beforeEach(() => {
    mockPalettes = [
      { name: "Tom", id: 2, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
      { name: "Mason", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" }
    ];
    mockProjects = [
      { name: "mockproj1", id: 7 },
      { name: "mockproj2", id: 8 }
    ];
    props = {
      currPaletteId: 5,
      currProjectId: 6,
      palettes: mockPalettes,
      projects: mockProjects,
      addPalette: jest.fn(),
      changePalette: jest.fn(),
      clearError: jest.fn(),
      setError: jest.fn()
    } 
    wrapper = shallow(<PalettePicker {...props} />);
  });

  describe("on load", () => {
    it("should have default state", () => {
      wrapper.instance().randomizeColors = jest.fn(() => "");
      wrapper.instance().randomizeHexCode = jest.fn(() => "");
      let mockEmptyState = {
        color1: { color: "", isLocked: false },
        color2: { color: "", isLocked: false },
        color3: { color: "", isLocked: false },
        color4: { color: "", isLocked: false },
        color5: { color: "", isLocked: false }
      };
      // works around state colors being randomized on mount
      expect(wrapper.state()).toBeTruthy();
      expect(Object.keys(wrapper.state())).toEqual(Object.keys(mockEmptyState));
    })

    it("should match the snapshot with all data passed in", () => {
      // set state to avoid wrapper having random colors every time
      wrapper.setState({
        color1: { color: "FEFEFE", isLocked: false },
        color2: { color: "FEFEFE", isLocked: false },
        color3: { color: "FEFEFE", isLocked: false },
        color4: { color: "FEFEFE", isLocked: false },
        color5: { color: "FEFEFE", isLocked: false }
      });
      expect(wrapper).toMatchSnapshot();
    })
  })

  describe("componentDidMount", () => {
    it("should call randomizeColors", () => {
      jest.spyOn(wrapper.instance(), "randomizeColors");
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().randomizeColors).toHaveBeenCalled();
    })
  })

  describe("randomizeColors", () => {
    it("should create an object to update state with which does not change if locked", () => {
      let mockLockedState = {
        color1: { color: "FEFEFE", isLocked: true },
        color2: { color: "123456", isLocked: true },
        color3: { color: "121212", isLocked: true },
        color4: { color: "abc123", isLocked: true },
        color5: { color: "000000", isLocked: true }
      };
      wrapper.setState(mockLockedState);
      wrapper.instance().setState = jest.fn();
      expect(wrapper.state()).toEqual(mockLockedState);
      wrapper.instance().randomizeColors();
      expect(wrapper.instance().setState).toBeCalledWith(mockLockedState);
      expect(wrapper.state()).toEqual(mockLockedState);
     })

    it("should call randomizeHex if color is not locked", () => {
      let mockMixLockState = {
        color1: { color: "FEFEFE", isLocked: false },
        color2: { color: "123456", isLocked: true },
        color3: { color: "121212", isLocked: true },
        color4: { color: "abc123", isLocked: false },
        color5: { color: "EFEFEF", isLocked: true }
      };
      const mockCol = "FEFEFE";
      wrapper.instance().capitalize = jest.fn(() => mockCol);
      wrapper.instance().randomizeHexCode = jest.fn();
      wrapper.setState(mockMixLockState);
      wrapper.instance().randomizeColors();
      expect(wrapper.instance().randomizeHexCode).toBeCalledTimes(2);
    })
  })

  describe("capitalize", () => { 
    it("should capitalize a string", () => {
      let result = wrapper.instance().capitalize("low");
      expect(result).toBe("LOW");
    })
  })


  describe("setPaletteDisplay", () => {
    it("should call currPaletteCheck with correct id", () => {
      wrapper.instance().currPaletteCheck = jest.fn(() => ({ id: 10 }));
      wrapper.instance().setPaletteDisplay();
      expect(wrapper.instance().currPaletteCheck).toBeCalledWith(5);
    })

    it("should set colors with true and send palette if it is not a new palette", async () => {
      const mockPal = { id: 13, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      wrapper.instance().currPaletteCheck = jest.fn(() => mockPal);
      wrapper.instance().setColors = jest.fn();
      await wrapper.instance().setPaletteDisplay();
      expect(wrapper.instance().setColors).toBeCalledWith(true, mockPal);
    })

    it("should set colors with false and send palette if it is new palette", async () => {
      const mockPal = { id: 0, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      wrapper.instance().currPaletteCheck = jest.fn(() => mockPal);
      wrapper.instance().setColors = jest.fn();
      await wrapper.instance().setPaletteDisplay();
      expect(wrapper.instance().setColors).toBeCalledWith(false, mockPal);
    })
  })

  describe("setColors", () => {
    it("should set state with the palette colors if new palette isn't selected", () => {
      const mockLockStatus = true;
      const mockPal = { id: 13, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      const mockState = { color1: { color: "abcdef", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "efghij", isLocked: true }, color4: { color: "coolColor", isLocked: true }, color5: { color: "blue", isLocked: true } };
      const expectedState = { color1: { color: "FEFEFE", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "FEFEFE", isLocked: true }, color4: { color: "FEFEFE", isLocked: true }, color5: { color: "FEFEFE", isLocked: true } };
      wrapper.setState(mockState);
      // wrapper.instance().setState = jest.fn();
      wrapper.instance().setColors(mockLockStatus, mockPal);
      // expect(wrapper.instance().setState).toBeCalled(); 
      expect(wrapper.state()).toEqual(expectedState);
    })

    it("should set state with the same colors if new palette is selected", () => {
      const mockLockStatus = true;
      const mockPal = { id: 0, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      const mockState = { color1: { color: "abcdef", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "efghij", isLocked: true }, color4: { color: "coolColor", isLocked: true }, color5: { color: "blue", isLocked: true } };
      wrapper.setState(mockState);
      // wrapper.instance().setState = jest.fn();
      wrapper.instance().setColors(mockLockStatus, mockPal);
      // expect(wrapper.instance().setState).toBeCalled(); 
      expect(wrapper.state()).toEqual(mockState);
    })
  })  
  
  describe("randomizeHexCode", () => {
    it("should return a random 6 character string to be a hex", () => {
      let result = wrapper.instance().randomizeHexCode();
      const length = result.split('').length; 
      expect(length).toBe(6);
    })
  })

  describe("currPaletteCheck", () => {
    it("should find the current palette if there are palettes and new palette isn't selected", () => {
      wrapper.setProps({ palettes: mockPalettes });
      let result = wrapper.instance().currPaletteCheck(3);
      expect(result).toEqual(mockPalettes[1]);
    })

    it("should return an id of zero if there are not palettes", () => {
      const emptyPal = { id: 0 };
      wrapper.setProps({ palettes: [] });
      let result = wrapper.instance().currPaletteCheck(3);
      expect(result).toEqual(emptyPal);
    })

    it("should return an id of zero if new palette is the currentpalette", () => {
      const emptyPal = { id: 0 };
      wrapper.setProps({ palettes: mockPalettes });
      let result = wrapper.instance().currPaletteCheck(0);
      expect(result).toEqual(emptyPal);
    })
  })

  describe("toggleLock", () => {
    it("should set state of a color to change its isLocked to false if it is true", () => {
      const mockLockedState = { color1: { color: "abcdef", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "efghij", isLocked: true }, color4: { color: "coolColor", isLocked: true }, color5: { color: "blue", isLocked: true } };
      wrapper.setState(mockLockedState);
      expect(wrapper.state().color1.isLocked).toBe(true);
      wrapper.instance().toggleLock("color1");
      expect(wrapper.state().color1.isLocked).toBe(false);
    })

    it("should set state of a color to change its isLocked to true if it is false", () => {
      const mockUnlockedState = { color1: { color: "abcdef", isLocked: false }, color2: { color: "FEFEFE", isLocked: false }, color3: { color: "efghij", isLocked: false }, color4: { color: "coolColor", isLocked: false }, color5: { color: "blue", isLocked: false } };
      wrapper.setState(mockUnlockedState);
      expect(wrapper.state().color1.isLocked).toBe(false);
      wrapper.instance().toggleLock("color1");
      expect(wrapper.state().color1.isLocked).toBe(true);
    })
  })

  describe("lockSelect", () => {
    it.skip("should return an element with classname fas fa-lock if locked", () => {
      const mockLockedState = { color1: { color: "abcdef", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "efghij", isLocked: true }, color4: { color: "coolColor", isLocked: true }, color5: { color: "blue", isLocked: true } };
      const expectedEl = (<i className="fas fa-lock" onClick={() => this.toggleLock("color1")} />);
      wrapper.setState(mockLockedState);
      const result = wrapper.instance().lockSelect("color1");
      expect(result).toEqual(expectedEl);
    })
    it.skip("should return an element with classname fas fa-lock-open if unlocked", () => {
      const mockUnlockedState = { color1: { color: "abcdef", isLocked: false }, color2: { color: "FEFEFE", isLocked: false }, color3: { color: "efghij", isLocked: false }, color4: { color: "coolColor", isLocked: false }, color5: { color: "blue", isLocked: false } };
      const expectedEl = (<i className="fas fa-lock-open" onClick={() => this.toggleLock("color1")} />);
      wrapper.setState(mockUnlockedState);
      const result = wrapper.instance().lockSelect("color1");
      expect(result).toEqual(expectedEl);
    })
  })

  describe("checkForSameName", () => {
    it("should return the same name if there are no items to check against", () => {
      wrapper.setProps({ palettes: [] })
      const mockName = "Mason";
      const checkType = "palettes";
      let result = wrapper.instance().checkForSameName(mockName, checkType);
      expect(result).toEqual(mockName);
    })
    it("should return the same name if there are no similar named items", () => {
      wrapper.setProps({ palettes: mockPalettes })
      const mockName = "UniqueName";
      const checkType = "palettes";
      let result = wrapper.instance().checkForSameName(mockName, checkType);
      expect(result).toEqual(mockName);
    })

    it("should return the correct name if there are similar named items", () => {
      wrapper.setProps({ palettes: mockPalettes });
      const repeatName = "Mason";
      const checkType = "palettes";
      const expected = "Mason<1>";
      let result = wrapper.instance().checkForSameName(repeatName, checkType);
      expect(result).toEqual(expected);
    })

    it("should return the correct name if there are similar named items", () => {
      const multiSameNamePals = [
        { name: "Mason", id: 2, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
        { name: "Mason<1>", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
        { name: "Mason<2>", id: 3, project_id: 5, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" },
      ];
      const repeatName = "Mason";
      wrapper.setProps({ palettes: multiSameNamePals });
      const checkType = "palettes";
      const expected = "Mason<3>";
      let result = wrapper.instance().checkForSameName(repeatName, checkType);
      expect(result).toEqual(expected);
    })
  })

  describe("SavePalette", () => {
    it("should build a palette body", () => {
      wrapper.instance().buildPaletteBody = jest.fn();
      wrapper.instance().savePalette("mockname");
      expect(wrapper.instance().buildPaletteBody).toBeCalled();
    })

    it("should edit palette if it is not a new palette", () => {
      const mockPalBody = { name: "mockname", color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      wrapper.instance().makeNewPalette = jest.fn();
      wrapper.instance().editPalette = jest.fn();
      wrapper.instance().buildPaletteBody = jest.fn(() => mockPalBody);
      wrapper.setProps({ currPaletteId: 5 });
      wrapper.instance().savePalette("mockname");
      expect(wrapper.instance().editPalette).toBeCalledWith(mockPalBody);
    })

    it("should makeNewPalette if new palette is selected", () => {
      const mockPalBody = { name: "mockname", color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      wrapper.instance().makeNewPalette = jest.fn();
      wrapper.instance().editPalette = jest.fn();
      wrapper.instance().buildPaletteBody = jest.fn(() => mockPalBody);
      wrapper.setProps({ currPaletteId: 0 })
      wrapper.instance().savePalette("mockname");
      expect(wrapper.instance().makeNewPalette).toBeCalledWith(mockPalBody);
    })
  })

  describe("buildPaletteBody", () => {
    it("should return an object with a name and current states color.colors", () => {
      const mockLockedState = { color1: { color: "abcdef", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "efghij", isLocked: true }, color4: { color: "coolColor", isLocked: true }, color5: { color: "blue", isLocked: true }};
      const expected = { name: "mockName", color1: "abcdef", color2: "FEFEFE", color3: "efghij", color4: "coolColor", color5: "blue" };
      wrapper.setState(mockLockedState);
      const result = wrapper.instance().buildPaletteBody("mockName");
      expect(result).toEqual(expected);
    })
  })

  describe("makeNewPalette", () => {
    it("should ceateOptions with correct info", () => {
      const mockPalBody = { name: "mockname", color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      wrapper.instance().makeNewPalette(mockPalBody);
      expect(createOptions).toBeCalledWith("POST", mockPalBody)
    })

    it("should make an apiCall with the correct info", () => {
      const mockPalBody = { name: "mockname", color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      const mockOptions = {
        method: "POST",
        body: JSON.stringify(mockPalBody),
        headers: { "Content-Type": "application/json" }
      };
      wrapper.setProps({ currProjectId: 5 });
      createOptions.mockImplementation(() => mockOptions);
      wrapper.instance().makeNewPalette(mockPalBody);
      expect(apiCall).toBeCalledWith("projects/5/palettes", mockOptions);
    })

    it("should addPalette with the correct info", async () => {
      const mockPalBody = { name: "mockname", color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      const mockOptions = {
        method: "POST",
        body: JSON.stringify(mockPalBody),
        headers: { "Content-Type": "application/json" }
      };
      const returnId = { id: 7 };
      const expected = {...mockPalBody, project_id: 5, id: returnId.id }; 
      wrapper.setProps({ currProjectId: 5 });
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => returnId);
      await wrapper.instance().makeNewPalette(mockPalBody);
      expect(wrapper.instance().props.addPalette).toBeCalledWith(expected);
    })

    it.skip("should catch errors", () => {
    
    })
  })

  describe("editPalette", () => {
    it("should ceateOptions with correct info", () => {
      const mockPalBody = { name: "mockname", color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      wrapper.instance().editPalette(mockPalBody);
      expect(createOptions).toBeCalledWith("PUT", mockPalBody)
    })

    it("should make an apiCall with the correct info", () => {
      const mockPalBody = { name: "mockname", color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      const mockOptions = {
        method: "PUT",
        body: JSON.stringify(mockPalBody),
        headers: { "Content-Type": "application/json" }
      };
      wrapper.setProps({ currProjectId: 5 });
      createOptions.mockImplementation(() => mockOptions);
      wrapper.instance().editPalette(mockPalBody);
      expect(apiCall).toBeCalledWith("palettes/5", mockOptions);
    })

    it("should changePalette with the correct info", async () => {
      const mockPalBody = { name: "mockname", color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      const mockOptions = {
        method: "PUT",
        body: JSON.stringify(mockPalBody),
        headers: { "Content-Type": "application/json" }
      };
      const expected = {...mockPalBody, project_id: 5, id: 7 }; 
      wrapper.setProps({ currProjectId: 5, currPaletteId: 7 });
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation();
      await wrapper.instance().editPalette(mockPalBody);
      expect(wrapper.instance().props.changePalette).toBeCalledWith(expected);
    })

    it.skip("should catch errors", () => {
    
    })
  })

  describe("hexToRbg", () => {
    it("should return an rgb object", () => {
      const mockHex = "FEFEFE";
      const expected = { r: 254, g: 254, b: 254 };
      const result = wrapper.instance().hexToRbg(mockHex);
      expect(result).toBeTruthy();
      expect(result).toEqual(expected);
    })

    it("should return null if nothing/invalid entry is passed in", () => {
      const mockHex = "";
      const result = wrapper.instance().hexToRbg(mockHex);
      expect(result).toBe(null);
    })
  })

  describe("evaluateLightOrDark", () => {
    it("should return light if light color is passed it", () => {
      const lightRbg = { r: 255, b: 255, g: 255 };
      const result = wrapper.instance().evaluateLightOrDark(lightRbg);
      expect(result).toBe("light");
    })

    it("should return dark if dark color is passed it", () => {
      const darkRbg = { r: 0, b: 0, g: 0};
      const result =wrapper.instance().evaluateLightOrDark(darkRbg);
      expect(result).toBe("dark");
    })
  })

  describe("renderColors", () => {
    it("should call capitalize 5 times", async () => {
      const mockRbg = { r: 255, b: 255, g: 255 };
      const mockState = { color1: { color: "FEFEFE", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "FEFEFE", isLocked: true }, color4: { color: "FEFEFE", isLocked: true }, color5: { color: "FEFEFE", isLocked: true } };
      wrapper.setState(mockState);
      wrapper.instance().capitalize = jest.fn(() => mockRbg);
      wrapper.instance().hexToRbg = jest.fn(() => mockRbg);
      wrapper.instance().evaluateLightOrDark = jest.fn(() => "light");
      await wrapper.instance().renderColors();
      expect(wrapper.instance().capitalize).toBeCalledTimes(5);
    })

    it("should call hexToRbg 5 times", async () => {
      const mockRbg = { r: 255, b: 255, g: 255 };
      const mockState = { color1: { color: "FEFEFE", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "FEFEFE", isLocked: true }, color4: { color: "FEFEFE", isLocked: true }, color5: { color: "FEFEFE", isLocked: true } };
      wrapper.setState(mockState);
      wrapper.instance().hexToRbg = jest.fn(() => mockRbg);
      wrapper.instance().evaluateLightOrDark = jest.fn(() => "light");
      await wrapper.instance().renderColors();
      expect(wrapper.instance().hexToRbg).toBeCalledTimes(5);
    })

    it("should call evaluateLightOrDark 5 times", async () => {
      const mockRbg = { r: 255, b: 255, g: 255 };
      const mockState = { color1: { color: "FEFEFE", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "FEFEFE", isLocked: true }, color4: { color: "FEFEFE", isLocked: true }, color5: { color: "FEFEFE", isLocked: true } };
      wrapper.setState(mockState);
      wrapper.instance().hexToRbg = jest.fn(() => mockRbg);
      wrapper.instance().evaluateLightOrDark = jest.fn(() => "light");
      await wrapper.instance().renderColors();
      expect(wrapper.instance().evaluateLightOrDark).toBeCalledTimes(5);
    })

    it("should return 5 color divs", async () => {
      const mockRbg = { r: 255, b: 255, g: 255 };
      const mockState = { color1: { color: "FEFEFE", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "FEFEFE", isLocked: true }, color4: { color: "FEFEFE", isLocked: true }, color5: { color: "FEFEFE", isLocked: true } };
      wrapper.instance().hexToRbg = jest.fn(() => mockRbg);
      wrapper.instance().evaluateLightOrDark = jest.fn(() => "light");
      let result = await wrapper.instance().renderColors();
      expect(result).toHaveLength(5);
    })
  })

  describe("mapDispatchToProps", () => {
    it("should add a palette", () => {
      const mockPalette = { name: "Tommy", projectId: 4 };
      const mockDispatch = jest.fn();
      const actionToDispatch = addPalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addPalette(mockPalette);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it("should change palette", () => {
      const mockPalette = { name: "Tommy", projectId: 4 };
      const mockDispatch = jest.fn();
      const actionToDispatch = changePalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.changePalette(mockPalette);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })

  describe("mapStateToProps", () => {
    it("should return a state object", () => {
      const mockState = {
        projects: [{ name: "Tom" }],
        palettes: [{ name: "Mason", projectId: 4 }],
        currentProject: 4,
        currentPalette: 5,
        addedState: "mockState"
      };
      const expected = {
        projects: [{ name: "Tom" }],
        palettes: [{ name: "Mason", projectId: 4 }],
        currProjectId: 4,
        currPaletteId: 5
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })
})