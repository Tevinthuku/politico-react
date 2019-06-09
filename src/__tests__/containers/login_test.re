open Jest;
open Expect;
[@bs.module "../../utils/domutils.js"]
external getElementValue: Dom.element => string = "getElementValue";

let loginPromiseMock = (_email, _password) => {
  Js.log("Login function");
  Js.Promise.resolve(Js.Json.string("email"));
};

open ReactTestingLibrary;
let spyonconsole = () => [%raw
  {|jest.spyOn(console, 'log').mockImplementation(() => {})|}
];
let restoreconsole = () => [%raw {|console.log.mockRestore()|}];

let logincomponent = <Login onSubmit=loginPromiseMock /> |> render;

describe("Form elements work as expected", () => {
  beforeEach(() => spyonconsole());

  afterEach(() => restoreconsole());
  test("test email input can handlechange", () => {
    let component = logincomponent;
    component
    |> getByPlaceholderText("email")
    |> FireEvent.change(~eventInit={
                          "target": {
                            "value": "tev",
                          },
                        });

    component
    |> getByPlaceholderText("email")
    |> getElementValue
    |> expect
    |> toBe("tev");
  });

  test("test password input to change", () => {
    let component = logincomponent;
    component
    |> getByPlaceholderText("password")
    |> FireEvent.change(~eventInit={
                          "target": {
                            "value": "pass",
                          },
                        });
    component
    |> getByPlaceholderText("password")
    |> getElementValue
    |> expect
    |> toBe("pass");
  });

  test("form can handle submit", () => {
    let component = logincomponent;

    component
    |> getByTestId("login-form")
    |> FireEvent.submit(
         ~eventInit={
           "preventDefault": () => {
             ();
           },
         },
       );

    let _ = [%raw {|expect(console.log).toBeCalled()|}];
    pass;
  });
});