import React, { useCallback, useState } from "react";
import { Button, Form, Input, Loader } from "semantic-ui-react";
import useInput from "../../hooks/useInput";

const useEmailValidator = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [isEmailValid, setIsEmailValid] = useState(true);

  const checkEmailValid = useCallback(() => {
    setIsEmailValid(emailRegEx.test(email));
  }, [emailRegEx, email]);

  return [isEmailValid, checkEmailValid];
};

const usePasswordValidatior = (password, confirmPassword) => {
  const [isPasswordValid, setIsPassowrdValid] = useState(true);

  const checkPasswordValid = useCallback(() => {
    setIsPassowrdValid(password === confirmPassword);
  }, [password, confirmPassword]);

  return [isPasswordValid, checkPasswordValid];
};

const Signup = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const [confirmPassword, setConfirmPassword] = useInput();

  const [isEmailValid, checkEmailValid] = useEmailValidator(email);
  const [isPasswordValid, checkPasswordValid] = usePasswordValidatior(
    password,
    confirmPassword
  );

  const isFormValid = !!(isEmailValid && isPasswordValid && password && email);

  const submitForm = useCallback(() => {
    onSubmit(email, password);
  }, [onSubmit, email, password]);

  return (
    <Form>
      <Loader active={isLoading} size="medium" />
      <Form.Field>
        <label>Email</label>
        <Input
          error={!isEmailValid}
          value={email}
          placeholder="Email"
          onChange={setEmail}
          onBlur={checkEmailValid}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Input
          value={password}
          type="password"
          placeholder="Password"
          onChange={setPassword}
        />
      </Form.Field>
      <Form.Field>
        <label>Confirm Password</label>
        <Input
          error={!isPasswordValid}
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
          onChange={setConfirmPassword}
          onBlur={checkPasswordValid}
        />
      </Form.Field>
      <Button disabled={!isFormValid} type="submit" onClick={submitForm}>
        Submit
      </Button>
    </Form>
  );
};

export default Signup;
