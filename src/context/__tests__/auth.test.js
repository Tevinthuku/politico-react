import React, { useContext } from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import { AuthProvider, AuthConsumer, Authcontext } from "../auth";
import { isEmptyObject } from "../../utils";

afterEach(cleanup);

const Container = ({ children }) => {
  const value = [{}, obj => {}];

  return <AuthProvider value={value}>{children}</AuthProvider>;
};

describe("<AuthProvoder />", () => {
  test("should contain empty object as default context value from Consumer", () => {
    const component = (
      <Container>
        <AuthConsumer>
          {([data, changeData]) =>
            isEmptyObject(data) ? (
              <h1>Kindly log in</h1>
            ) : (
              <h1>Hello {data.user.username}</h1>
            )
          }
        </AuthConsumer>
      </Container>
    );

    const { getByText } = render(component);
    expect(getByText(/^Kindly/)).toHaveTextContent("Kindly log in");
  });

  test("should return proper value upon using hooks", () => {
    function Auth() {
      const [data, _] = useContext(Authcontext);
      return isEmptyObject(data) ? (
        <h1>Kindly log in</h1>
      ) : (
        <h1>Hello {data.user.username}</h1>
      );
    }

    const { getByText } = render(<Auth />);
    expect(getByText(/^Kindly/)).toHaveTextContent("Kindly log in");
  });
});
