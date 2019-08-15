[@react.component]
let make = (~onSubmit) => {
  let (email, onEmailChange) = React.useState(() => "");
  let (password, onPasswordChange) = React.useState(() => "");

  let renderTextField =
      (~handleInputChange, ~placeholder, ~value, ~dataTestId) => {
    MaterialUi.(
      <TextField
        placeholder
        fullWidth=true
        onChange={event =>
          handleInputChange(ReactEvent.Form.target(event)##value)
        }
        value
      />
      |> Utils.addTestId(dataTestId)
    );
  };
  MaterialUi.(
    <div>
      <Card>
        <Grid container=true direction=`Row justify=`Center alignItems=`Center>
          <Grid item=true>
            {<form
               onSubmit={evt => {
                 ReactEvent.Synthetic.preventDefault(evt);
                 onSubmit(email, password);
                 ();
               }}>
               {renderTextField(
                  ~handleInputChange=onEmailChange,
                  ~placeholder="email",
                  ~value=email,
                  ~dataTestId="login-email",
                )}
               {renderTextField(
                  ~handleInputChange=onPasswordChange,
                  ~placeholder="password",
                  ~value=password,
                  ~dataTestId="login-password",
                )}
               <Grid
                 container=true
                 direction=`Row
                 justify=`Center
                 alignItems=`Center>
                 <Button type_="submit"> {React.string("Submit")} </Button>
               </Grid>
             </form>
             |> Utils.addTestId("login-form")}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};