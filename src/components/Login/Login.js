import React, { useCallback } from "react";
import { Button, Form, Loader, Input } from "semantic-ui-react";
import useInput from "../../hooks/useInput";

const Login = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();

  const submitForm = useCallback(() => {
    onSubmit(email, password);
  }, [onSubmit, email, password]);

  return (
    <React.Fragment>
      <Loader active={isLoading} size="medium" />
      <Form>
        <Form.Field>
          <label>Email</label>
          <Input
            disabled={isLoading}
            value={email}
            placeholder="Email"
            onChange={setEmail}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            disabled={isLoading}
            value={password}
            type="password"
            placeholder="Password"
            onChange={setPassword}
          />
        </Form.Field>
        <Button disabled={isLoading} type="submit" onClick={submitForm}>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default Login;
