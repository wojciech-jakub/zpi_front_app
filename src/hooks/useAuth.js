import React, { useCallback, useContext } from "react";
import Store from "../utils/cookie";
import { useHistory, useLocation } from "react-router-dom";
export const SessionContext = React.createContext(null);

export const SESSION_KEY = "auth.sid";

export const ActionTypes = {
  SET_SESSION: "SET_SESSION",
  CLEAR_SESSION: "CLEAR_SESSION",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR"
};

export const initialState = {
  isLoading: true,
  session: undefined,
  error: null
};

export const rootReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_SESSION:
      return {
        ...state,
        session: action.payload,
        isLoading: false,
        error: null
      };
    case ActionTypes.CLEAR_SESSION:
      return { ...state, session: null, error: null };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const useLogin = () => {
  const { dispatch } = useContext(SessionContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const login = useCallback(
    async (email, password) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        const response = await singinRequest({ email, password });
        console.log(response);
        Store.storeValue(SESSION_KEY, response);
        dispatch({ type: ActionTypes.SET_SESSION, payload: response });
        history.replace(from);
      } catch (ex) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: ex });
      }
    },
    [dispatch]
  );

  return login;
};

export const useLogout = () => {
  const { dispatch } = useContext(SessionContext);
  const logout = useCallback(() => {
    Store.removeValue(SESSION_KEY);
    dispatch({ type: ActionTypes.CLEAR_SESSION });
  }, [dispatch]);

  return logout;
};

// uncomment when api fixed
export const singinRequest = async params => {
  const data = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: "POST",
    headers: {},
    body: JSON.stringify(params)
  });
  return data.json();
};
export const uploadFile = async params => {
  console.log(params);
};
// const singInRequest = async params => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (params.password === "pass" && params.email === "aaa") {
//         resolve({
//           statusCode: 200,
//           body: "9631"
//         });
//       } else {
//         reject("Wrong username or password");
//       }
//     }, 1000);
//   });
// };
