export default values => {
  let errors = {};
  if (!values.email) errors.email = "Email field is required.";

  if (!values.password) errors.password = "Password field is required.";

  if (!values.retypedpassword)
    errors.retypedpassword = "Retypedpassword field is required.";

  if (!values.username) errors.username = "Username field is required.";

  if (!values.firstname) errors.firstname = "Firstname field is required.";

  if (!values.lastname) errors.lastname = "Lastname field is required.";

  return errors;
};
