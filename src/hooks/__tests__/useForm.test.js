import { renderHook, act } from "react-hooks-testing-library";
import useForm from "../useForm";

const event = {
  preventDefault: jest.fn(),
  persist: jest.fn(),
  target: {
    name: "username",
    value: "myusername"
  }
};

describe("testing the useForm hook onSignup", () => {
  let result;
  let ajax;
  let validate = values => {
    let errors = {};
    if (!values.email) errors.email = "Email is required";
    if (!values.username) errors.username = "Username is required";
    return errors;
  };
  beforeEach(() => {
    ajax = jest.fn();
    const val = renderHook(() => useForm(ajax, validate));
    result = val.result;
  });
  test("should return object with prop username on calling handleChange", () => {
    act(() => result.current.handleChange(event));
    expect(result.current.values).toEqual({
      username: "myusername"
    });
  });
  test("should not call callback once on hitting onSubmit if validation is not setup", () => {
    act(() => result.current.handleSubmit(event));
    expect(ajax).not.toBeCalled();
  });
  test("should call callback once validation criteria is met", () => {
    let usernameevent = event;
    act(() => result.current.handleChange(usernameevent));
    let emailvalidation = {
      ...event,
      target: {
        name: "email",
        value: "andela@gmail.com"
      }
    };
    act(() => result.current.handleChange(emailvalidation));
    act(() => result.current.handleSubmit(event));
    expect(ajax).toBeCalled();
  });
});
