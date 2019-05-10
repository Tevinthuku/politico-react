import React from "react";
import axios from "axios";
import { render, fireEvent, waitForElement } from "react-testing-library";

import Signup from "../";

let data = {
  username: "tev",
  email: "tev@gmail.com",
  password: "pass123",
  firstname: "tev",
  lastname: "tev",
  retypedpassword: "pass123"
};

describe("<Signup />", () => {
  let getByTestId;
  let emailinput;
  let passwordinput;
  let retypedpassword;
  let username;
  let obj;
  let rerender;
  let submitBtn;
  beforeEach(() => {
    obj = render(<Signup />);
    rerender = () => obj.rerender(<Signup />);
    getByTestId = obj.getByTestId;
    emailinput = getByTestId("email");
    username = getByTestId("username");
    passwordinput = getByTestId("password");
    retypedpassword = getByTestId("retypedpassword");
    submitBtn = getByTestId("submit");
    jest.spyOn(axios, "post");
  });

  test("should update email input onChange", () => {
    fireEvent.change(emailinput, { target: { value: "tev@gmail.com" } });
    expect(emailinput.value).toBe("tev@gmail.com");
  });
  test("should update password input onChange", () => {
    fireEvent.change(passwordinput, { target: { value: "password" } });
    expect(passwordinput.value).toBe("password");
  });
  test("should update retyped input onChange", () => {
    fireEvent.change(retypedpassword, { target: { value: "password" } });
    expect(retypedpassword.value).toBe("password");
  });

  test("should render error message values below input boxes if item is not filled in", () => {
    fireEvent.change(emailinput, { target: { value: "tev@gmail.com" } });
    fireEvent.click(submitBtn);
    let usernamejsx = getByTestId("username-error-message");
    let passworderrorjsx = getByTestId("password-error-message");
    let retypedpassworderrorjsx = getByTestId("retypedpassword-error-message");
    expect(usernamejsx).toHaveTextContent("Username field is required.");
    expect(passworderrorjsx).toHaveTextContent("Password field is required.");
    expect(retypedpassworderrorjsx).toHaveTextContent(
      "Retypedpassword field is required."
    );
  });

  test("should render email error message if email is not filled", () => {
    fireEvent.click(submitBtn);
    let emailerrorjsx = getByTestId("email-error-message");
    expect(emailerrorjsx).toHaveTextContent("Email field is required.");
  });
  test("should hit signup endpoint if validation passes + successfully register user", async () => {
    axios.post.mockResolvedValue({
      data: {
        status: 201,
        data: [
          {
            token: "kjdkewjriw32435324dwes",
            user: data
          }
        ]
      }
    });

    fireEvent.change(getByTestId("email"), {
      target: { value: "tev@gmail.com" }
    });
    rerender();
    fireEvent.change(getByTestId("username"), {
      target: { value: "tev" }
    });
    rerender();

    fireEvent.change(getByTestId("firstname"), {
      target: { value: "tev" }
    });
    rerender();

    fireEvent.change(getByTestId("lastname"), {
      target: { value: "tev" }
    });
    rerender();

    fireEvent.change(passwordinput, {
      target: { value: "pass123" }
    });

    rerender();

    fireEvent.change(retypedpassword, {
      target: { value: "pass123" }
    });
    rerender();
    fireEvent.click(submitBtn);
    expect(axios.post).toHaveBeenCalledTimes(1);

    expect(axios.post).toHaveBeenCalledWith(
      "https://tevpolitico.herokuapp.com/api/v2/auth/signup",
      { ...data }
    );

    const resolvedSpan = await waitForElement(() => {
      return getByTestId("success");
    });

    expect(resolvedSpan).toHaveTextContent("Welcome, tev");
  });
  test("should hit signup endpoint if validation passes ", async () => {
    axios.post.mockResolvedValue({
      error:
        "Check your json keys. username, firstname, lastname,phone, email, password",
      status: 400
    });

    fireEvent.change(getByTestId("email"), {
      target: { value: "tev@gmail.com" }
    });
    rerender();
    fireEvent.change(getByTestId("username"), {
      target: { value: "tev" }
    });
    rerender();

    fireEvent.change(getByTestId("firstname"), {
      target: { value: "tev" }
    });
    rerender();

    fireEvent.change(getByTestId("lastname"), {
      target: { value: "tev" }
    });
    rerender();

    fireEvent.change(passwordinput, {
      target: { value: "pass123" }
    });

    rerender();

    fireEvent.change(retypedpassword, {
      target: { value: "pass123" }
    });
    rerender();
    fireEvent.click(submitBtn);

    expect(axios.post).toHaveBeenCalledWith(
      "https://tevpolitico.herokuapp.com/api/v2/auth/signup",
      { ...data }
    );

    const resolvedSpan = await waitForElement(() => {
      return getByTestId("error");
    });

    expect(resolvedSpan).toHaveTextContent(
      "Check your json keys. username, firstname, lastname,phone, email, password"
    );
  });
});
