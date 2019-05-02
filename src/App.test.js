import React from "react";
import { render } from "react-testing-library";

import App from "./App";

describe("<App />", () => {
  test("should render text instructions text", () => {
    const { getByText } = render(<App />);
    const aboutAnchorNode = getByText(/save/i);
    expect(aboutAnchorNode.textContent).toBe(
      "Edit src/App.js and save to reload."
    );
  });

  test("should render anchor tag with href prop", () => {
    const { getByTestId } = render(<App />);
    const anchorElement = getByTestId("learn-link");
    expect(anchorElement).toHaveAttribute("href");
  });
});
