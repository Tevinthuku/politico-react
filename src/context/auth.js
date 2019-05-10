// @flow
import React from "react";

type Auth =
  | {}
  | {
      token: string,
      user: {
        username: string,
        email: string,
        id: number
      }
    };

export const Authcontext = React.createContext<[Auth, () => void]>([
  {},
  () => {}
]);

export const AuthProvider = Authcontext.Provider;
export const AuthConsumer = Authcontext.Consumer;
