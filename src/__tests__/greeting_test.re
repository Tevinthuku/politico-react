open Jest;
[@bs.get] external innerHTML: Dom.node => string = "";
[@bs.get] external firstChild: Dom.element => Dom.node = "";

describe("<Greeting />", () =>
  ReactTestingLibrary.(
    Expect.(
      test("renders gretting component ", () => {
        let result = render(<Greeting />);
        result
        |> container
        |> firstChild
        |> innerHTML
        |> expect
        |> toEqual("Edit the reason files. (.re)");
      })
    )
  )
);