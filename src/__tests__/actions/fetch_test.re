open Jest;

let spyonfetch = () => [%raw
  {|jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }))|}
];

describe("Auth fns", () => {
  beforeEach(() => spyonfetch());

  test("test handles login functionality as expected", () => {
    ignore(Auth.login("tev@gmail", "pass"));
    let _ =
      ignore(
        [%raw {|
        expect(global.fetch).toHaveBeenCalled()
      |}],
      );
    let _ =
      ignore(
        [%raw
          {|
                expect(global.fetch).toHaveBeenCalledWith(
                    "https://tevpolitico.herokuapp.com/api/v2/auth/signin",
                    {"body": "{\"email\":\"tev@gmail\",\"password\":\"pass\"}",
                    "headers": {"Content-Type": "application/json"},
                    "integrity": "", "method": "POST", "referrerPolicy": ""})

        |}
        ],
      );
    pass;
  });
});