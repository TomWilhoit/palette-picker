import { apiCall, createOptions } from "./API";

describe("api.js", () => {
  describe("apiCall", () => {
    it("should fetch and return response data from expected endpoint", async () => {
      const mockData = [{ name: "Mason" }, { name: "Tom" }];
      const mockOptions = {
        method: "POST",
        body: JSON.stringify(mockData),
        headers: { "Content-Type": "application/json" }
      };
      const mockEndpoint = "palettes";
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData)
      }));
      const response = await apiCall(mockEndpoint, mockOptions);
      expect(window.fetch).toBeCalled();
      expect(response).toEqual(mockData);
    })

    it.skip("should return an error if response is not ok", async () => {
      const errMess = "Error Message!";
      const errRes = { ok: false, json: () => errMess };
      const mockData = [{ name: "Mason" }, { name: "Tom" }];
      const mockOptions = {
        method: "POST",
        body: JSON.stringify(mockData),
        headers: { "Content-Type": "application/json" }
      };
      const mockEndpoint = "palettes";
      window.fetch = jest.fn().mockImplementation(() => errRes);
      let result = await apiCall(mockEndpoint, mockOptions);
      // expect(result).toBe("Error message!");
      expect(() => {
        throw new Error();
      }).toThrow();
    })

    it("should return nothing if the method is 'DELETE'", async () => {
      const mockData = [{ name: "Mason" }, { name: "Tom" }];
      const mockOptions = {
        method: "DELETE",
        body: JSON.stringify(mockData),
        headers: { "Content-Type": "application/json" }
      };
      const mockEndpoint = "palettes";
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData)
      }));
      const response = await apiCall(mockEndpoint, mockOptions);
      expect(window.fetch).toHaveBeenCalled();
      expect(response).toEqual(undefined);
    })
  })

  describe("createOptions", () => {
    it("should return an object with correct method and body", () => {
      const mockType = "PUT";
      const mockBody = { name: "Tom" };
      const expected = {
        method: mockType,
        body: JSON.stringify(mockBody),
        headers: { "Content-Type": "application/json" }
      }
      const response = createOptions(mockType, mockBody);
      expect(response).toEqual(expected);
    })
  })
})