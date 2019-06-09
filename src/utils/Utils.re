let addTestId = (testId, re) =>
  ReasonReact.cloneElement(re, ~props={"data-testid": testId}, [||]);

let setDictKeyAndValuePair = (dict, key, value) =>
  Js.Dict.set(dict, key, Js.Json.string(value));