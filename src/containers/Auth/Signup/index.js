import React, { useState } from "react";
import axios from "axios";
import { isEmptyObject } from "../../../utils";
import useForm from "../../../hooks/useForm";

import validation from "../../../validations/signup";

function Signup(props) {
  const { values, handleChange, handleSubmit, errors } = useForm(
    onSignup,
    validation
  );

  const [response, setResponse] = useState({});

  function onSignup() {
    return axios
      .post("https://tevpolitico.herokuapp.com/api/v2/auth/signup", values)
      .then(data => {
        if (data.data) {
          console.log(data.data);
          setResponse(data.data);
        } else {
          setResponse(data);
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="form">
        <input
          type="email"
          value={values.email || ""}
          onChange={handleChange}
          name="email"
          data-testid="email"
        />
        {errors.email && (
          <div data-testid="email-error-message">{errors.email}</div>
        )}

        <input
          type="text"
          value={values.username || ""}
          onChange={handleChange}
          name="username"
          data-testid="username"
        />

        {errors.username && (
          <div data-testid="username-error-message">{errors.username}</div>
        )}

        <input
          type="text"
          value={values.firstname || ""}
          onChange={handleChange}
          name="firstname"
          data-testid="firstname"
        />

        {errors.firstname && (
          <div data-testid="firstname-error-message">{errors.firstname}</div>
        )}

        <input
          type="text"
          value={values.lastname || ""}
          onChange={handleChange}
          name="lastname"
          data-testid="lastname"
        />

        {errors.lastname && (
          <div data-testid="lastname-error-message">{errors.lastname}</div>
        )}

        <input
          type="password"
          value={values.password || ""}
          onChange={handleChange}
          name="password"
          data-testid="password"
        />
        {errors.password && (
          <div data-testid="password-error-message">{errors.password}</div>
        )}
        <input
          type="password"
          value={values.retypedpassword || ""}
          onChange={handleChange}
          name="retypedpassword"
          data-testid="retypedpassword"
        />
        {errors.retypedpassword && (
          <div data-testid="retypedpassword-error-message">
            {errors.retypedpassword}
          </div>
        )}

        <button data-testid="submit" type="submit">
          Submit
        </button>
      </form>
      {isEmptyObject(response) ? (
        <div />
      ) : (
        <div data-testid={response.status === 201 ? "success" : "error"}>
          {response.data
            ? `Welcome, ${response.data[0].user.username}`
            : response.error}
        </div>
      )}
    </div>
  );
}

export default Signup;
