import {
  ActionTypes,
  singinRequest,
  SESSION_KEY,
  SessionContext
} from "./useAuth";
import { useCallback, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Store from "../utils/cookie";

const useSignup = () => {
  const { dispatch } = useContext(SessionContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const singup = useCallback(async (email, password) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });

    try {
      await signupRequest({ email, password });
      const response = await singinRequest({ email, password });
      Store.storeValue(SESSION_KEY, response);
      dispatch({ type: ActionTypes.SET_SESSION, payload: response });
      history.replace(from);
    } catch (ex) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: ex });
    }
  });

  return singup;
};

const signupRequest = async params => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
    method: "POST",
    headers: {},
    body: JSON.stringify(params)
  });
  return data.json();
};

export default useSignup;
