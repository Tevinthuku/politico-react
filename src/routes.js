// Generated by BUCKLESCRIPT VERSION 5.0.4, PLEASE EDIT WITH CARE
'use strict';

var React = require("react");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.js");
var Auth$PoliticoReact = require("./actions/Auth.js");
var Login$PoliticoReact = require("./containers/Login.js");
var Greeting$PoliticoReact = require("./Greeting.js");

function Routes(Props) {
  var url = ReasonReactRouter.useUrl(undefined, /* () */0);
  var match = url[/* path */0];
  var component;
  var exit = 0;
  if (match && match[0] === "login" && !match[1]) {
    component = React.createElement(Login$PoliticoReact.make, {
          onSubmit: Auth$PoliticoReact.login
        });
  } else {
    exit = 1;
  }
  if (exit === 1) {
    component = React.createElement(Greeting$PoliticoReact.make, { });
  }
  return React.createElement("div", undefined, component);
}

var make = Routes;

exports.make = make;
/* react Not a pure module */
