import React from "react";
import { PalettePicker } from "./PalettePicker";
import { mapDispatchToProps, mapStateToProps } from "./PalettePicker";
import { shallow } from "enzyme";
import { addPalette, changePalette } from "../../Actions/index";
import { apiCall, createOptions } from "../../Utils/API";

jest.mock("../../Utils/API");

describe("PalettePicker", () => {
  let wrapper;
  let mockPalettes;
  let mockProjects;
  let mockPalette;
  let mockOptions;
  let mockLockedState;
  let mockRbg;
  let props;
  
  beforeEach(() => {
    mockRbg = { r: 254, g: 254, b: 254 };
    mockLockedState = {
      color1: { color: "FEFEFE", isLocked: true },
      color2: { color: "FEFEFE", isLocked: true },
      color3: { color: "FEFEFE", isLocked: true },
      color4: { color: "FEFEFE", isLocked: true },
      color5: { color: "FEFEFE", isLocked: true }
    };
    mockOptions = {
      method: "POST",
      body: JSON.stringify({ id: 4 }),
      headers: { "Content-Type": "application/json" }
    };
    mockPalette = { 
      id: 5,
      name: "mockname", 
      color1: "FEFEFE", 
      color2: "FEFEFE", 
      color3: "FEFEFE", 
      color4: "FEFEFE", 
      color5: "FEFEFE" 
    };
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
      // works around state colors being randomized on mount
      expect(wrapper.state()).toBeTruthy();
      expect(Object.keys(wrapper.state())).toEqual(Object.keys(mockLockedState));
    })

    it("should match the snapshot with all data passed in", () => {
      // set state to avoid wrapper having random colors every time
      wrapper.setState(mockLockedState);
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
      wrapper.setState(mockLockedState);
      wrapper.instance().setState = jest.fn();
      expect(wrapper.state()).toEqual(mockLockedState);
      wrapper.instance().randomizeColors();
      expect(wrapper.instance().setState).toBeCalledWith(mockLockedState);
      expect(wrapper.state()).toEqual(mockLockedState);
     })

    it("should call randomizeHex if color is not locked", () => {
      const mockMixLockState = {
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
      const result = wrapper.instance().capitalize("low");
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
      wrapper.instance().currPaletteCheck = jest.fn(() => mockPalette);
      wrapper.instance().setColors = jest.fn();
      await wrapper.instance().setPaletteDisplay();
      expect(wrapper.instance().setColors).toBeCalledWith(true, mockPalette);
    })

    it("should set colors with false and send palette if it is new palette", async () => {
      mockPalette = { id: 0, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      wrapper.instance().currPaletteCheck = jest.fn(() => mockPalette);
      wrapper.instance().setColors = jest.fn();
      await wrapper.instance().setPaletteDisplay();
      expect(wrapper.instance().setColors).toBeCalledWith(false, mockPalette);
    })
  })

  describe("setColors", () => {
    it("should set state with the palette colors if new palette isn't selected", () => {
      const mockLockStatus = true;
      const mockState = { color1: { color: "abcdef", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "efghij", isLocked: true }, color4: { color: "coolColor", isLocked: true }, color5: { color: "blue", isLocked: true } };
      wrapper.setState(mockState);
      wrapper.instance().setColors(mockLockStatus, mockPalette);
      expect(wrapper.state()).toEqual(mockLockedState);
    })

    it("should set state with the same colors if new palette is selected", () => {
      const mockLockStatus = true;
      mockPalette = { id: 0, color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      const mockState = { color1: { color: "abcdef", isLocked: true }, color2: { color: "FEFEFE", isLocked: true }, color3: { color: "efghij", isLocked: true }, color4: { color: "coolColor", isLocked: true }, color5: { color: "blue", isLocked: true } };
      wrapper.setState(mockState);
      wrapper.instance().setColors(mockLockStatus, mockPalette);
      expect(wrapper.state()).toEqual(mockState);
    })
  })  
  
  describe("randomizeHexCode", () => {
    it("should return a random 6 character string to be a hex", () => {
      const result = wrapper.instance().randomizeHexCode();
      const length = result.split('').length; 
      expect(length).toBe(6);
    })
  })

  describe("currPaletteCheck", () => {
    it("should find the current palette if there are palettes and new palette isn't selected", () => {
      wrapper.setProps({ palettes: mockPalettes });
      const result = wrapper.instance().currPaletteCheck(3);
      expect(result).toEqual(mockPalettes[1]);
    })

    it("should return an id of zero if there are not palettes", () => {
      const emptyPal = { id: 0 };
      wrapper.setProps({ palettes: [] });
      const result = wrapper.instance().currPaletteCheck(3);
      expect(result).toEqual(emptyPal);
    })

    it("should return an id of zero if new palette is the currentpalette", () => {
      const emptyPal = { id: 0 };
      wrapper.setProps({ palettes: mockPalettes });
      const result = wrapper.instance().currPaletteCheck(0);
      expect(result).toEqual(emptyPal);
    })
  })

  describe("toggleLock", () => {
    it("should toggle a lock when one is clicked", () => {
      const e = { preventDefault: jest.fn() };
      wrapper.instance().toggleLock = jest.fn();
      wrapper.find(".fas").first().simulate("click", e);
      expect(wrapper.instance().toggleLock).toBeCalled();
    })

    it("should set state of a color to change its isLocked to false if it is true", () => {
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

  describe("checkForSameName", () => {
    it("should return the same name if there are no items to check against", () => {
      wrapper.setProps({ palettes: [] })
      const mockName = "Mason";
      const checkType = "palettes";
      const result = wrapper.instance().checkForSameName(mockName, checkType);
      expect(result).toEqual(mockName);
    })
    
    it("should return the same name if there are no similar named items", () => {
      wrapper.setProps({ palettes: mockPalettes })
      const mockName = "UniqueName";
      const checkType = "palettes";
      const result = wrapper.instance().checkForSameName(mockName, checkType);
      expect(result).toEqual(mockName);
    })

    it("should return the correct name if there are similar named items", () => {
      wrapper.setProps({ palettes: mockPalettes });
      const repeatName = "Mason";
      const checkType = "palettes";
      const expected = "Mason<1>";
      const result = wrapper.instance().checkForSameName(repeatName, checkType);
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
      const result = wrapper.instance().checkForSameName(repeatName, checkType);
      expect(result).toEqual(expected);
    })
  })

  describe("SavePalette", () => {
    it("should build a palette body", () => {
      wrapper.instance().buildPaletteBody = jest.fn();
      wrapper.instance().savePalette("mockName");
      expect(wrapper.instance().buildPaletteBody).toBeCalled();
    })

    it("should edit palette if it is not a new palette", () => {
      wrapper.instance().makeNewPalette = jest.fn();
      wrapper.instance().editPalette = jest.fn();
      wrapper.instance().buildPaletteBody = jest.fn(() => mockPalette);
      wrapper.setProps({ currPaletteId: 5 });
      wrapper.instance().savePalette("mockName");
      expect(wrapper.instance().editPalette).toBeCalledWith(mockPalette);
    })

    it("should makeNewPalette if new palette is selected", () => {
      wrapper.instance().makeNewPalette = jest.fn();
      wrapper.instance().editPalette = jest.fn();
      wrapper.instance().buildPaletteBody = jest.fn(() => mockPalette);
      wrapper.setProps({ currPaletteId: 0 })
      wrapper.instance().savePalette("mockName");
      expect(wrapper.instance().makeNewPalette).toBeCalledWith(mockPalette);
    })
  })

  describe("buildPaletteBody", () => {
    it("should return an object with a name and current states color.colors", () => {
      const expected = { name: "mockName", color1: "FEFEFE", color2: "FEFEFE", color3: "FEFEFE", color4: "FEFEFE", color5: "FEFEFE" };
      wrapper.setState(mockLockedState);
      const result = wrapper.instance().buildPaletteBody("mockName");
      expect(result).toEqual(expected);
    })
  })

  describe("makeNewPalette", () => {
    it("should ceateOptions with correct info", () => {
      wrapper.instance().makeNewPalette(mockPalette);
      expect(createOptions).toBeCalledWith("POST", mockPalette)
    })

    it("should make an apiCall with the correct info", () => {
      wrapper.setProps({ currProjectId: 5 });
      createOptions.mockImplementation(() => mockOptions);
      wrapper.instance().makeNewPalette(mockPalette);
      expect(apiCall).toBeCalledWith("projects/5/palettes", mockOptions);
    })

    it("should addPalette with the correct info", async () => {
      const returnId = { id: 7 };
      const expected = {...mockPalette, project_id: 5, id: returnId.id }; 
      wrapper.setProps({ currProjectId: 5 });
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => returnId);
      await wrapper.instance().makeNewPalette(mockPalette);
      expect(wrapper.instance().props.addPalette).toBeCalledWith(expected);
    })

    it("should catch errors", async () => {
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => {
        throw new Error();
      });
      try {
        await wrapper.instance().makeNewPalette(mockPalette);
      } catch {
        expect(wrapper.instance().props.setError).toBeCalled(); 
      }
    })
  })

  describe("editPalette", () => {
    it("should ceateOptions with correct info", () => {
      wrapper.instance().editPalette(mockPalette);
      expect(createOptions).toBeCalledWith("PUT", mockPalette)
    })

    it("should make an apiCall with the correct info", () => {
      wrapper.setProps({ currProjectId: 5 });
      createOptions.mockImplementation(() => mockOptions);
      wrapper.instance().editPalette(mockPalette);
      expect(apiCall).toBeCalledWith("palettes/5", mockOptions);
    })

    it("should changePalette with the correct info", async () => {
      const expected = {...mockPalette, project_id: 5, id: 7 }; 
      wrapper.setProps({ currProjectId: 5, currPaletteId: 7 });
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation();
      await wrapper.instance().editPalette(mockPalette);
      expect(wrapper.instance().props.changePalette).toBeCalledWith(expected);
    })

    it("should catch errors", async () => {
      createOptions.mockImplementation(() => mockOptions);
      apiCall.mockImplementation(() => {
        throw new Error();
      });
      try {
        await wrapper.instance().editPalette(mockPalette);
      } catch {
        expect(wrapper.instance().props.setError).toBeCalled(); 
      }
    })
  })

  describe("hexToRbg", () => {
    it("should return an rgb object", () => {
      const mockHex = "FEFEFE";
      const result = wrapper.instance().hexToRbg(mockHex);
      expect(result).toBeTruthy();
      expect(result).toEqual(mockRbg);
    })

    it("should return null if nothing/invalid entry is passed in", () => {
      const mockHex = "";
      const result = wrapper.instance().hexToRbg(mockHex);
      expect(result).toBe(null);
    })
  })

  describe("evaluateLightOrDark", () => {
    it("should return light if light color is passed it", () => {
      const result = wrapper.instance().evaluateLightOrDark(mockRbg);
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
      wrapper.setState(mockLockedState);
      wrapper.instance().capitalize = jest.fn(() => mockRbg);
      wrapper.instance().hexToRbg = jest.fn(() => mockRbg);
      wrapper.instance().evaluateLightOrDark = jest.fn(() => "light");
      await wrapper.instance().renderColors();
      expect(wrapper.instance().capitalize).toBeCalledTimes(5);
    })

    it("should call hexToRbg 5 times", async () => {
      wrapper.setState(mockLockedState);
      wrapper.instance().hexToRbg = jest.fn(() => mockRbg);
      wrapper.instance().evaluateLightOrDark = jest.fn(() => "light");
      await wrapper.instance().renderColors();
      expect(wrapper.instance().hexToRbg).toBeCalledTimes(5);
    })

    it("should call evaluateLightOrDark 5 times", async () => {
      wrapper.setState(mockLockedState);
      wrapper.instance().hexToRbg = jest.fn(() => mockRbg);
      wrapper.instance().evaluateLightOrDark = jest.fn(() => "light");
      await wrapper.instance().renderColors();
      expect(wrapper.instance().evaluateLightOrDark).toBeCalledTimes(5);
    })

    it("should return 5 color divs", async () => {
      wrapper.instance().hexToRbg = jest.fn(() => mockRbg);
      wrapper.instance().evaluateLightOrDark = jest.fn(() => "light");
      const result = await wrapper.instance().renderColors();
      expect(result).toHaveLength(5);
    })
  })

  describe("mapDispatchToProps", () => {
    it("should add a palette", () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addPalette(mockPalette);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addPalette(mockPalette);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it("should change palette", () => {
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
        projects: [],
        palettes: [],
        currentProject: "",
        currentPalette: "",
        addedState: ""
      };
      const expected = {
        projects: [],
        palettes: [],
        currProjectId: "",
        currPaletteId: ""
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    })
  })

  // Skipped Dom manipulation tests
  describe("lockSelect", () => {
    it.skip("should return an element with classname fas fa-lock if locked", () => {
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
})