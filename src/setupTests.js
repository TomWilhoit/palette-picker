import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// **** Script related to mock document: https://stackoverflow.com/questions/41098009/mocking-document-in-jest

// Object.defineProperty(document, "currentScript", {
//   value: document.createElement("script"),
// });