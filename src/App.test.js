import React from "react";
import { shallow } from "enzyme";

import { findByAttr } from "./tests/testUtils";
import App from "./App";

test("should have instructions text on how to get started", () => {
  const wrapper = shallow(<App />);
  const instructions = findByAttr(wrapper, "instructions");
  expect(instructions.text()).toBe("Edit src/App.js and save to reload.");
});

test("should have href prop for the learn react component", () => {
  const wrapper = shallow(<App />);
  const anchorelement = findByAttr(wrapper, "learn-react");
  expect(anchorelement.prop("href")).toBe("https://reactjs.org");
});
