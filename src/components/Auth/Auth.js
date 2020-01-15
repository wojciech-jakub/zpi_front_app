import React, { useReducer, useEffect, useContext } from "react";
import Login from "../Login/Login";
import { Loader } from "semantic-ui-react";
import {
  SessionContext,
  rootReducer,
  initialState,
  ActionTypes,
  useLogin,
  SESSION_KEY
} from "../../hooks/useAuth";
import Store from "../../utils/cookie";
import Signup from "../Signup/Signup";
import { useHistory, useLocation } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const AuthWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    const session = Store.getValue(SESSION_KEY);

    dispatch({ type: ActionTypes.SET_SESSION, payload: session });
  }, []);

  if (state.session === undefined && state.isLoading) {
    return <Loader size="large" active={true} />;
  }

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};

export const LoginComponent = () => {
  const login = useLogin();
  const { state } = useContext(SessionContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  if (state.session) {
    history.replace(from);
  }

  return (
    <div>
      <Login onSubmit={login} isLoading={state.isLoading} />
    </div>
  );
};

export const SignupComponent = () => {
  const signup = useSignup();
  const { state } = useContext(SessionContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  if (state.session) {
    history.replace(from);
  }
  return (
    <div>
      <Signup onSubmit={signup} isLoading={state.isLoading} />
    </div>
  );
};

export default AuthWrapper;
