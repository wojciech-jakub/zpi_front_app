import {
  ActionTypes,
  singinRequest,
  SESSION_KEY,
  SessionContext
} from "./useAuth";
import { useCallback, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Store from "../utils/cookie";

const useUpload = () => {
  const { dispatch } = useContext(SessionContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const upload = useCallback(async (state, encodePhoto) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });

    try {
      await signupRequest({params});
      const response = await uploadFile({ state, encodePhoto });

      // dispatch({ type: ActionTypes.SET_SESSION, payload: response });
      // history.replace(from);
    } catch (ex) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: ex });
    }
  });

  return singup;
};

export const uploadFile = async params => {
  console.log(params);
};
export default useUpload;
