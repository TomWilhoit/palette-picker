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
      const mockEndpoint = "palettes"
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData)
      }));
      const response = await apiCall(mockEndpoint, mockOptions);
      expect(window.fetch).toHaveBeenCalled();
      expect(response).toEqual(mockData);
    })

    it.skip("should return an error if response is not ok", async () => {
      const mockData = [{ name: "Mason" }, { name: "Tom" }];
      const mockOptions = {
        method: "POST",
        body: JSON.stringify(mockData),
        headers: { "Content-Type": "application/json" }
      };
      const mockEndpoint = "palettes"
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
        status: 422,
        json: () => Promise.resolve("Error!")
      }));
      // apiCall.mockImplementation(() => {
      //   throw new Error("Error!");
      // });

      // apiCall.mockImplementation(() => { throw new Error("Error!") });
      const result = await apiCall(mockEndpoint, mockOptions);
      // expect(result).toEqual("Fetch Unsuccessful Missing title");
      expect(result).toThrowError(new Error("Error!"));
    })

    it("should return nothing if the method is 'DELETE'", async () => {
      const mockData = [{ name: "Mason" }, { name: "Tom" }];
      const mockOptions = {
        method: "DELETE",
        body: JSON.stringify(mockData),
        headers: { "Content-Type": "application/json" }
      };
      const mockEndpoint = "palettes"
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