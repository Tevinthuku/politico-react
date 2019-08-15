[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();
  let component =
    switch (url.path) {
    | ["login"] => <Login onSubmit=Auth.login />
    | _ => <Greeting />
    };

  <div> component </div>;
};