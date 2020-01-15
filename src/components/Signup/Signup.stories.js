import React from "react";
import Signup from "./Signup";
import { action } from "@storybook/addon-actions";

export default {
  title: "Signup"
};

export const SignupForm = () => <Signup onSubmit={action()} />;

SignupForm.story = {
  name: "Signup form"
};
