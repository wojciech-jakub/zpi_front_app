import React from "react";
import Login from "./Login";
import { action } from "@storybook/addon-actions";

export default {
  title: "Login"
};

export const LoginForm = () => <Login onSubmit={action()} />;

LoginForm.story = {
  name: "Login Form"
};

export const LoginLoading = () => (
  <Login onSubmit={action()} isLoading={true} />
);

LoginForm.story = {
  name: "Login Form Loading"
};
